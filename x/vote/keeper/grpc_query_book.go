package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/mande-labs/mande/x/vote/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) BookAll(c context.Context, req *types.QueryAllBookRequest) (*types.QueryAllBookResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var books []types.Book
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	bookStore := prefix.NewStore(store, types.KeyPrefix(types.BookKeyPrefix))

	pageRes, err := query.Paginate(bookStore, req.Pagination, func(key []byte, value []byte) error {
		var book types.Book
		if err := k.cdc.Unmarshal(value, &book); err != nil {
			return err
		}

		books = append(books, book)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllBookResponse{Book: books, Pagination: pageRes}, nil
}

func (k Keeper) Book(c context.Context, req *types.QueryGetBookRequest) (*types.QueryGetBookResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetBook(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetBookResponse{Book: val}, nil
}

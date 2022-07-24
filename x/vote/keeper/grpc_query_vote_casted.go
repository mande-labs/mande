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

func (k Keeper) VoteCastedAll(c context.Context, req *types.QueryAllVoteCastedRequest) (*types.QueryAllVoteCastedResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var voteCasteds []types.VoteCasted
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	voteCastedStore := prefix.NewStore(store, types.KeyPrefix(types.VoteCastedKeyPrefix))

	pageRes, err := query.Paginate(voteCastedStore, req.Pagination, func(key []byte, value []byte) error {
		var voteCasted types.VoteCasted
		if err := k.cdc.Unmarshal(value, &voteCasted); err != nil {
			return err
		}

		voteCasteds = append(voteCasteds, voteCasted)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllVoteCastedResponse{VoteCasted: voteCasteds, Pagination: pageRes}, nil
}

func (k Keeper) VoteCasted(c context.Context, req *types.QueryGetVoteCastedRequest) (*types.QueryGetVoteCastedResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetVoteCasted(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetVoteCastedResponse{VoteCasted: val}, nil
}

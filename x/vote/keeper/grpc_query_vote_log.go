package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/mande-labs/mande/x/vote/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) VoteLogAll(c context.Context, req *types.QueryAllVoteLogRequest) (*types.QueryAllVoteLogResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var voteLogs []types.VoteLog
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	voteLogStore := prefix.NewStore(store, types.KeyPrefix(types.VoteLogKey))

	pageRes, err := query.Paginate(voteLogStore, req.Pagination, func(key []byte, value []byte) error {
		var voteLog types.VoteLog
		if err := k.cdc.Unmarshal(value, &voteLog); err != nil {
			return err
		}

		voteLogs = append(voteLogs, voteLog)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllVoteLogResponse{VoteLog: voteLogs, Pagination: pageRes}, nil
}

func (k Keeper) VoteLog(c context.Context, req *types.QueryGetVoteLogRequest) (*types.QueryGetVoteLogResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)
	voteLog, found := k.GetVoteLog(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetVoteLogResponse{VoteLog: voteLog}, nil
}

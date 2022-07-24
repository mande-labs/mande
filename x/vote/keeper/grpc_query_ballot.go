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

func (k Keeper) BallotAll(c context.Context, req *types.QueryAllBallotRequest) (*types.QueryAllBallotResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var ballots []types.Ballot
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	ballotStore := prefix.NewStore(store, types.KeyPrefix(types.BallotKeyPrefix))

	pageRes, err := query.Paginate(ballotStore, req.Pagination, func(key []byte, value []byte) error {
		var ballot types.Ballot
		if err := k.cdc.Unmarshal(value, &ballot); err != nil {
			return err
		}

		ballots = append(ballots, ballot)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllBallotResponse{Ballot: ballots, Pagination: pageRes}, nil
}

func (k Keeper) Ballot(c context.Context, req *types.QueryGetBallotRequest) (*types.QueryGetBallotResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetBallot(
		ctx,
		req.Index,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	return &types.QueryGetBallotResponse{Ballot: val}, nil
}

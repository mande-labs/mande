package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "github.com/mande-labs/mande/testutil/keeper"
	"github.com/mande-labs/mande/testutil/nullify"
	"github.com/mande-labs/mande/x/vote/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestVoteCastedQuerySingle(t *testing.T) {
	keeper, ctx := keepertest.VoteKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNVoteCasted(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetVoteCastedRequest
		response *types.QueryGetVoteCastedResponse
		err      error
	}{
		{
			desc: "First",
			request: &types.QueryGetVoteCastedRequest{
				Index: msgs[0].Index,
			},
			response: &types.QueryGetVoteCastedResponse{VoteCasted: msgs[0]},
		},
		{
			desc: "Second",
			request: &types.QueryGetVoteCastedRequest{
				Index: msgs[1].Index,
			},
			response: &types.QueryGetVoteCastedResponse{VoteCasted: msgs[1]},
		},
		{
			desc: "KeyNotFound",
			request: &types.QueryGetVoteCastedRequest{
				Index: strconv.Itoa(100000),
			},
			err: status.Error(codes.NotFound, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.VoteCasted(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.NoError(t, err)
				require.Equal(t,
					nullify.Fill(tc.response),
					nullify.Fill(response),
				)
			}
		})
	}
}

func TestVoteCastedQueryPaginated(t *testing.T) {
	keeper, ctx := keepertest.VoteKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNVoteCasted(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllVoteCastedRequest {
		return &types.QueryAllVoteCastedRequest{
			Pagination: &query.PageRequest{
				Key:        next,
				Offset:     offset,
				Limit:      limit,
				CountTotal: total,
			},
		}
	}
	t.Run("ByOffset", func(t *testing.T) {
		step := 2
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.VoteCastedAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.VoteCasted), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.VoteCasted),
			)
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.VoteCastedAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			require.LessOrEqual(t, len(resp.VoteCasted), step)
			require.Subset(t,
				nullify.Fill(msgs),
				nullify.Fill(resp.VoteCasted),
			)
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.VoteCastedAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
		require.ElementsMatch(t,
			nullify.Fill(msgs),
			nullify.Fill(resp.VoteCasted),
		)
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.VoteCastedAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}

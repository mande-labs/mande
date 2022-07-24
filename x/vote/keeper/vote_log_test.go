package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/mande-labs/mande/testutil/keeper"
	"github.com/mande-labs/mande/testutil/nullify"
	"github.com/mande-labs/mande/x/vote/keeper"
	"github.com/mande-labs/mande/x/vote/types"
	"github.com/stretchr/testify/require"
)

func createNVoteLog(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.VoteLog {
	items := make([]types.VoteLog, n)
	for i := range items {
		items[i].Id = keeper.AppendVoteLog(ctx, items[i])
	}
	return items
}

func TestVoteLogGet(t *testing.T) {
	keeper, ctx := keepertest.VoteKeeper(t)
	items := createNVoteLog(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetVoteLog(ctx, item.Id)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&got),
		)
	}
}

func TestVoteLogRemove(t *testing.T) {
	keeper, ctx := keepertest.VoteKeeper(t)
	items := createNVoteLog(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveVoteLog(ctx, item.Id)
		_, found := keeper.GetVoteLog(ctx, item.Id)
		require.False(t, found)
	}
}

func TestVoteLogGetAll(t *testing.T) {
	keeper, ctx := keepertest.VoteKeeper(t)
	items := createNVoteLog(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllVoteLog(ctx)),
	)
}

func TestVoteLogCount(t *testing.T) {
	keeper, ctx := keepertest.VoteKeeper(t)
	items := createNVoteLog(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetVoteLogCount(ctx))
}

package keeper_test

import (
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/mande-labs/mande/testutil/keeper"
	"github.com/mande-labs/mande/testutil/nullify"
	"github.com/mande-labs/mande/x/vote/keeper"
	"github.com/mande-labs/mande/x/vote/types"
	"github.com/stretchr/testify/require"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func createNVoteCasted(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.VoteCasted {
	items := make([]types.VoteCasted, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)

		keeper.SetVoteCasted(ctx, items[i])
	}
	return items
}

func TestVoteCastedGet(t *testing.T) {
	keeper, ctx := keepertest.VoteKeeper(t)
	items := createNVoteCasted(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetVoteCasted(ctx,
			item.Index,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestVoteCastedRemove(t *testing.T) {
	keeper, ctx := keepertest.VoteKeeper(t)
	items := createNVoteCasted(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveVoteCasted(ctx,
			item.Index,
		)
		_, found := keeper.GetVoteCasted(ctx,
			item.Index,
		)
		require.False(t, found)
	}
}

func TestVoteCastedGetAll(t *testing.T) {
	keeper, ctx := keepertest.VoteKeeper(t)
	items := createNVoteCasted(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllVoteCasted(ctx)),
	)
}

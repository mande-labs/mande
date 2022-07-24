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

func createNBook(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Book {
	items := make([]types.Book, n)
	for i := range items {
		items[i].Index = strconv.Itoa(i)

		keeper.SetBook(ctx, items[i])
	}
	return items
}

func TestBookGet(t *testing.T) {
	keeper, ctx := keepertest.VoteKeeper(t)
	items := createNBook(keeper, ctx, 10)
	for _, item := range items {
		rst, found := keeper.GetBook(ctx,
			item.Index,
		)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&rst),
		)
	}
}
func TestBookRemove(t *testing.T) {
	keeper, ctx := keepertest.VoteKeeper(t)
	items := createNBook(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveBook(ctx,
			item.Index,
		)
		_, found := keeper.GetBook(ctx,
			item.Index,
		)
		require.False(t, found)
	}
}

func TestBookGetAll(t *testing.T) {
	keeper, ctx := keepertest.VoteKeeper(t)
	items := createNBook(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllBook(ctx)),
	)
}

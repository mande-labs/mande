package keeper_test

import (
	"testing"

	testkeeper "github.com/mande-labs/mande/testutil/keeper"
	"github.com/mande-labs/mande/x/vote/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.VoteKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}

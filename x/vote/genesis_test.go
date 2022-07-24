package vote_test

import (
	"testing"

	keepertest "github.com/mande-labs/mande/testutil/keeper"
	"github.com/mande-labs/mande/testutil/nullify"
	"github.com/mande-labs/mande/x/vote"
	"github.com/mande-labs/mande/x/vote/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		VoteLogList: []types.VoteLog{
			{
				Id: 0,
			},
			{
				Id: 1,
			},
		},
		VoteLogCount: 2,
		VoteCastedList: []types.VoteCasted{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		BallotList: []types.Ballot{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		BookList: []types.Book{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.VoteKeeper(t)
	vote.InitGenesis(ctx, *k, genesisState)
	got := vote.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.VoteLogList, got.VoteLogList)
	require.Equal(t, genesisState.VoteLogCount, got.VoteLogCount)
	require.ElementsMatch(t, genesisState.VoteCastedList, got.VoteCastedList)
	require.ElementsMatch(t, genesisState.BallotList, got.BallotList)
	require.ElementsMatch(t, genesisState.BookList, got.BookList)
	// this line is used by starport scaffolding # genesis/test/assert
}

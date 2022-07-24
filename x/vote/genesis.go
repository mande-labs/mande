package vote

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/mande-labs/mande/x/vote/keeper"
	"github.com/mande-labs/mande/x/vote/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the voteLog
	for _, elem := range genState.VoteLogList {
		k.SetVoteLog(ctx, elem)
	}

	// Set voteLog count
	k.SetVoteLogCount(ctx, genState.VoteLogCount)
	// Set all the voteCasted
	for _, elem := range genState.VoteCastedList {
		k.SetVoteCasted(ctx, elem)
	}
	// Set all the ballot
	for _, elem := range genState.BallotList {
		k.SetBallot(ctx, elem)
	}
	// Set all the book
	for _, elem := range genState.BookList {
		k.SetBook(ctx, elem)
	}
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.VoteLogList = k.GetAllVoteLog(ctx)
	genesis.VoteLogCount = k.GetVoteLogCount(ctx)
	genesis.VoteCastedList = k.GetAllVoteCasted(ctx)
	genesis.BallotList = k.GetAllBallot(ctx)
	genesis.BookList = k.GetAllBook(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}

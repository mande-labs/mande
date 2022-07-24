package keeper

import (
	"github.com/mande-labs/mande/x/vote/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k Keeper) calcVotes(ctx sdk.Context, msg *types.MsgCreateVote, ballotVote *types.Ballot) {

	totalVotes := finalVote(msg.Operation, msg.Count, ballotVote.Sign, ballotVote.Count)

	if totalVotes >= 0 {
		ballotVote.Sign = 1
		ballotVote.Count = uint64(totalVotes)
	} else {
		ballotVote.Sign = 0
		ballotVote.Count = uint64(-1 * totalVotes)
	}

}

func finalVote(msgOperation uint64, msgCount uint64, sign uint64, ballotCount uint64) int64 {

	msgCountValue, ballotCountValue := int64(0), int64(0)

	switch msgOperation {
	case 1:
		msgCountValue = int64(msgCount)
	case 0:
		msgCountValue = -1 * int64(msgCount)
	}

	switch sign {
	case 1:
		ballotCountValue = int64(ballotCount)
	case 0:
		ballotCountValue = -1 * int64(ballotCount)
	}

	return (msgCountValue + ballotCountValue)
}

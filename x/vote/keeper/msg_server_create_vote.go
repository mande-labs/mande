package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/mande-labs/mande/x/vote/types"
)

func (k msgServer) CreateVote(goCtx context.Context, msg *types.MsgCreateVote) (*types.MsgCreateVoteResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message

	// Get mand balance
	caster, _ := sdk.AccAddressFromBech32(msg.Creator)
	mand := k.bankKeeper.GetBalance(ctx, caster, "mand")

	// Get the total votes casted by msg.Creator
	castedVotes, found := k.Keeper.GetVoteCasted(ctx, msg.Creator)
	if !found {
		castedVotes.Index = msg.Creator
		castedVotes.Count = 0
	}

	//check if the power to cast vote is available
	mandValue := mand.Amount.Uint64()

	if mandValue >= (castedVotes.Count + msg.Count) {
		if msg.Mode == 1 {
			k.castVote(ctx, msg, &castedVotes)
		}
	} else {
		panic("Not enough mand to vote!!! or invalid Mode")
	}

	if msg.Mode == 0 {
		k.uncastVote(ctx, msg, &castedVotes)
	}

	k.SetVoteCasted(ctx, castedVotes)

	// Append the transaction to VoteLog
	var log = types.VoteLog{
		Voter:     msg.Creator,
		Receiver:  msg.Receiver,
		Count:     msg.Count,
		Operation: msg.Operation,
		Mode:      msg.Mode,
	}
	k.AppendVoteLog(ctx, log)

	return &types.MsgCreateVoteResponse{}, nil
}

func (k Keeper) castVote(ctx sdk.Context, msg *types.MsgCreateVote, castedVotes *types.VoteCasted) {

	// Update Vote-casted
	castedVotes.Count = castedVotes.Count + msg.Count

	// Update Book
	index := msg.Creator + "->" + msg.Receiver

	book, found := k.GetBook(ctx, index)

	if !found {
		book.Index = index
		book.Positive = 0
		book.Negative = 0
	}

	switch msg.Operation {
	case 1:
		book.Positive = book.Positive + msg.Count
	case 0:
		book.Negative = book.Negative + msg.Count
	}
	k.SetBook(ctx, book)

	// Update Ballot
	ballotVote, found := k.GetBallot(ctx, msg.Receiver)
	if !found {
		ballotVote.Index = msg.Receiver
		// ballotVote.Receiver = msg.Receiver
		ballotVote.Count = 0
		ballotVote.Sign = 1
	}
	k.calcVotes(ctx, msg, &ballotVote)

	k.SetBallot(ctx, ballotVote)
}

func (k Keeper) uncastVote(ctx sdk.Context, msg *types.MsgCreateVote, castedVotes *types.VoteCasted) {

	// Update Book and Ballot
	index := msg.Creator + "->" + msg.Receiver

	book, found := k.GetBook(ctx, index)

	if !found {
		book.Index = index
		book.Positive = 0
		book.Negative = 0
	}

	switch msg.Operation {
	case 1:
		if book.Positive >= msg.Count {
			// Update Vote-casted
			castedVotes.Count = castedVotes.Count - msg.Count

			book.Positive = book.Positive - msg.Count
			k.SetBook(ctx, book)

			// Update Ballot
			ballotVote, found := k.GetBallot(ctx, msg.Receiver)

			if !found {
				ballotVote.Index = msg.Receiver
				// ballotVote.Receiver = msg.Receiver
				ballotVote.Count = 0
				ballotVote.Sign = 1
			}

			msg.Operation = 0

			k.calcVotes(ctx, msg, &ballotVote)

			k.SetBallot(ctx, ballotVote)
		} else {
			panic("you have not casted this many positive votes")
		}
	case 0:
		if book.Negative >= msg.Count {
			// Update Vote-casted
			castedVotes.Count = castedVotes.Count - msg.Count

			book.Negative = book.Negative - msg.Count
			k.SetBook(ctx, book)

			// Update Ballot
			ballotVote, found := k.GetBallot(ctx, msg.Receiver)

			if !found {
				ballotVote.Index = msg.Receiver
				// ballotVote.Receiver = msg.Receiver
				ballotVote.Count = 0
				ballotVote.Sign = 1
			}

			msg.Operation = 1

			k.calcVotes(ctx, msg, &ballotVote)

			k.SetBallot(ctx, ballotVote)
		} else {
			panic("you have not casted this many negative votes")
		}
	}
}

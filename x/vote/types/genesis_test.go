package types_test

import (
	"testing"

	"github.com/mande-labs/mande/x/vote/types"
	"github.com/stretchr/testify/require"
)

func TestGenesisState_Validate(t *testing.T) {
	for _, tc := range []struct {
		desc     string
		genState *types.GenesisState
		valid    bool
	}{
		{
			desc:     "default is valid",
			genState: types.DefaultGenesis(),
			valid:    true,
		},
		{
			desc: "valid genesis state",
			genState: &types.GenesisState{

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
				// this line is used by starport scaffolding # types/genesis/validField
			},
			valid: true,
		},
		{
			desc: "duplicated voteLog",
			genState: &types.GenesisState{
				VoteLogList: []types.VoteLog{
					{
						Id: 0,
					},
					{
						Id: 0,
					},
				},
			},
			valid: false,
		},
		{
			desc: "invalid voteLog count",
			genState: &types.GenesisState{
				VoteLogList: []types.VoteLog{
					{
						Id: 1,
					},
				},
				VoteLogCount: 0,
			},
			valid: false,
		},
		{
			desc: "duplicated voteCasted",
			genState: &types.GenesisState{
				VoteCastedList: []types.VoteCasted{
					{
						Index: "0",
					},
					{
						Index: "0",
					},
				},
			},
			valid: false,
		},
		{
			desc: "duplicated ballot",
			genState: &types.GenesisState{
				BallotList: []types.Ballot{
					{
						Index: "0",
					},
					{
						Index: "0",
					},
				},
			},
			valid: false,
		},
		{
			desc: "duplicated book",
			genState: &types.GenesisState{
				BookList: []types.Book{
					{
						Index: "0",
					},
					{
						Index: "0",
					},
				},
			},
			valid: false,
		},
		// this line is used by starport scaffolding # types/genesis/testcase
	} {
		t.Run(tc.desc, func(t *testing.T) {
			err := tc.genState.Validate()
			if tc.valid {
				require.NoError(t, err)
			} else {
				require.Error(t, err)
			}
		})
	}
}

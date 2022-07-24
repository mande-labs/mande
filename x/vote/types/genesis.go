package types

import (
	"fmt"
)

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		VoteLogList:    []VoteLog{},
		VoteCastedList: []VoteCasted{},
		BallotList:     []Ballot{},
		BookList:       []Book{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated ID in voteLog
	voteLogIdMap := make(map[uint64]bool)
	voteLogCount := gs.GetVoteLogCount()
	for _, elem := range gs.VoteLogList {
		if _, ok := voteLogIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for voteLog")
		}
		if elem.Id >= voteLogCount {
			return fmt.Errorf("voteLog id should be lower or equal than the last id")
		}
		voteLogIdMap[elem.Id] = true
	}
	// Check for duplicated index in voteCasted
	voteCastedIndexMap := make(map[string]struct{})

	for _, elem := range gs.VoteCastedList {
		index := string(VoteCastedKey(elem.Index))
		if _, ok := voteCastedIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for voteCasted")
		}
		voteCastedIndexMap[index] = struct{}{}
	}
	// Check for duplicated index in ballot
	ballotIndexMap := make(map[string]struct{})

	for _, elem := range gs.BallotList {
		index := string(BallotKey(elem.Index))
		if _, ok := ballotIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for ballot")
		}
		ballotIndexMap[index] = struct{}{}
	}
	// Check for duplicated index in book
	bookIndexMap := make(map[string]struct{})

	for _, elem := range gs.BookList {
		index := string(BookKey(elem.Index))
		if _, ok := bookIndexMap[index]; ok {
			return fmt.Errorf("duplicated index for book")
		}
		bookIndexMap[index] = struct{}{}
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}

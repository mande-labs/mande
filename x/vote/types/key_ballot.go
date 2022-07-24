package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// BallotKeyPrefix is the prefix to retrieve all Ballot
	BallotKeyPrefix = "Ballot/value/"
)

// BallotKey returns the store key to retrieve a Ballot from the index fields
func BallotKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}

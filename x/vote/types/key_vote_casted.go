package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// VoteCastedKeyPrefix is the prefix to retrieve all VoteCasted
	VoteCastedKeyPrefix = "VoteCasted/value/"
)

// VoteCastedKey returns the store key to retrieve a VoteCasted from the index fields
func VoteCastedKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}

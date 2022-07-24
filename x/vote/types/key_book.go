package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// BookKeyPrefix is the prefix to retrieve all Book
	BookKeyPrefix = "Book/value/"
)

// BookKey returns the store key to retrieve a Book from the index fields
func BookKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}

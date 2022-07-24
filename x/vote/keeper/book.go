package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/mande-labs/mande/x/vote/types"
)

// SetBook set a specific book in the store from its index
func (k Keeper) SetBook(ctx sdk.Context, book types.Book) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BookKeyPrefix))
	b := k.cdc.MustMarshal(&book)
	store.Set(types.BookKey(
		book.Index,
	), b)
}

// GetBook returns a book from its index
func (k Keeper) GetBook(
	ctx sdk.Context,
	index string,

) (val types.Book, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BookKeyPrefix))

	b := store.Get(types.BookKey(
		index,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveBook removes a book from the store
func (k Keeper) RemoveBook(
	ctx sdk.Context,
	index string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BookKeyPrefix))
	store.Delete(types.BookKey(
		index,
	))
}

// GetAllBook returns all book
func (k Keeper) GetAllBook(ctx sdk.Context) (list []types.Book) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.BookKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Book
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/mande-labs/mande/x/vote/types"
)

// SetVoteCasted set a specific voteCasted in the store from its index
func (k Keeper) SetVoteCasted(ctx sdk.Context, voteCasted types.VoteCasted) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.VoteCastedKeyPrefix))
	b := k.cdc.MustMarshal(&voteCasted)
	store.Set(types.VoteCastedKey(
		voteCasted.Index,
	), b)
}

// GetVoteCasted returns a voteCasted from its index
func (k Keeper) GetVoteCasted(
	ctx sdk.Context,
	index string,

) (val types.VoteCasted, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.VoteCastedKeyPrefix))

	b := store.Get(types.VoteCastedKey(
		index,
	))
	if b == nil {
		return val, false
	}

	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveVoteCasted removes a voteCasted from the store
func (k Keeper) RemoveVoteCasted(
	ctx sdk.Context,
	index string,

) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.VoteCastedKeyPrefix))
	store.Delete(types.VoteCastedKey(
		index,
	))
}

// GetAllVoteCasted returns all voteCasted
func (k Keeper) GetAllVoteCasted(ctx sdk.Context) (list []types.VoteCasted) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.VoteCastedKeyPrefix))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.VoteCasted
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

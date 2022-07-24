package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/mande-labs/mande/x/vote/types"
)

// GetVoteLogCount get the total number of voteLog
func (k Keeper) GetVoteLogCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.VoteLogCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetVoteLogCount set the total number of voteLog
func (k Keeper) SetVoteLogCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.VoteLogCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendVoteLog appends a voteLog in the store with a new id and update the count
func (k Keeper) AppendVoteLog(
	ctx sdk.Context,
	voteLog types.VoteLog,
) uint64 {
	// Create the voteLog
	count := k.GetVoteLogCount(ctx)

	// Set the ID of the appended value
	voteLog.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.VoteLogKey))
	appendedValue := k.cdc.MustMarshal(&voteLog)
	store.Set(GetVoteLogIDBytes(voteLog.Id), appendedValue)

	// Update voteLog count
	k.SetVoteLogCount(ctx, count+1)

	return count
}

// SetVoteLog set a specific voteLog in the store
func (k Keeper) SetVoteLog(ctx sdk.Context, voteLog types.VoteLog) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.VoteLogKey))
	b := k.cdc.MustMarshal(&voteLog)
	store.Set(GetVoteLogIDBytes(voteLog.Id), b)
}

// GetVoteLog returns a voteLog from its id
func (k Keeper) GetVoteLog(ctx sdk.Context, id uint64) (val types.VoteLog, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.VoteLogKey))
	b := store.Get(GetVoteLogIDBytes(id))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveVoteLog removes a voteLog from the store
func (k Keeper) RemoveVoteLog(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.VoteLogKey))
	store.Delete(GetVoteLogIDBytes(id))
}

// GetAllVoteLog returns all voteLog
func (k Keeper) GetAllVoteLog(ctx sdk.Context) (list []types.VoteLog) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.VoteLogKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.VoteLog
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetVoteLogIDBytes returns the byte representation of the ID
func GetVoteLogIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetVoteLogIDFromBytes returns ID in uint64 format from a byte array
func GetVoteLogIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}

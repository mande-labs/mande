package keeper

import (
	"github.com/mande-labs/mande/x/vote/types"
)

var _ types.QueryServer = Keeper{}

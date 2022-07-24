package cli

import (
	"fmt"
	// "strings"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	// "github.com/cosmos/cosmos-sdk/client/flags"
	// sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/mande-labs/mande/x/vote/types"
)

// GetQueryCmd returns the cli query commands for this module
func GetQueryCmd(queryRoute string) *cobra.Command {
	// Group vote queries under a subcommand
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("Querying commands for the %s module", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(CmdQueryParams())
	cmd.AddCommand(CmdListVoteLog())
	cmd.AddCommand(CmdShowVoteLog())
	cmd.AddCommand(CmdListVoteCasted())
	cmd.AddCommand(CmdShowVoteCasted())
	cmd.AddCommand(CmdListBallot())
	cmd.AddCommand(CmdShowBallot())
	cmd.AddCommand(CmdListBook())
	cmd.AddCommand(CmdShowBook())
	// this line is used by starport scaffolding # 1

	return cmd
}

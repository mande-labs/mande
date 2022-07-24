package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/mande-labs/mande/x/vote/types"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdCreateVote() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "create-vote [receiver] [count] [operation] [mode]",
		Short: "Broadcast message create-vote",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argReceiver := args[0]
			argCount, err := cast.ToUint64E(args[1])
			if err != nil {
				return err
			}
			argOperation, err := cast.ToUint64E(args[2])
			if err != nil {
				return err
			}
			argMode, err := cast.ToUint64E(args[3])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCreateVote(
				clientCtx.GetFromAddress().String(),
				argReceiver,
				argCount,
				argOperation,
				argMode,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

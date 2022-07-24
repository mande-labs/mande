/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Params } from "../vote/params";
import { VoteLog } from "../vote/vote_log";
import { VoteCasted } from "../vote/vote_casted";
import { Ballot } from "../vote/ballot";
import { Book } from "../vote/book";

export const protobufPackage = "mandelabs.mande.vote";

/** GenesisState defines the vote module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  voteLogList: VoteLog[];
  voteLogCount: number;
  voteCastedList: VoteCasted[];
  ballotList: Ballot[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  bookList: Book[];
}

const baseGenesisState: object = { voteLogCount: 0 };

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.voteLogList) {
      VoteLog.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.voteLogCount !== 0) {
      writer.uint32(24).uint64(message.voteLogCount);
    }
    for (const v of message.voteCastedList) {
      VoteCasted.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.ballotList) {
      Ballot.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.bookList) {
      Book.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.voteLogList = [];
    message.voteCastedList = [];
    message.ballotList = [];
    message.bookList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.voteLogList.push(VoteLog.decode(reader, reader.uint32()));
          break;
        case 3:
          message.voteLogCount = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.voteCastedList.push(
            VoteCasted.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.ballotList.push(Ballot.decode(reader, reader.uint32()));
          break;
        case 6:
          message.bookList.push(Book.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.voteLogList = [];
    message.voteCastedList = [];
    message.ballotList = [];
    message.bookList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    if (object.voteLogList !== undefined && object.voteLogList !== null) {
      for (const e of object.voteLogList) {
        message.voteLogList.push(VoteLog.fromJSON(e));
      }
    }
    if (object.voteLogCount !== undefined && object.voteLogCount !== null) {
      message.voteLogCount = Number(object.voteLogCount);
    } else {
      message.voteLogCount = 0;
    }
    if (object.voteCastedList !== undefined && object.voteCastedList !== null) {
      for (const e of object.voteCastedList) {
        message.voteCastedList.push(VoteCasted.fromJSON(e));
      }
    }
    if (object.ballotList !== undefined && object.ballotList !== null) {
      for (const e of object.ballotList) {
        message.ballotList.push(Ballot.fromJSON(e));
      }
    }
    if (object.bookList !== undefined && object.bookList !== null) {
      for (const e of object.bookList) {
        message.bookList.push(Book.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.voteLogList) {
      obj.voteLogList = message.voteLogList.map((e) =>
        e ? VoteLog.toJSON(e) : undefined
      );
    } else {
      obj.voteLogList = [];
    }
    message.voteLogCount !== undefined &&
      (obj.voteLogCount = message.voteLogCount);
    if (message.voteCastedList) {
      obj.voteCastedList = message.voteCastedList.map((e) =>
        e ? VoteCasted.toJSON(e) : undefined
      );
    } else {
      obj.voteCastedList = [];
    }
    if (message.ballotList) {
      obj.ballotList = message.ballotList.map((e) =>
        e ? Ballot.toJSON(e) : undefined
      );
    } else {
      obj.ballotList = [];
    }
    if (message.bookList) {
      obj.bookList = message.bookList.map((e) =>
        e ? Book.toJSON(e) : undefined
      );
    } else {
      obj.bookList = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.voteLogList = [];
    message.voteCastedList = [];
    message.ballotList = [];
    message.bookList = [];
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    if (object.voteLogList !== undefined && object.voteLogList !== null) {
      for (const e of object.voteLogList) {
        message.voteLogList.push(VoteLog.fromPartial(e));
      }
    }
    if (object.voteLogCount !== undefined && object.voteLogCount !== null) {
      message.voteLogCount = object.voteLogCount;
    } else {
      message.voteLogCount = 0;
    }
    if (object.voteCastedList !== undefined && object.voteCastedList !== null) {
      for (const e of object.voteCastedList) {
        message.voteCastedList.push(VoteCasted.fromPartial(e));
      }
    }
    if (object.ballotList !== undefined && object.ballotList !== null) {
      for (const e of object.ballotList) {
        message.ballotList.push(Ballot.fromPartial(e));
      }
    }
    if (object.bookList !== undefined && object.bookList !== null) {
      for (const e of object.bookList) {
        message.bookList.push(Book.fromPartial(e));
      }
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}

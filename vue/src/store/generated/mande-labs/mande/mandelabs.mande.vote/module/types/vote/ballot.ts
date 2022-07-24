/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "mandelabs.mande.vote";

export interface Ballot {
  index: string;
  count: number;
  sign: number;
}

const baseBallot: object = { index: "", count: 0, sign: 0 };

export const Ballot = {
  encode(message: Ballot, writer: Writer = Writer.create()): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    if (message.count !== 0) {
      writer.uint32(16).uint64(message.count);
    }
    if (message.sign !== 0) {
      writer.uint32(24).uint64(message.sign);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Ballot {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBallot } as Ballot;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        case 2:
          message.count = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.sign = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Ballot {
    const message = { ...baseBallot } as Ballot;
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = Number(object.count);
    } else {
      message.count = 0;
    }
    if (object.sign !== undefined && object.sign !== null) {
      message.sign = Number(object.sign);
    } else {
      message.sign = 0;
    }
    return message;
  },

  toJSON(message: Ballot): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.count !== undefined && (obj.count = message.count);
    message.sign !== undefined && (obj.sign = message.sign);
    return obj;
  },

  fromPartial(object: DeepPartial<Ballot>): Ballot {
    const message = { ...baseBallot } as Ballot;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = object.count;
    } else {
      message.count = 0;
    }
    if (object.sign !== undefined && object.sign !== null) {
      message.sign = object.sign;
    } else {
      message.sign = 0;
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

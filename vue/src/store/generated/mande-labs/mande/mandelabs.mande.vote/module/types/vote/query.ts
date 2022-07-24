/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Params } from "../vote/params";
import { VoteLog } from "../vote/vote_log";
import {
  PageRequest,
  PageResponse,
} from "../cosmos/base/query/v1beta1/pagination";
import { VoteCasted } from "../vote/vote_casted";
import { Ballot } from "../vote/ballot";
import { Book } from "../vote/book";

export const protobufPackage = "mandelabs.mande.vote";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetVoteLogRequest {
  id: number;
}

export interface QueryGetVoteLogResponse {
  VoteLog: VoteLog | undefined;
}

export interface QueryAllVoteLogRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllVoteLogResponse {
  VoteLog: VoteLog[];
  pagination: PageResponse | undefined;
}

export interface QueryGetVoteCastedRequest {
  index: string;
}

export interface QueryGetVoteCastedResponse {
  voteCasted: VoteCasted | undefined;
}

export interface QueryAllVoteCastedRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllVoteCastedResponse {
  voteCasted: VoteCasted[];
  pagination: PageResponse | undefined;
}

export interface QueryGetBallotRequest {
  index: string;
}

export interface QueryGetBallotResponse {
  ballot: Ballot | undefined;
}

export interface QueryAllBallotRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllBallotResponse {
  ballot: Ballot[];
  pagination: PageResponse | undefined;
}

export interface QueryGetBookRequest {
  index: string;
}

export interface QueryGetBookResponse {
  book: Book | undefined;
}

export interface QueryAllBookRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllBookResponse {
  book: Book[];
  pagination: PageResponse | undefined;
}

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
    return message;
  },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params);
    } else {
      message.params = undefined;
    }
    return message;
  },
};

const baseQueryGetVoteLogRequest: object = { id: 0 };

export const QueryGetVoteLogRequest = {
  encode(
    message: QueryGetVoteLogRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetVoteLogRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetVoteLogRequest } as QueryGetVoteLogRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetVoteLogRequest {
    const message = { ...baseQueryGetVoteLogRequest } as QueryGetVoteLogRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },

  toJSON(message: QueryGetVoteLogRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetVoteLogRequest>
  ): QueryGetVoteLogRequest {
    const message = { ...baseQueryGetVoteLogRequest } as QueryGetVoteLogRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
};

const baseQueryGetVoteLogResponse: object = {};

export const QueryGetVoteLogResponse = {
  encode(
    message: QueryGetVoteLogResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.VoteLog !== undefined) {
      VoteLog.encode(message.VoteLog, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetVoteLogResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetVoteLogResponse,
    } as QueryGetVoteLogResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.VoteLog = VoteLog.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetVoteLogResponse {
    const message = {
      ...baseQueryGetVoteLogResponse,
    } as QueryGetVoteLogResponse;
    if (object.VoteLog !== undefined && object.VoteLog !== null) {
      message.VoteLog = VoteLog.fromJSON(object.VoteLog);
    } else {
      message.VoteLog = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetVoteLogResponse): unknown {
    const obj: any = {};
    message.VoteLog !== undefined &&
      (obj.VoteLog = message.VoteLog
        ? VoteLog.toJSON(message.VoteLog)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetVoteLogResponse>
  ): QueryGetVoteLogResponse {
    const message = {
      ...baseQueryGetVoteLogResponse,
    } as QueryGetVoteLogResponse;
    if (object.VoteLog !== undefined && object.VoteLog !== null) {
      message.VoteLog = VoteLog.fromPartial(object.VoteLog);
    } else {
      message.VoteLog = undefined;
    }
    return message;
  },
};

const baseQueryAllVoteLogRequest: object = {};

export const QueryAllVoteLogRequest = {
  encode(
    message: QueryAllVoteLogRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllVoteLogRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllVoteLogRequest } as QueryAllVoteLogRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllVoteLogRequest {
    const message = { ...baseQueryAllVoteLogRequest } as QueryAllVoteLogRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllVoteLogRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllVoteLogRequest>
  ): QueryAllVoteLogRequest {
    const message = { ...baseQueryAllVoteLogRequest } as QueryAllVoteLogRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllVoteLogResponse: object = {};

export const QueryAllVoteLogResponse = {
  encode(
    message: QueryAllVoteLogResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.VoteLog) {
      VoteLog.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllVoteLogResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllVoteLogResponse,
    } as QueryAllVoteLogResponse;
    message.VoteLog = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.VoteLog.push(VoteLog.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllVoteLogResponse {
    const message = {
      ...baseQueryAllVoteLogResponse,
    } as QueryAllVoteLogResponse;
    message.VoteLog = [];
    if (object.VoteLog !== undefined && object.VoteLog !== null) {
      for (const e of object.VoteLog) {
        message.VoteLog.push(VoteLog.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllVoteLogResponse): unknown {
    const obj: any = {};
    if (message.VoteLog) {
      obj.VoteLog = message.VoteLog.map((e) =>
        e ? VoteLog.toJSON(e) : undefined
      );
    } else {
      obj.VoteLog = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllVoteLogResponse>
  ): QueryAllVoteLogResponse {
    const message = {
      ...baseQueryAllVoteLogResponse,
    } as QueryAllVoteLogResponse;
    message.VoteLog = [];
    if (object.VoteLog !== undefined && object.VoteLog !== null) {
      for (const e of object.VoteLog) {
        message.VoteLog.push(VoteLog.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetVoteCastedRequest: object = { index: "" };

export const QueryGetVoteCastedRequest = {
  encode(
    message: QueryGetVoteCastedRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetVoteCastedRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetVoteCastedRequest,
    } as QueryGetVoteCastedRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetVoteCastedRequest {
    const message = {
      ...baseQueryGetVoteCastedRequest,
    } as QueryGetVoteCastedRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    return message;
  },

  toJSON(message: QueryGetVoteCastedRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetVoteCastedRequest>
  ): QueryGetVoteCastedRequest {
    const message = {
      ...baseQueryGetVoteCastedRequest,
    } as QueryGetVoteCastedRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    return message;
  },
};

const baseQueryGetVoteCastedResponse: object = {};

export const QueryGetVoteCastedResponse = {
  encode(
    message: QueryGetVoteCastedResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.voteCasted !== undefined) {
      VoteCasted.encode(message.voteCasted, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryGetVoteCastedResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetVoteCastedResponse,
    } as QueryGetVoteCastedResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.voteCasted = VoteCasted.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetVoteCastedResponse {
    const message = {
      ...baseQueryGetVoteCastedResponse,
    } as QueryGetVoteCastedResponse;
    if (object.voteCasted !== undefined && object.voteCasted !== null) {
      message.voteCasted = VoteCasted.fromJSON(object.voteCasted);
    } else {
      message.voteCasted = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetVoteCastedResponse): unknown {
    const obj: any = {};
    message.voteCasted !== undefined &&
      (obj.voteCasted = message.voteCasted
        ? VoteCasted.toJSON(message.voteCasted)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetVoteCastedResponse>
  ): QueryGetVoteCastedResponse {
    const message = {
      ...baseQueryGetVoteCastedResponse,
    } as QueryGetVoteCastedResponse;
    if (object.voteCasted !== undefined && object.voteCasted !== null) {
      message.voteCasted = VoteCasted.fromPartial(object.voteCasted);
    } else {
      message.voteCasted = undefined;
    }
    return message;
  },
};

const baseQueryAllVoteCastedRequest: object = {};

export const QueryAllVoteCastedRequest = {
  encode(
    message: QueryAllVoteCastedRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllVoteCastedRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllVoteCastedRequest,
    } as QueryAllVoteCastedRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllVoteCastedRequest {
    const message = {
      ...baseQueryAllVoteCastedRequest,
    } as QueryAllVoteCastedRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllVoteCastedRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllVoteCastedRequest>
  ): QueryAllVoteCastedRequest {
    const message = {
      ...baseQueryAllVoteCastedRequest,
    } as QueryAllVoteCastedRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllVoteCastedResponse: object = {};

export const QueryAllVoteCastedResponse = {
  encode(
    message: QueryAllVoteCastedResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.voteCasted) {
      VoteCasted.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAllVoteCastedResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryAllVoteCastedResponse,
    } as QueryAllVoteCastedResponse;
    message.voteCasted = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.voteCasted.push(VoteCasted.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllVoteCastedResponse {
    const message = {
      ...baseQueryAllVoteCastedResponse,
    } as QueryAllVoteCastedResponse;
    message.voteCasted = [];
    if (object.voteCasted !== undefined && object.voteCasted !== null) {
      for (const e of object.voteCasted) {
        message.voteCasted.push(VoteCasted.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllVoteCastedResponse): unknown {
    const obj: any = {};
    if (message.voteCasted) {
      obj.voteCasted = message.voteCasted.map((e) =>
        e ? VoteCasted.toJSON(e) : undefined
      );
    } else {
      obj.voteCasted = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllVoteCastedResponse>
  ): QueryAllVoteCastedResponse {
    const message = {
      ...baseQueryAllVoteCastedResponse,
    } as QueryAllVoteCastedResponse;
    message.voteCasted = [];
    if (object.voteCasted !== undefined && object.voteCasted !== null) {
      for (const e of object.voteCasted) {
        message.voteCasted.push(VoteCasted.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetBallotRequest: object = { index: "" };

export const QueryGetBallotRequest = {
  encode(
    message: QueryGetBallotRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetBallotRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetBallotRequest } as QueryGetBallotRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBallotRequest {
    const message = { ...baseQueryGetBallotRequest } as QueryGetBallotRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    return message;
  },

  toJSON(message: QueryGetBallotRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetBallotRequest>
  ): QueryGetBallotRequest {
    const message = { ...baseQueryGetBallotRequest } as QueryGetBallotRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    return message;
  },
};

const baseQueryGetBallotResponse: object = {};

export const QueryGetBallotResponse = {
  encode(
    message: QueryGetBallotResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.ballot !== undefined) {
      Ballot.encode(message.ballot, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetBallotResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetBallotResponse } as QueryGetBallotResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ballot = Ballot.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBallotResponse {
    const message = { ...baseQueryGetBallotResponse } as QueryGetBallotResponse;
    if (object.ballot !== undefined && object.ballot !== null) {
      message.ballot = Ballot.fromJSON(object.ballot);
    } else {
      message.ballot = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetBallotResponse): unknown {
    const obj: any = {};
    message.ballot !== undefined &&
      (obj.ballot = message.ballot ? Ballot.toJSON(message.ballot) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetBallotResponse>
  ): QueryGetBallotResponse {
    const message = { ...baseQueryGetBallotResponse } as QueryGetBallotResponse;
    if (object.ballot !== undefined && object.ballot !== null) {
      message.ballot = Ballot.fromPartial(object.ballot);
    } else {
      message.ballot = undefined;
    }
    return message;
  },
};

const baseQueryAllBallotRequest: object = {};

export const QueryAllBallotRequest = {
  encode(
    message: QueryAllBallotRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllBallotRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllBallotRequest } as QueryAllBallotRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllBallotRequest {
    const message = { ...baseQueryAllBallotRequest } as QueryAllBallotRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllBallotRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllBallotRequest>
  ): QueryAllBallotRequest {
    const message = { ...baseQueryAllBallotRequest } as QueryAllBallotRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllBallotResponse: object = {};

export const QueryAllBallotResponse = {
  encode(
    message: QueryAllBallotResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.ballot) {
      Ballot.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllBallotResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllBallotResponse } as QueryAllBallotResponse;
    message.ballot = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ballot.push(Ballot.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllBallotResponse {
    const message = { ...baseQueryAllBallotResponse } as QueryAllBallotResponse;
    message.ballot = [];
    if (object.ballot !== undefined && object.ballot !== null) {
      for (const e of object.ballot) {
        message.ballot.push(Ballot.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllBallotResponse): unknown {
    const obj: any = {};
    if (message.ballot) {
      obj.ballot = message.ballot.map((e) =>
        e ? Ballot.toJSON(e) : undefined
      );
    } else {
      obj.ballot = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryAllBallotResponse>
  ): QueryAllBallotResponse {
    const message = { ...baseQueryAllBallotResponse } as QueryAllBallotResponse;
    message.ballot = [];
    if (object.ballot !== undefined && object.ballot !== null) {
      for (const e of object.ballot) {
        message.ballot.push(Ballot.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryGetBookRequest: object = { index: "" };

export const QueryGetBookRequest = {
  encode(
    message: QueryGetBookRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.index !== "") {
      writer.uint32(10).string(message.index);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetBookRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetBookRequest } as QueryGetBookRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBookRequest {
    const message = { ...baseQueryGetBookRequest } as QueryGetBookRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = String(object.index);
    } else {
      message.index = "";
    }
    return message;
  },

  toJSON(message: QueryGetBookRequest): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetBookRequest>): QueryGetBookRequest {
    const message = { ...baseQueryGetBookRequest } as QueryGetBookRequest;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = "";
    }
    return message;
  },
};

const baseQueryGetBookResponse: object = {};

export const QueryGetBookResponse = {
  encode(
    message: QueryGetBookResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.book !== undefined) {
      Book.encode(message.book, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetBookResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetBookResponse } as QueryGetBookResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.book = Book.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetBookResponse {
    const message = { ...baseQueryGetBookResponse } as QueryGetBookResponse;
    if (object.book !== undefined && object.book !== null) {
      message.book = Book.fromJSON(object.book);
    } else {
      message.book = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetBookResponse): unknown {
    const obj: any = {};
    message.book !== undefined &&
      (obj.book = message.book ? Book.toJSON(message.book) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetBookResponse>): QueryGetBookResponse {
    const message = { ...baseQueryGetBookResponse } as QueryGetBookResponse;
    if (object.book !== undefined && object.book !== null) {
      message.book = Book.fromPartial(object.book);
    } else {
      message.book = undefined;
    }
    return message;
  },
};

const baseQueryAllBookRequest: object = {};

export const QueryAllBookRequest = {
  encode(
    message: QueryAllBookRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllBookRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllBookRequest } as QueryAllBookRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllBookRequest {
    const message = { ...baseQueryAllBookRequest } as QueryAllBookRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllBookRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllBookRequest>): QueryAllBookRequest {
    const message = { ...baseQueryAllBookRequest } as QueryAllBookRequest;
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryAllBookResponse: object = {};

export const QueryAllBookResponse = {
  encode(
    message: QueryAllBookResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.book) {
      Book.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllBookResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryAllBookResponse } as QueryAllBookResponse;
    message.book = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.book.push(Book.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllBookResponse {
    const message = { ...baseQueryAllBookResponse } as QueryAllBookResponse;
    message.book = [];
    if (object.book !== undefined && object.book !== null) {
      for (const e of object.book) {
        message.book.push(Book.fromJSON(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryAllBookResponse): unknown {
    const obj: any = {};
    if (message.book) {
      obj.book = message.book.map((e) => (e ? Book.toJSON(e) : undefined));
    } else {
      obj.book = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryAllBookResponse>): QueryAllBookResponse {
    const message = { ...baseQueryAllBookResponse } as QueryAllBookResponse;
    message.book = [];
    if (object.book !== undefined && object.book !== null) {
      for (const e of object.book) {
        message.book.push(Book.fromPartial(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a VoteLog by id. */
  VoteLog(request: QueryGetVoteLogRequest): Promise<QueryGetVoteLogResponse>;
  /** Queries a list of VoteLog items. */
  VoteLogAll(request: QueryAllVoteLogRequest): Promise<QueryAllVoteLogResponse>;
  /** Queries a VoteCasted by index. */
  VoteCasted(
    request: QueryGetVoteCastedRequest
  ): Promise<QueryGetVoteCastedResponse>;
  /** Queries a list of VoteCasted items. */
  VoteCastedAll(
    request: QueryAllVoteCastedRequest
  ): Promise<QueryAllVoteCastedResponse>;
  /** Queries a Ballot by index. */
  Ballot(request: QueryGetBallotRequest): Promise<QueryGetBallotResponse>;
  /** Queries a list of Ballot items. */
  BallotAll(request: QueryAllBallotRequest): Promise<QueryAllBallotResponse>;
  /** Queries a Book by index. */
  Book(request: QueryGetBookRequest): Promise<QueryGetBookResponse>;
  /** Queries a list of Book items. */
  BookAll(request: QueryAllBookRequest): Promise<QueryAllBookResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mandelabs.mande.vote.Query",
      "Params",
      data
    );
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)));
  }

  VoteLog(request: QueryGetVoteLogRequest): Promise<QueryGetVoteLogResponse> {
    const data = QueryGetVoteLogRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mandelabs.mande.vote.Query",
      "VoteLog",
      data
    );
    return promise.then((data) =>
      QueryGetVoteLogResponse.decode(new Reader(data))
    );
  }

  VoteLogAll(
    request: QueryAllVoteLogRequest
  ): Promise<QueryAllVoteLogResponse> {
    const data = QueryAllVoteLogRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mandelabs.mande.vote.Query",
      "VoteLogAll",
      data
    );
    return promise.then((data) =>
      QueryAllVoteLogResponse.decode(new Reader(data))
    );
  }

  VoteCasted(
    request: QueryGetVoteCastedRequest
  ): Promise<QueryGetVoteCastedResponse> {
    const data = QueryGetVoteCastedRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mandelabs.mande.vote.Query",
      "VoteCasted",
      data
    );
    return promise.then((data) =>
      QueryGetVoteCastedResponse.decode(new Reader(data))
    );
  }

  VoteCastedAll(
    request: QueryAllVoteCastedRequest
  ): Promise<QueryAllVoteCastedResponse> {
    const data = QueryAllVoteCastedRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mandelabs.mande.vote.Query",
      "VoteCastedAll",
      data
    );
    return promise.then((data) =>
      QueryAllVoteCastedResponse.decode(new Reader(data))
    );
  }

  Ballot(request: QueryGetBallotRequest): Promise<QueryGetBallotResponse> {
    const data = QueryGetBallotRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mandelabs.mande.vote.Query",
      "Ballot",
      data
    );
    return promise.then((data) =>
      QueryGetBallotResponse.decode(new Reader(data))
    );
  }

  BallotAll(request: QueryAllBallotRequest): Promise<QueryAllBallotResponse> {
    const data = QueryAllBallotRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mandelabs.mande.vote.Query",
      "BallotAll",
      data
    );
    return promise.then((data) =>
      QueryAllBallotResponse.decode(new Reader(data))
    );
  }

  Book(request: QueryGetBookRequest): Promise<QueryGetBookResponse> {
    const data = QueryGetBookRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mandelabs.mande.vote.Query",
      "Book",
      data
    );
    return promise.then((data) =>
      QueryGetBookResponse.decode(new Reader(data))
    );
  }

  BookAll(request: QueryAllBookRequest): Promise<QueryAllBookResponse> {
    const data = QueryAllBookRequest.encode(request).finish();
    const promise = this.rpc.request(
      "mandelabs.mande.vote.Query",
      "BookAll",
      data
    );
    return promise.then((data) =>
      QueryAllBookResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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

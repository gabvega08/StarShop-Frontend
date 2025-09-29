import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CCS3JJZJFSNYOP4X7JSVJBFRFBJHOSPKRWUPQKW5J3I5UZ3L252YOWZW",
  }
} as const

export enum VoteType {
  Upvote = 1,
  Downvote = 2,
}

export const Errors = {
  1: {message:"VotingPeriodEnded"},
  2: {message:"AlreadyVoted"},
  3: {message:"ReversalWindowExpired"},
  4: {message:"DailyLimitReached"},
  5: {message:"AccountTooNew"},
  6: {message:"ProductNotFound"},
  7: {message:"ProductExists"}
}


export interface Product {
  created_at: u64;
  id: string;
  name: string;
  votes: Map<string, Vote>;
}


export interface Vote {
  timestamp: u64;
  vote_type: VoteType;
  voter: string;
}

export interface Client {
  /**
   * Construct and simulate a init transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  init: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a create_product transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_product: ({id, name}: {id: string, name: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a cast_vote transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  cast_vote: ({product_id, vote_type, voter}: {product_id: string, vote_type: VoteType, voter: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a get_product_score transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_product_score: ({product_id}: {product_id: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<i32>>

  /**
   * Construct and simulate a get_trending_products transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_trending_products: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Array<string>>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAwAAAAAAAAAAAAAACFZvdGVUeXBlAAAAAgAAAAAAAAAGVXB2b3RlAAAAAAABAAAAAAAAAAhEb3dudm90ZQAAAAI=",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABwAAAAAAAAARVm90aW5nUGVyaW9kRW5kZWQAAAAAAAABAAAAAAAAAAxBbHJlYWR5Vm90ZWQAAAACAAAAAAAAABVSZXZlcnNhbFdpbmRvd0V4cGlyZWQAAAAAAAADAAAAAAAAABFEYWlseUxpbWl0UmVhY2hlZAAAAAAAAAQAAAAAAAAADUFjY291bnRUb29OZXcAAAAAAAAFAAAAAAAAAA9Qcm9kdWN0Tm90Rm91bmQAAAAABgAAAAAAAAANUHJvZHVjdEV4aXN0cwAAAAAAAAc=",
        "AAAAAQAAAAAAAAAAAAAAB1Byb2R1Y3QAAAAABAAAAAAAAAAKY3JlYXRlZF9hdAAAAAAABgAAAAAAAAACaWQAAAAAABEAAAAAAAAABG5hbWUAAAARAAAAAAAAAAV2b3RlcwAAAAAAA+wAAAATAAAH0AAAAARWb3Rl",
        "AAAAAQAAAAAAAAAAAAAABFZvdGUAAAADAAAAAAAAAAl0aW1lc3RhbXAAAAAAAAAGAAAAAAAAAAl2b3RlX3R5cGUAAAAAAAfQAAAACFZvdGVUeXBlAAAAAAAAAAV2b3RlcgAAAAAAABM=",
        "AAAAAAAAAAAAAAAEaW5pdAAAAAAAAAAA",
        "AAAAAAAAAAAAAAAOY3JlYXRlX3Byb2R1Y3QAAAAAAAIAAAAAAAAAAmlkAAAAAAARAAAAAAAAAARuYW1lAAAAEQAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAAJY2FzdF92b3RlAAAAAAAAAwAAAAAAAAAKcHJvZHVjdF9pZAAAAAAAEQAAAAAAAAAJdm90ZV90eXBlAAAAAAAH0AAAAAhWb3RlVHlwZQAAAAAAAAAFdm90ZXIAAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAARZ2V0X3Byb2R1Y3Rfc2NvcmUAAAAAAAABAAAAAAAAAApwcm9kdWN0X2lkAAAAAAARAAAAAQAAAAU=",
        "AAAAAAAAAAAAAAAVZ2V0X3RyZW5kaW5nX3Byb2R1Y3RzAAAAAAAAAAAAAAEAAAPqAAAAEQ==" ]),
      options
    )
  }
  public readonly fromJSON = {
    init: this.txFromJSON<null>,
        create_product: this.txFromJSON<Result<void>>,
        cast_vote: this.txFromJSON<Result<void>>,
        get_product_score: this.txFromJSON<i32>,
        get_trending_products: this.txFromJSON<Array<string>>
  }
}
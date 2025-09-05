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
    contractId: "CBWZBDFH5R23MJF3YPOFKTPRWLJ36ADFYDBWPLFM2DMAA44EDCTME3AL",
  }
} as const

export const DisputeError = {
  1: {message:"InsufficientFunds"},
  2: {message:"TransferFailed"},
  3: {message:"InvalidAmount"},
  4: {message:"UnauthorizedAccess"}
}

export const RefundError = {
  1: {message:"InsufficientFunds"},
  2: {message:"TransferFailed"},
  3: {message:"InvalidAmount"},
  4: {message:"UnauthorizedAccess"}
}

export const TransactionError = {
  1: {message:"InsufficientFunds"},
  2: {message:"TransferFailed"},
  3: {message:"InvalidAmount"},
  4: {message:"UnauthorizedAccess"}
}

export const PaymentError = {
  1: {message:"NotInitialized"},
  2: {message:"AlreadyInitialized"},
  3: {message:"UnauthorizedAccess"}
}

export interface Client {
  /**
   * Construct and simulate a resolve_dispute transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  resolve_dispute: ({token_id, arbitrator, buyer, seller, refund_amount, decision}: {token_id: string, arbitrator: string, buyer: string, seller: string, refund_amount: i128, decision: DisputeDecision}, options?: {
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
   * Construct and simulate a process_refund transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  process_refund: ({token_id, signer, to, refund_amount}: {token_id: string, signer: string, to: string, refund_amount: i128}, options?: {
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
   * Construct and simulate a process_deposit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  process_deposit: ({token_id, signer, to, amount_to_deposit}: {token_id: string, signer: string, to: string, amount_to_deposit: i128}, options?: {
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
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Initializes the contract with an admin address
   */
  initialize: ({admin}: {admin: string}, options?: {
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
   * Construct and simulate a upgrade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Upgrades the contract with new WASM code
   */
  upgrade: ({new_wasm_hash}: {new_wasm_hash: Buffer}, options?: {
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
   * Construct and simulate a get_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Returns the current admin address
   */
  get_admin: (options?: {
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
  }) => Promise<AssembledTransaction<Result<string>>>

  /**
   * Construct and simulate a transfer_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Transfers admin rights to a new address
   */
  transfer_admin: ({new_admin}: {new_admin: string}, options?: {
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
      new ContractSpec([ "AAAABAAAAAAAAAAAAAAADERpc3B1dGVFcnJvcgAAAAQAAAAAAAAAEUluc3VmZmljaWVudEZ1bmRzAAAAAAAAAQAAAAAAAAAOVHJhbnNmZXJGYWlsZWQAAAAAAAIAAAAAAAAADUludmFsaWRBbW91bnQAAAAAAAADAAAAAAAAABJVbmF1dGhvcml6ZWRBY2Nlc3MAAAAAAAQ=",
        "AAAAAAAAAAAAAAAPcmVzb2x2ZV9kaXNwdXRlAAAAAAYAAAAAAAAACHRva2VuX2lkAAAAEwAAAAAAAAAKYXJiaXRyYXRvcgAAAAAAEwAAAAAAAAAFYnV5ZXIAAAAAAAATAAAAAAAAAAZzZWxsZXIAAAAAABMAAAAAAAAADXJlZnVuZF9hbW91bnQAAAAAAAALAAAAAAAAAAhkZWNpc2lvbgAAB9AAAAAPRGlzcHV0ZURlY2lzaW9uAAAAAAEAAAPpAAAD7QAAAAAAAAfQAAAADERpc3B1dGVFcnJvcg==",
        "AAAABAAAAAAAAAAAAAAAC1JlZnVuZEVycm9yAAAAAAQAAAAAAAAAEUluc3VmZmljaWVudEZ1bmRzAAAAAAAAAQAAAAAAAAAOVHJhbnNmZXJGYWlsZWQAAAAAAAIAAAAAAAAADUludmFsaWRBbW91bnQAAAAAAAADAAAAAAAAABJVbmF1dGhvcml6ZWRBY2Nlc3MAAAAAAAQ=",
        "AAAAAAAAAAAAAAAOcHJvY2Vzc19yZWZ1bmQAAAAAAAQAAAAAAAAACHRva2VuX2lkAAAAEwAAAAAAAAAGc2lnbmVyAAAAAAATAAAAAAAAAAJ0bwAAAAAAEwAAAAAAAAANcmVmdW5kX2Ftb3VudAAAAAAAAAsAAAABAAAD6QAAA+0AAAAAAAAH0AAAAAtSZWZ1bmRFcnJvcgA=",
        "AAAABAAAAAAAAAAAAAAAEFRyYW5zYWN0aW9uRXJyb3IAAAAEAAAAAAAAABFJbnN1ZmZpY2llbnRGdW5kcwAAAAAAAAEAAAAAAAAADlRyYW5zZmVyRmFpbGVkAAAAAAACAAAAAAAAAA1JbnZhbGlkQW1vdW50AAAAAAAAAwAAAAAAAAASVW5hdXRob3JpemVkQWNjZXNzAAAAAAAE",
        "AAAAAAAAAAAAAAAPcHJvY2Vzc19kZXBvc2l0AAAAAAQAAAAAAAAACHRva2VuX2lkAAAAEwAAAAAAAAAGc2lnbmVyAAAAAAATAAAAAAAAAAJ0bwAAAAAAEwAAAAAAAAARYW1vdW50X3RvX2RlcG9zaXQAAAAAAAALAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAAQVHJhbnNhY3Rpb25FcnJvcg==",
        "AAAABAAAAAAAAAAAAAAADFBheW1lbnRFcnJvcgAAAAMAAAAAAAAADk5vdEluaXRpYWxpemVkAAAAAAABAAAAAAAAABJBbHJlYWR5SW5pdGlhbGl6ZWQAAAAAAAIAAAAAAAAAElVuYXV0aG9yaXplZEFjY2VzcwAAAAAAAw==",
        "AAAAAAAAAC5Jbml0aWFsaXplcyB0aGUgY29udHJhY3Qgd2l0aCBhbiBhZG1pbiBhZGRyZXNzAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAAMUGF5bWVudEVycm9y",
        "AAAAAAAAAChVcGdyYWRlcyB0aGUgY29udHJhY3Qgd2l0aCBuZXcgV0FTTSBjb2RlAAAAB3VwZ3JhZGUAAAAAAQAAAAAAAAANbmV3X3dhc21faGFzaAAAAAAAA+4AAAAgAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAAMUGF5bWVudEVycm9y",
        "AAAAAAAAACFSZXR1cm5zIHRoZSBjdXJyZW50IGFkbWluIGFkZHJlc3MAAAAAAAAJZ2V0X2FkbWluAAAAAAAAAAAAAAEAAAPpAAAAEwAAB9AAAAAMUGF5bWVudEVycm9y",
        "AAAAAAAAACdUcmFuc2ZlcnMgYWRtaW4gcmlnaHRzIHRvIGEgbmV3IGFkZHJlc3MAAAAADnRyYW5zZmVyX2FkbWluAAAAAAABAAAAAAAAAAluZXdfYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAAMUGF5bWVudEVycm9y" ]),
      options
    )
  }
  public readonly fromJSON = {
    resolve_dispute: this.txFromJSON<Result<void>>,
        process_refund: this.txFromJSON<Result<void>>,
        process_deposit: this.txFromJSON<Result<void>>,
        initialize: this.txFromJSON<Result<void>>,
        upgrade: this.txFromJSON<Result<void>>,
        get_admin: this.txFromJSON<Result<string>>,
        transfer_admin: this.txFromJSON<Result<void>>
  }
}
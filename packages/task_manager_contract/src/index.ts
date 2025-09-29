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
    contractId: "CASRZ5EIYSNTLJZCIFYKKIKLPQ74XR64N3FBYYRBN6OYC7WPOZFKCPHM",
  }
} as const

/**
 * Storage keys for contract data
 */
export type DataKey = {tag: "Admin", values: void} | {tag: "Drop", values: readonly [u32]} | {tag: "DropCount", values: void} | {tag: "UserPurchases", values: readonly [string]} | {tag: "DropPurchases", values: readonly [u32]} | {tag: "DropBuyers", values: readonly [u32]} | {tag: "Whitelist", values: void} | {tag: "UserLevels", values: readonly [string]};


/**
 * Represents a limited-time drop
 */
export interface Drop {
  creator: string;
  end_time: u64;
  id: u32;
  image_uri: string;
  max_supply: u32;
  per_user_limit: u32;
  price: i128;
  product_id: u64;
  start_time: u64;
  status: DropStatus;
  title: string;
  total_purchased: u32;
}

/**
 * Status of a drop
 */
export type DropStatus = {tag: "Pending", values: void} | {tag: "Active", values: void} | {tag: "Completed", values: void} | {tag: "Cancelled", values: void};


/**
 * Record of a purchase
 */
export interface PurchaseRecord {
  drop_id: u32;
  price_paid: i128;
  quantity: u32;
  timestamp: u64;
}

/**
 * User level for access control
 */
export type UserLevel = {tag: "Standard", values: void} | {tag: "Premium", values: void} | {tag: "Verified", values: void};

/**
 * Contract error types
 */
export const Errors = {
  1: {message:"NotInitialized"},
  2: {message:"AlreadyInitialized"},
  3: {message:"Unauthorized"},
  4: {message:"DropNotFound"},
  5: {message:"DropNotActive"},
  6: {message:"DropEnded"},
  7: {message:"DropNotStarted"},
  8: {message:"InsufficientSupply"},
  9: {message:"UserLimitExceeded"},
  10: {message:"InvalidQuantity"},
  11: {message:"InvalidTime"},
  12: {message:"InvalidPrice"},
  13: {message:"NotWhitelisted"},
  14: {message:"InsufficientLevel"},
  15: {message:"InvalidUserLevel"},
  16: {message:"PurchaseFailed"},
  17: {message:"DuplicateWhitelistEntry"},
  18: {message:"InvalidStatusTransition"}
}

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Initialize the contract with an admin
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
   * Construct and simulate a create_drop transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Create a new drop
   */
  create_drop: ({creator, title, product_id, max_supply, start_time, end_time, price, per_user_limit, image_uri}: {creator: string, title: string, product_id: u64, max_supply: u32, start_time: u64, end_time: u64, price: i128, per_user_limit: u32, image_uri: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<u32>>>

  /**
   * Construct and simulate a purchase transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Purchase from a drop
   */
  purchase: ({buyer, drop_id, quantity}: {buyer: string, drop_id: u32, quantity: u32}, options?: {
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
   * Construct and simulate a get_drop transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get drop details
   */
  get_drop: ({drop_id}: {drop_id: u32}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Drop>>>

  /**
   * Construct and simulate a get_purchase_history transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get purchase history for a user
   */
  get_purchase_history: ({user, drop_id}: {user: string, drop_id: u32}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Array<PurchaseRecord>>>>

  /**
   * Construct and simulate a get_drop_purchases transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get total purchases for a drop
   */
  get_drop_purchases: ({drop_id}: {drop_id: u32}, options?: {
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
  }) => Promise<AssembledTransaction<Result<u32>>>

  /**
   * Construct and simulate a get_buyer_list transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get buyer list for a drop
   */
  get_buyer_list: ({drop_id}: {drop_id: u32}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Array<string>>>>

  /**
   * Construct and simulate a add_to_whitelist transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Add a user to the whitelist (Admin only)
   */
  add_to_whitelist: ({admin, user}: {admin: string, user: string}, options?: {
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
   * Construct and simulate a remove_from_whitelist transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Remove a user from the whitelist (Admin only)
   */
  remove_from_whitelist: ({admin, user}: {admin: string, user: string}, options?: {
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
   * Construct and simulate a set_user_level transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Set a user's access level (Admin only)
   */
  set_user_level: ({admin, user, level}: {admin: string, user: string, level: UserLevel}, options?: {
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
   * Construct and simulate a update_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Update the status of a drop (Admin only)
   */
  update_status: ({admin, drop_id, status}: {admin: string, drop_id: u32, status: DropStatus}, options?: {
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
      new ContractSpec([ "AAAAAgAAAB5TdG9yYWdlIGtleXMgZm9yIGNvbnRyYWN0IGRhdGEAAAAAAAAAAAAHRGF0YUtleQAAAAAIAAAAAAAAAAAAAAAFQWRtaW4AAAAAAAABAAAAAAAAAAREcm9wAAAAAQAAAAQAAAAAAAAAAAAAAAlEcm9wQ291bnQAAAAAAAABAAAAAAAAAA1Vc2VyUHVyY2hhc2VzAAAAAAAAAQAAABMAAAABAAAAAAAAAA1Ecm9wUHVyY2hhc2VzAAAAAAAAAQAAAAQAAAABAAAAAAAAAApEcm9wQnV5ZXJzAAAAAAABAAAABAAAAAAAAAAAAAAACVdoaXRlbGlzdAAAAAAAAAEAAAAAAAAAClVzZXJMZXZlbHMAAAAAAAEAAAAT",
        "AAAAAQAAAB5SZXByZXNlbnRzIGEgbGltaXRlZC10aW1lIGRyb3AAAAAAAAAAAAAERHJvcAAAAAwAAAAAAAAAB2NyZWF0b3IAAAAAEwAAAAAAAAAIZW5kX3RpbWUAAAAGAAAAAAAAAAJpZAAAAAAABAAAAAAAAAAJaW1hZ2VfdXJpAAAAAAAAEAAAAAAAAAAKbWF4X3N1cHBseQAAAAAABAAAAAAAAAAOcGVyX3VzZXJfbGltaXQAAAAAAAQAAAAAAAAABXByaWNlAAAAAAAACwAAAAAAAAAKcHJvZHVjdF9pZAAAAAAABgAAAAAAAAAKc3RhcnRfdGltZQAAAAAABgAAAAAAAAAGc3RhdHVzAAAAAAfQAAAACkRyb3BTdGF0dXMAAAAAAAAAAAAFdGl0bGUAAAAAAAAQAAAAAAAAAA90b3RhbF9wdXJjaGFzZWQAAAAABA==",
        "AAAAAgAAABBTdGF0dXMgb2YgYSBkcm9wAAAAAAAAAApEcm9wU3RhdHVzAAAAAAAEAAAAAAAAAAAAAAAHUGVuZGluZwAAAAAAAAAAAAAAAAZBY3RpdmUAAAAAAAAAAAAAAAAACUNvbXBsZXRlZAAAAAAAAAAAAAAAAAAACUNhbmNlbGxlZAAAAA==",
        "AAAAAQAAABRSZWNvcmQgb2YgYSBwdXJjaGFzZQAAAAAAAAAOUHVyY2hhc2VSZWNvcmQAAAAAAAQAAAAAAAAAB2Ryb3BfaWQAAAAABAAAAAAAAAAKcHJpY2VfcGFpZAAAAAAACwAAAAAAAAAIcXVhbnRpdHkAAAAEAAAAAAAAAAl0aW1lc3RhbXAAAAAAAAAG",
        "AAAAAgAAAB1Vc2VyIGxldmVsIGZvciBhY2Nlc3MgY29udHJvbAAAAAAAAAAAAAAJVXNlckxldmVsAAAAAAAAAwAAAAAAAAAAAAAACFN0YW5kYXJkAAAAAAAAAAAAAAAHUHJlbWl1bQAAAAAAAAAAAAAAAAhWZXJpZmllZA==",
        "AAAABAAAABRDb250cmFjdCBlcnJvciB0eXBlcwAAAAAAAAAFRXJyb3IAAAAAAAASAAAAAAAAAA5Ob3RJbml0aWFsaXplZAAAAAAAAQAAAAAAAAASQWxyZWFkeUluaXRpYWxpemVkAAAAAAACAAAAAAAAAAxVbmF1dGhvcml6ZWQAAAADAAAAAAAAAAxEcm9wTm90Rm91bmQAAAAEAAAAAAAAAA1Ecm9wTm90QWN0aXZlAAAAAAAABQAAAAAAAAAJRHJvcEVuZGVkAAAAAAAABgAAAAAAAAAORHJvcE5vdFN0YXJ0ZWQAAAAAAAcAAAAAAAAAEkluc3VmZmljaWVudFN1cHBseQAAAAAACAAAAAAAAAARVXNlckxpbWl0RXhjZWVkZWQAAAAAAAAJAAAAAAAAAA9JbnZhbGlkUXVhbnRpdHkAAAAACgAAAAAAAAALSW52YWxpZFRpbWUAAAAACwAAAAAAAAAMSW52YWxpZFByaWNlAAAADAAAAAAAAAAOTm90V2hpdGVsaXN0ZWQAAAAAAA0AAAAAAAAAEUluc3VmZmljaWVudExldmVsAAAAAAAADgAAAAAAAAAQSW52YWxpZFVzZXJMZXZlbAAAAA8AAAAAAAAADlB1cmNoYXNlRmFpbGVkAAAAAAAQAAAAAAAAABdEdXBsaWNhdGVXaGl0ZWxpc3RFbnRyeQAAAAARAAAAAAAAABdJbnZhbGlkU3RhdHVzVHJhbnNpdGlvbgAAAAAS",
        "AAAAAAAAACVJbml0aWFsaXplIHRoZSBjb250cmFjdCB3aXRoIGFuIGFkbWluAAAAAAAACmluaXRpYWxpemUAAAAAAAEAAAAAAAAABWFkbWluAAAAAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAABFDcmVhdGUgYSBuZXcgZHJvcAAAAAAAAAtjcmVhdGVfZHJvcAAAAAAJAAAAAAAAAAdjcmVhdG9yAAAAABMAAAAAAAAABXRpdGxlAAAAAAAAEAAAAAAAAAAKcHJvZHVjdF9pZAAAAAAABgAAAAAAAAAKbWF4X3N1cHBseQAAAAAABAAAAAAAAAAKc3RhcnRfdGltZQAAAAAABgAAAAAAAAAIZW5kX3RpbWUAAAAGAAAAAAAAAAVwcmljZQAAAAAAAAsAAAAAAAAADnBlcl91c2VyX2xpbWl0AAAAAAAEAAAAAAAAAAlpbWFnZV91cmkAAAAAAAAQAAAAAQAAA+kAAAAEAAAAAw==",
        "AAAAAAAAABRQdXJjaGFzZSBmcm9tIGEgZHJvcAAAAAhwdXJjaGFzZQAAAAMAAAAAAAAABWJ1eWVyAAAAAAAAEwAAAAAAAAAHZHJvcF9pZAAAAAAEAAAAAAAAAAhxdWFudGl0eQAAAAQAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAABBHZXQgZHJvcCBkZXRhaWxzAAAACGdldF9kcm9wAAAAAQAAAAAAAAAHZHJvcF9pZAAAAAAEAAAAAQAAA+kAAAfQAAAABERyb3AAAAAD",
        "AAAAAAAAAB9HZXQgcHVyY2hhc2UgaGlzdG9yeSBmb3IgYSB1c2VyAAAAABRnZXRfcHVyY2hhc2VfaGlzdG9yeQAAAAIAAAAAAAAABHVzZXIAAAATAAAAAAAAAAdkcm9wX2lkAAAAAAQAAAABAAAD6QAAA+oAAAfQAAAADlB1cmNoYXNlUmVjb3JkAAAAAAAD",
        "AAAAAAAAAB5HZXQgdG90YWwgcHVyY2hhc2VzIGZvciBhIGRyb3AAAAAAABJnZXRfZHJvcF9wdXJjaGFzZXMAAAAAAAEAAAAAAAAAB2Ryb3BfaWQAAAAABAAAAAEAAAPpAAAABAAAAAM=",
        "AAAAAAAAABlHZXQgYnV5ZXIgbGlzdCBmb3IgYSBkcm9wAAAAAAAADmdldF9idXllcl9saXN0AAAAAAABAAAAAAAAAAdkcm9wX2lkAAAAAAQAAAABAAAD6QAAA+oAAAATAAAAAw==",
        "AAAAAAAAAChBZGQgYSB1c2VyIHRvIHRoZSB3aGl0ZWxpc3QgKEFkbWluIG9ubHkpAAAAEGFkZF90b193aGl0ZWxpc3QAAAACAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAC1SZW1vdmUgYSB1c2VyIGZyb20gdGhlIHdoaXRlbGlzdCAoQWRtaW4gb25seSkAAAAAAAAVcmVtb3ZlX2Zyb21fd2hpdGVsaXN0AAAAAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAR1c2VyAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAACZTZXQgYSB1c2VyJ3MgYWNjZXNzIGxldmVsIChBZG1pbiBvbmx5KQAAAAAADnNldF91c2VyX2xldmVsAAAAAAADAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAABHVzZXIAAAATAAAAAAAAAAVsZXZlbAAAAAAAB9AAAAAJVXNlckxldmVsAAAAAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAChVcGRhdGUgdGhlIHN0YXR1cyBvZiBhIGRyb3AgKEFkbWluIG9ubHkpAAAADXVwZGF0ZV9zdGF0dXMAAAAAAAADAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAAB2Ryb3BfaWQAAAAABAAAAAAAAAAGc3RhdHVzAAAAAAfQAAAACkRyb3BTdGF0dXMAAAAAAAEAAAPpAAAD7QAAAAAAAAAD" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<Result<void>>,
        create_drop: this.txFromJSON<Result<u32>>,
        purchase: this.txFromJSON<Result<void>>,
        get_drop: this.txFromJSON<Result<Drop>>,
        get_purchase_history: this.txFromJSON<Result<Array<PurchaseRecord>>>,
        get_drop_purchases: this.txFromJSON<Result<u32>>,
        get_buyer_list: this.txFromJSON<Result<Array<string>>>,
        add_to_whitelist: this.txFromJSON<Result<void>>,
        remove_from_whitelist: this.txFromJSON<Result<void>>,
        set_user_level: this.txFromJSON<Result<void>>,
        update_status: this.txFromJSON<Result<void>>
  }
}
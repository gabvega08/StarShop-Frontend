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
    contractId: "CCS7XKR3UV76MGC2XQ4ABLMTMGOUBTG2AQ4EGAL4L5CD2OQKP4X7A66G",
  }
} as const

/**
 * Categories for follow preferences
 */
export type FollowCategory = {tag: "PriceChange", values: void} | {tag: "Restock", values: void} | {tag: "SpecialOffer", values: void};

/**
 * Notification priority levels
 */
export type NotificationPriority = {tag: "Low", values: void} | {tag: "Medium", values: void} | {tag: "High", values: void};

/**
 * Storage keys for organizing contract data
 */
export type DataKeys = {tag: "FollowList", values: readonly [string]} | {tag: "FollowCategory", values: readonly [string]} | {tag: "AlertSettings", values: readonly [string]} | {tag: "NotificationHistory", values: readonly [string]} | {tag: "FollowLimit", values: readonly [string]} | {tag: "ExpirationTracker", values: readonly [string]} | {tag: "LastNotification", values: readonly [string]} | {tag: "AllUsers", values: void} | {tag: "ProductFollowers", values: readonly [u32]};

/**
 * Error types for the follow system
 */
export const FollowError = {
  1: {message:"FollowLimitExceeded"},
  2: {message:"AlreadyFollowing"},
  3: {message:"NotFollowing"},
  4: {message:"InvalidCategory"},
  5: {message:"Unauthorized"},
  6: {message:"InvalidProductId"}
}


/**
 * Data structure representing a followed product
 */
export interface FollowData {
  categories: Array<FollowCategory>;
  expires_at: Option<u64>;
  product_id: u32;
  timestamp: u64;
  user: string;
}


/**
 * User's follow preferences and settings
 */
export interface NotificationPreferences {
  categories: Array<FollowCategory>;
  mute_notifications: boolean;
  priority: NotificationPriority;
  user: string;
}


/**
 * Tracks events before sending notifications
 */
export interface EventLog {
  event_type: FollowCategory;
  priority: NotificationPriority;
  product_id: u128;
  triggered_at: u64;
}

export const Errors = {
  1: {message:"AlreadyFollowing"},
  2: {message:"NotFollowing"},
  3: {message:"InvalidProduct"},
  4: {message:"NotificationFailed"}
}

export const ProductFollowError = {
  1: {message:"NotInitialized"},
  2: {message:"AlreadyInitialized"},
  3: {message:"UnauthorizedAccess"}
}

export interface Client {
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
   * Construct and simulate a register_user transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Registers a new user in the system
   */
  register_user: ({user}: {user: string}, options?: {
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

  /**
   * Construct and simulate a follow_product transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  follow_product: ({user, product_id, categories}: {user: string, product_id: u32, categories: Array<FollowCategory>}, options?: {
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
   * Construct and simulate a unfollow_product transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  unfollow_product: ({user, product_id}: {user: string, product_id: u32}, options?: {
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
   * Construct and simulate a is_following transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_following: ({user, product_id}: {user: string, product_id: u32}, options?: {
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
  }) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a notify_price_change transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  notify_price_change: ({product_id, new_price}: {product_id: u32, new_price: u64}, options?: {
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
   * Construct and simulate a notify_restock transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  notify_restock: ({product_id}: {product_id: u32}, options?: {
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
   * Construct and simulate a notify_special_offer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  notify_special_offer: ({product_id}: {product_id: u32}, options?: {
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
   * Construct and simulate a set_notification_preferences transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_notification_preferences: ({user, preferences}: {user: string, preferences: NotificationPreferences}, options?: {
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
   * Construct and simulate a get_notification_preferences transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_notification_preferences: ({user}: {user: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<NotificationPreferences>>>

  /**
   * Construct and simulate a get_notification_history transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_notification_history: ({user}: {user: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Array<EventLog>>>>

  /**
   * Construct and simulate a get_followers transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_followers: ({product_id}: {product_id: u32}, options?: {
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
      new ContractSpec([ "AAAAAgAAACFDYXRlZ29yaWVzIGZvciBmb2xsb3cgcHJlZmVyZW5jZXMAAAAAAAAAAAAADkZvbGxvd0NhdGVnb3J5AAAAAAADAAAAAAAAAAAAAAALUHJpY2VDaGFuZ2UAAAAAAAAAAAAAAAAHUmVzdG9jawAAAAAAAAAAAAAAAAxTcGVjaWFsT2ZmZXI=",
        "AAAAAgAAABxOb3RpZmljYXRpb24gcHJpb3JpdHkgbGV2ZWxzAAAAAAAAABROb3RpZmljYXRpb25Qcmlvcml0eQAAAAMAAAAAAAAAAAAAAANMb3cAAAAAAAAAAAAAAAAGTWVkaXVtAAAAAAAAAAAAAAAAAARIaWdo",
        "AAAAAgAAAClTdG9yYWdlIGtleXMgZm9yIG9yZ2FuaXppbmcgY29udHJhY3QgZGF0YQAAAAAAAAAAAAAIRGF0YUtleXMAAAAJAAAAAQAAAAAAAAAKRm9sbG93TGlzdAAAAAAAAQAAABMAAAABAAAAAAAAAA5Gb2xsb3dDYXRlZ29yeQAAAAAAAQAAABMAAAABAAAAAAAAAA1BbGVydFNldHRpbmdzAAAAAAAAAQAAABMAAAABAAAAAAAAABNOb3RpZmljYXRpb25IaXN0b3J5AAAAAAEAAAATAAAAAQAAAAAAAAALRm9sbG93TGltaXQAAAAAAQAAABMAAAABAAAAAAAAABFFeHBpcmF0aW9uVHJhY2tlcgAAAAAAAAEAAAATAAAAAQAAAAAAAAAQTGFzdE5vdGlmaWNhdGlvbgAAAAEAAAATAAAAAAAAAAAAAAAIQWxsVXNlcnMAAAABAAAAAAAAABBQcm9kdWN0Rm9sbG93ZXJzAAAAAQAAAAQ=",
        "AAAABAAAACFFcnJvciB0eXBlcyBmb3IgdGhlIGZvbGxvdyBzeXN0ZW0AAAAAAAAAAAAAC0ZvbGxvd0Vycm9yAAAAAAYAAAAAAAAAE0ZvbGxvd0xpbWl0RXhjZWVkZWQAAAAAAQAAAAAAAAAQQWxyZWFkeUZvbGxvd2luZwAAAAIAAAAAAAAADE5vdEZvbGxvd2luZwAAAAMAAAAAAAAAD0ludmFsaWRDYXRlZ29yeQAAAAAEAAAAAAAAAAxVbmF1dGhvcml6ZWQAAAAFAAAAAAAAABBJbnZhbGlkUHJvZHVjdElkAAAABg==",
        "AAAAAQAAAC5EYXRhIHN0cnVjdHVyZSByZXByZXNlbnRpbmcgYSBmb2xsb3dlZCBwcm9kdWN0AAAAAAAAAAAACkZvbGxvd0RhdGEAAAAAAAUAAAAAAAAACmNhdGVnb3JpZXMAAAAAA+oAAAfQAAAADkZvbGxvd0NhdGVnb3J5AAAAAAAAAAAACmV4cGlyZXNfYXQAAAAAA+gAAAAGAAAAAAAAAApwcm9kdWN0X2lkAAAAAAAEAAAAAAAAAAl0aW1lc3RhbXAAAAAAAAAGAAAAAAAAAAR1c2VyAAAAEw==",
        "AAAAAQAAACZVc2VyJ3MgZm9sbG93IHByZWZlcmVuY2VzIGFuZCBzZXR0aW5ncwAAAAAAAAAAABdOb3RpZmljYXRpb25QcmVmZXJlbmNlcwAAAAAEAAAAAAAAAApjYXRlZ29yaWVzAAAAAAPqAAAH0AAAAA5Gb2xsb3dDYXRlZ29yeQAAAAAAAAAAABJtdXRlX25vdGlmaWNhdGlvbnMAAAAAAAEAAAAAAAAACHByaW9yaXR5AAAH0AAAABROb3RpZmljYXRpb25Qcmlvcml0eQAAAAAAAAAEdXNlcgAAABM=",
        "AAAAAQAAACpUcmFja3MgZXZlbnRzIGJlZm9yZSBzZW5kaW5nIG5vdGlmaWNhdGlvbnMAAAAAAAAAAAAIRXZlbnRMb2cAAAAEAAAAAAAAAApldmVudF90eXBlAAAAAAfQAAAADkZvbGxvd0NhdGVnb3J5AAAAAAAAAAAACHByaW9yaXR5AAAH0AAAABROb3RpZmljYXRpb25Qcmlvcml0eQAAAAAAAAAKcHJvZHVjdF9pZAAAAAAACgAAAAAAAAAMdHJpZ2dlcmVkX2F0AAAABg==",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABAAAAAAAAAAQQWxyZWFkeUZvbGxvd2luZwAAAAEAAAAAAAAADE5vdEZvbGxvd2luZwAAAAIAAAAAAAAADkludmFsaWRQcm9kdWN0AAAAAAADAAAAAAAAABJOb3RpZmljYXRpb25GYWlsZWQAAAAAAAQ=",
        "AAAABAAAAAAAAAAAAAAAElByb2R1Y3RGb2xsb3dFcnJvcgAAAAAAAwAAAAAAAAAOTm90SW5pdGlhbGl6ZWQAAAAAAAEAAAAAAAAAEkFscmVhZHlJbml0aWFsaXplZAAAAAAAAgAAAAAAAAASVW5hdXRob3JpemVkQWNjZXNzAAAAAAAD",
        "AAAAAAAAAC5Jbml0aWFsaXplcyB0aGUgY29udHJhY3Qgd2l0aCBhbiBhZG1pbiBhZGRyZXNzAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAASUHJvZHVjdEZvbGxvd0Vycm9yAAA=",
        "AAAAAAAAACJSZWdpc3RlcnMgYSBuZXcgdXNlciBpbiB0aGUgc3lzdGVtAAAAAAANcmVnaXN0ZXJfdXNlcgAAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAHdXBncmFkZQAAAAABAAAAAAAAAA1uZXdfd2FzbV9oYXNoAAAAAAAD7gAAACAAAAABAAAD6QAAA+0AAAAAAAAH0AAAABJQcm9kdWN0Rm9sbG93RXJyb3IAAA==",
        "AAAAAAAAACFSZXR1cm5zIHRoZSBjdXJyZW50IGFkbWluIGFkZHJlc3MAAAAAAAAJZ2V0X2FkbWluAAAAAAAAAAAAAAEAAAPpAAAAEwAAB9AAAAASUHJvZHVjdEZvbGxvd0Vycm9yAAA=",
        "AAAAAAAAACdUcmFuc2ZlcnMgYWRtaW4gcmlnaHRzIHRvIGEgbmV3IGFkZHJlc3MAAAAADnRyYW5zZmVyX2FkbWluAAAAAAABAAAAAAAAAAluZXdfYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAASUHJvZHVjdEZvbGxvd0Vycm9yAAA=",
        "AAAAAAAAAAAAAAAOZm9sbG93X3Byb2R1Y3QAAAAAAAMAAAAAAAAABHVzZXIAAAATAAAAAAAAAApwcm9kdWN0X2lkAAAAAAAEAAAAAAAAAApjYXRlZ29yaWVzAAAAAAPqAAAH0AAAAA5Gb2xsb3dDYXRlZ29yeQAAAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAQdW5mb2xsb3dfcHJvZHVjdAAAAAIAAAAAAAAABHVzZXIAAAATAAAAAAAAAApwcm9kdWN0X2lkAAAAAAAEAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAMaXNfZm9sbG93aW5nAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAACnByb2R1Y3RfaWQAAAAAAAQAAAABAAAAAQ==",
        "AAAAAAAAAAAAAAATbm90aWZ5X3ByaWNlX2NoYW5nZQAAAAACAAAAAAAAAApwcm9kdWN0X2lkAAAAAAAEAAAAAAAAAAluZXdfcHJpY2UAAAAAAAAGAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAObm90aWZ5X3Jlc3RvY2sAAAAAAAEAAAAAAAAACnByb2R1Y3RfaWQAAAAAAAQAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAAAAAAAUbm90aWZ5X3NwZWNpYWxfb2ZmZXIAAAABAAAAAAAAAApwcm9kdWN0X2lkAAAAAAAEAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAcc2V0X25vdGlmaWNhdGlvbl9wcmVmZXJlbmNlcwAAAAIAAAAAAAAABHVzZXIAAAATAAAAAAAAAAtwcmVmZXJlbmNlcwAAAAfQAAAAF05vdGlmaWNhdGlvblByZWZlcmVuY2VzAAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAAcZ2V0X25vdGlmaWNhdGlvbl9wcmVmZXJlbmNlcwAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAfQAAAAF05vdGlmaWNhdGlvblByZWZlcmVuY2VzAAAAAAM=",
        "AAAAAAAAAAAAAAAYZ2V0X25vdGlmaWNhdGlvbl9oaXN0b3J5AAAAAQAAAAAAAAAEdXNlcgAAABMAAAABAAAD6QAAA+oAAAfQAAAACEV2ZW50TG9nAAAAAw==",
        "AAAAAAAAAAAAAAANZ2V0X2ZvbGxvd2VycwAAAAAAAAEAAAAAAAAACnByb2R1Y3RfaWQAAAAAAAQAAAABAAAD6gAAABM=" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<Result<void>>,
        register_user: this.txFromJSON<Result<void>>,
        upgrade: this.txFromJSON<Result<void>>,
        get_admin: this.txFromJSON<Result<string>>,
        transfer_admin: this.txFromJSON<Result<void>>,
        follow_product: this.txFromJSON<Result<void>>,
        unfollow_product: this.txFromJSON<Result<void>>,
        is_following: this.txFromJSON<boolean>,
        notify_price_change: this.txFromJSON<Result<void>>,
        notify_restock: this.txFromJSON<Result<void>>,
        notify_special_offer: this.txFromJSON<Result<void>>,
        set_notification_preferences: this.txFromJSON<Result<void>>,
        get_notification_preferences: this.txFromJSON<Result<NotificationPreferences>>,
        get_notification_history: this.txFromJSON<Result<Array<EventLog>>>,
        get_followers: this.txFromJSON<Array<string>>
  }
}
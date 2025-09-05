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
    contractId: "CDR4CCTHPAPWYDPHZDSSMNHKNG5IJU6MYVNR5TFJEFC7BNULDAO5YO7L",
  }
} as const


export interface Plan {
  active: boolean;
  benefits: Buffer;
  duration: u64;
  id: string;
  name: Buffer;
  price: u64;
  tier: string;
  version: u32;
}

export type DataKey = {tag: "Plan", values: readonly [string]} | {tag: "Admin", values: void} | {tag: "Owner", values: void};


/**
 * Represents a single NFT-based subscription owned by a user
 */
export interface SubscriptionNFT {
  expiry_time: u64;
  plan_id: string;
  start_time: u64;
  user: string;
  version: u32;
}

/**
 * Storage keys for minted subscriptions and user plan tracking
 */
export type MintKey = {tag: "Subscription", values: readonly [string, string]} | {tag: "UserPlans", values: readonly [string]};

/**
 * Optional: Check exact state of a subscription lifecycle
 */
export type SubscriptionState = {tag: "Active", values: void} | {tag: "Grace", values: void} | {tag: "Expired", values: void} | {tag: "NotFound", values: void};

/**
 * Storage key for tracking admin/manager roles
 */
export type RoleKey = {tag: "Admin", values: void} | {tag: "Manager", values: void} | {tag: "Usage", values: readonly [string, string]};

export interface Client {
  /**
   * Construct and simulate a create_plan transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_plan: ({admin, plan_id, name, duration, price, benefits, version, tier}: {admin: string, plan_id: string, name: Buffer, duration: u64, price: u64, benefits: Buffer, version: u32, tier: string}, options?: {
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
   * Construct and simulate a update_plan transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_plan: ({admin, plan_id, name, duration, price, benefits, version, tier}: {admin: string, plan_id: string, name: Buffer, duration: u64, price: u64, benefits: Buffer, version: u32, tier: string}, options?: {
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
   * Construct and simulate a disable_plan transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  disable_plan: ({admin, plan_id}: {admin: string, plan_id: string}, options?: {
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
   * Construct and simulate a get_plan transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_plan: ({plan_id}: {plan_id: string}, options?: {
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
  }) => Promise<AssembledTransaction<Option<Plan>>>

  /**
   * Construct and simulate a subscribe transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  subscribe: ({user, plan_id}: {user: string, plan_id: string}, options?: {
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
   * Construct and simulate a renew transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  renew: ({user, plan_id}: {user: string, plan_id: string}, options?: {
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
   * Construct and simulate a is_active_sub transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_active_sub: ({user, plan_id}: {user: string, plan_id: string}, options?: {
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
   * Construct and simulate a is_expired_sub transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_expired_sub: ({user, plan_id}: {user: string, plan_id: string}, options?: {
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
   * Construct and simulate a is_in_grace transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_in_grace: ({user, plan_id}: {user: string, plan_id: string}, options?: {
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
   * Construct and simulate a get_state transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_state: ({user, plan_id}: {user: string, plan_id: string}, options?: {
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
  }) => Promise<AssembledTransaction<SubscriptionState>>

  /**
   * Construct and simulate a premium_content transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  premium_content: ({user, plan_id}: {user: string, plan_id: string}, options?: {
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
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a gold_feature transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  gold_feature: ({user, plan_id}: {user: string, plan_id: string}, options?: {
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
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a add_user_role transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  add_user_role: ({role, user}: {role: string, user: string}, options?: {
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
   * Construct and simulate a reset_subscription transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  reset_subscription: ({admin, target_user, plan_id}: {admin: string, target_user: string, plan_id: string}, options?: {
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
   * Construct and simulate a get_feature_usage transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_feature_usage: ({user, feature}: {user: string, feature: string}, options?: {
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
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a cleanup transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  cleanup: ({user, plan_id}: {user: string, plan_id: string}, options?: {
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
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAABFBsYW4AAAAIAAAAAAAAAAZhY3RpdmUAAAAAAAEAAAAAAAAACGJlbmVmaXRzAAAADgAAAAAAAAAIZHVyYXRpb24AAAAGAAAAAAAAAAJpZAAAAAAAEQAAAAAAAAAEbmFtZQAAAA4AAAAAAAAABXByaWNlAAAAAAAABgAAAAAAAAAEdGllcgAAABEAAAAAAAAAB3ZlcnNpb24AAAAABA==",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAwAAAAEAAAAAAAAABFBsYW4AAAABAAAAEQAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAFT3duZXIAAAA=",
        "AAAAAQAAADpSZXByZXNlbnRzIGEgc2luZ2xlIE5GVC1iYXNlZCBzdWJzY3JpcHRpb24gb3duZWQgYnkgYSB1c2VyAAAAAAAAAAAAD1N1YnNjcmlwdGlvbk5GVAAAAAAFAAAAAAAAAAtleHBpcnlfdGltZQAAAAAGAAAAAAAAAAdwbGFuX2lkAAAAABEAAAAAAAAACnN0YXJ0X3RpbWUAAAAAAAYAAAAAAAAABHVzZXIAAAATAAAAAAAAAAd2ZXJzaW9uAAAAAAQ=",
        "AAAAAgAAADxTdG9yYWdlIGtleXMgZm9yIG1pbnRlZCBzdWJzY3JpcHRpb25zIGFuZCB1c2VyIHBsYW4gdHJhY2tpbmcAAAAAAAAAB01pbnRLZXkAAAAAAgAAAAEAAAAAAAAADFN1YnNjcmlwdGlvbgAAAAIAAAATAAAAEQAAAAEAAAAAAAAACVVzZXJQbGFucwAAAAAAAAEAAAAT",
        "AAAAAgAAADdPcHRpb25hbDogQ2hlY2sgZXhhY3Qgc3RhdGUgb2YgYSBzdWJzY3JpcHRpb24gbGlmZWN5Y2xlAAAAAAAAAAARU3Vic2NyaXB0aW9uU3RhdGUAAAAAAAAEAAAAAAAAAAAAAAAGQWN0aXZlAAAAAAAAAAAAAAAAAAVHcmFjZQAAAAAAAAAAAAAAAAAAB0V4cGlyZWQAAAAAAAAAAAAAAAAITm90Rm91bmQ=",
        "AAAAAgAAACxTdG9yYWdlIGtleSBmb3IgdHJhY2tpbmcgYWRtaW4vbWFuYWdlciByb2xlcwAAAAAAAAAHUm9sZUtleQAAAAADAAAAAAAAAAAAAAAFQWRtaW4AAAAAAAAAAAAAAAAAAAdNYW5hZ2VyAAAAAAEAAAAAAAAABVVzYWdlAAAAAAAAAgAAABMAAAAR",
        "AAAAAAAAAAAAAAALY3JlYXRlX3BsYW4AAAAACAAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAdwbGFuX2lkAAAAABEAAAAAAAAABG5hbWUAAAAOAAAAAAAAAAhkdXJhdGlvbgAAAAYAAAAAAAAABXByaWNlAAAAAAAABgAAAAAAAAAIYmVuZWZpdHMAAAAOAAAAAAAAAAd2ZXJzaW9uAAAAAAQAAAAAAAAABHRpZXIAAAARAAAAAA==",
        "AAAAAAAAAAAAAAALdXBkYXRlX3BsYW4AAAAACAAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAdwbGFuX2lkAAAAABEAAAAAAAAABG5hbWUAAAAOAAAAAAAAAAhkdXJhdGlvbgAAAAYAAAAAAAAABXByaWNlAAAAAAAABgAAAAAAAAAIYmVuZWZpdHMAAAAOAAAAAAAAAAd2ZXJzaW9uAAAAAAQAAAAAAAAABHRpZXIAAAARAAAAAA==",
        "AAAAAAAAAAAAAAAMZGlzYWJsZV9wbGFuAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAdwbGFuX2lkAAAAABEAAAAA",
        "AAAAAAAAAAAAAAAIZ2V0X3BsYW4AAAABAAAAAAAAAAdwbGFuX2lkAAAAABEAAAABAAAD6AAAB9AAAAAEUGxhbg==",
        "AAAAAAAAAAAAAAAJc3Vic2NyaWJlAAAAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAAB3BsYW5faWQAAAAAEQAAAAA=",
        "AAAAAAAAAAAAAAAFcmVuZXcAAAAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAHcGxhbl9pZAAAAAARAAAAAA==",
        "AAAAAAAAAAAAAAANaXNfYWN0aXZlX3N1YgAAAAAAAAIAAAAAAAAABHVzZXIAAAATAAAAAAAAAAdwbGFuX2lkAAAAABEAAAABAAAAAQ==",
        "AAAAAAAAAAAAAAAOaXNfZXhwaXJlZF9zdWIAAAAAAAIAAAAAAAAABHVzZXIAAAATAAAAAAAAAAdwbGFuX2lkAAAAABEAAAABAAAAAQ==",
        "AAAAAAAAAAAAAAALaXNfaW5fZ3JhY2UAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAAB3BsYW5faWQAAAAAEQAAAAEAAAAB",
        "AAAAAAAAAAAAAAAJZ2V0X3N0YXRlAAAAAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAAB3BsYW5faWQAAAAAEQAAAAEAAAfQAAAAEVN1YnNjcmlwdGlvblN0YXRlAAAA",
        "AAAAAAAAAAAAAAAPcHJlbWl1bV9jb250ZW50AAAAAAIAAAAAAAAABHVzZXIAAAATAAAAAAAAAAdwbGFuX2lkAAAAABEAAAABAAAAEA==",
        "AAAAAAAAAAAAAAAMZ29sZF9mZWF0dXJlAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAAB3BsYW5faWQAAAAAEQAAAAEAAAAR",
        "AAAAAAAAAAAAAAANYWRkX3VzZXJfcm9sZQAAAAAAAAIAAAAAAAAABHJvbGUAAAARAAAAAAAAAAR1c2VyAAAAEwAAAAA=",
        "AAAAAAAAAAAAAAAScmVzZXRfc3Vic2NyaXB0aW9uAAAAAAADAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAAC3RhcmdldF91c2VyAAAAABMAAAAAAAAAB3BsYW5faWQAAAAAEQAAAAA=",
        "AAAAAAAAAAAAAAARZ2V0X2ZlYXR1cmVfdXNhZ2UAAAAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAHZmVhdHVyZQAAAAARAAAAAQAAAAQ=",
        "AAAAAAAAAAAAAAAHY2xlYW51cAAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAHcGxhbl9pZAAAAAARAAAAAQAAAAE=" ]),
      options
    )
  }
  public readonly fromJSON = {
    create_plan: this.txFromJSON<null>,
        update_plan: this.txFromJSON<null>,
        disable_plan: this.txFromJSON<null>,
        get_plan: this.txFromJSON<Option<Plan>>,
        subscribe: this.txFromJSON<null>,
        renew: this.txFromJSON<null>,
        is_active_sub: this.txFromJSON<boolean>,
        is_expired_sub: this.txFromJSON<boolean>,
        is_in_grace: this.txFromJSON<boolean>,
        get_state: this.txFromJSON<SubscriptionState>,
        premium_content: this.txFromJSON<string>,
        gold_feature: this.txFromJSON<string>,
        add_user_role: this.txFromJSON<null>,
        reset_subscription: this.txFromJSON<null>,
        get_feature_usage: this.txFromJSON<u32>,
        cleanup: this.txFromJSON<boolean>
  }
}
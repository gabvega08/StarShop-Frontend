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
    contractId: "CBAXZOOYZLLEXC4OXNADHEQTYXQAA47HNVXEWF773Z7VBBJNMKAPXCMU",
  }
} as const

/**
 * Error codes for provider contracts.
 */
export const ProviderError = {
  1: {message:"InvalidUser"},
  2: {message:"MetricNotSupported"},
  3: {message:"InternalError"}
}


/**
 * Represents an airdrop event with dynamic eligibility conditions and constraints.
 */
export interface AirdropEvent {
  /**
 * Amount of tokens to distribute to each eligible user.
 */
amount: i128;
  /**
 * Map of condition names to minimum required values (e.g., "purchases" -> 5).
 */
conditions: Map<string, u64>;
  /**
 * Detailed description of the airdrop event.
 */
description: Buffer;
  /**
 * End timestamp (Unix seconds) for the event.
 */
end_time: u64;
  /**
 * Whether the event is active (e.g., not paused or canceled).
 */
is_active: boolean;
  /**
 * Optional max total tokens to distribute.
 */
max_total_amount: Option<i128>;
  /**
 * Optional max number of users who can claim.
 */
max_users: Option<u64>;
  /**
 * Human-readable name for the airdrop event (e.g., "Loyalty Rewards - July 2025").
 */
name: string;
  /**
 * Start timestamp (Unix seconds) for the event.
 */
start_time: u64;
  /**
 * Address of the token contract (XLM or custom token).
 */
token_address: string;
}


/**
 * Statistics for an airdrop event.
 */
export interface EventStats {
  /**
 * Number of users who have claimed.
 */
recipient_count: u64;
  /**
 * Total tokens distributed.
 */
total_amount_distributed: i128;
}

/**
 * Storage keys for persistent data in the contract.
 */
export type DataKey = {tag: "Admin", values: void} | {tag: "EventId", values: void} | {tag: "AirdropEvent", values: readonly [u64]} | {tag: "Claimed", values: readonly [u64, string]} | {tag: "EventStats", values: readonly [u64]} | {tag: "ProviderRegistry", values: readonly [string]} | {tag: "ClaimedUsers", values: readonly [u64]};

/**
 * Error codes for the airdrop contract.
 */
export const AirdropError = {
  1: {message:"AlreadyInitialized"},
  2: {message:"Unauthorized"},
  3: {message:"InvalidTokenConfig"},
  4: {message:"AirdropNotFound"},
  5: {message:"UserNotEligible"},
  6: {message:"AlreadyClaimed"},
  7: {message:"InsufficientContractBalance"},
  8: {message:"TokenTransferFailed"},
  9: {message:"ConditionNotFound"},
  10: {message:"InvalidAmount"},
  11: {message:"ProviderNotConfigured"},
  12: {message:"ProviderCallFailed"},
  13: {message:"EventInactive"},
  14: {message:"CapExceeded"},
  15: {message:"InvalidEventConfig"}
}

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Initialize the contract with an admin and optional provider registry.
   */
  initialize: ({admin, initial_providers}: {admin: string, initial_providers: Option<Map<string, string>>}, options?: {
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
   * Construct and simulate a create_airdrop transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Create a new airdrop event.
   */
  create_airdrop: ({admin, name, description, conditions, amount, token_address, start_time, end_time, max_users, max_total_amount}: {admin: string, name: string, description: Buffer, conditions: Map<string, u64>, amount: i128, token_address: string, start_time: u64, end_time: u64, max_users: Option<u64>, max_total_amount: Option<i128>}, options?: {
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
  }) => Promise<AssembledTransaction<Result<u64>>>

  /**
   * Construct and simulate a claim_airdrop transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * User claims tokens for an airdrop event.
   */
  claim_airdrop: ({user, event_id}: {user: string, event_id: u64}, options?: {
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
   * Construct and simulate a distribute_batch transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Admin triggers batch distribution.
   */
  distribute_batch: ({admin, event_id, users}: {admin: string, event_id: u64, users: Array<string>}, options?: {
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
   * Construct and simulate a register_provider transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Register a metric provider.
   */
  register_provider: ({admin, metric, provider}: {admin: string, metric: string, provider: string}, options?: {
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
   * Construct and simulate a update_provider transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Update a metric provider.
   */
  update_provider: ({admin, metric, new_provider}: {admin: string, metric: string, new_provider: string}, options?: {
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
   * Construct and simulate a remove_provider transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Remove a metric provider.
   */
  remove_provider: ({admin, metric}: {admin: string, metric: string}, options?: {
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
   * Construct and simulate a pause_event transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Pause an airdrop event.
   */
  pause_event: ({admin, event_id}: {admin: string, event_id: u64}, options?: {
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
   * Construct and simulate a resume_event transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Resume a paused airdrop event.
   */
  resume_event: ({admin, event_id}: {admin: string, event_id: u64}, options?: {
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
   * Construct and simulate a finalize_event transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Finalize an airdrop event.
   */
  finalize_event: ({admin, event_id}: {admin: string, event_id: u64}, options?: {
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
   * Construct and simulate a set_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Update the admin address.
   */
  set_admin: ({current_admin, new_admin}: {current_admin: string, new_admin: string}, options?: {
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
   * Construct and simulate a get_event transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Query an airdrop event.
   */
  get_event: ({event_id}: {event_id: u64}, options?: {
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
  }) => Promise<AssembledTransaction<Result<AirdropEvent>>>

  /**
   * Construct and simulate a get_event_stats transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Query event statistics.
   */
  get_event_stats: ({event_id}: {event_id: u64}, options?: {
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
  }) => Promise<AssembledTransaction<Result<EventStats>>>

  /**
   * Construct and simulate a list_claimed_users transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Query claimed users for an event.
   */
  list_claimed_users: ({event_id, max_results}: {event_id: u64, max_results: u32}, options?: {
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
   * Construct and simulate a get_provider transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Query a provider address for a metric.
   */
  get_provider: ({metric}: {metric: string}, options?: {
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
   * Construct and simulate a is_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Check if an address is the admin.
   */
  is_admin: ({address}: {address: string}, options?: {
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
      new ContractSpec([ "AAAABAAAACNFcnJvciBjb2RlcyBmb3IgcHJvdmlkZXIgY29udHJhY3RzLgAAAAAAAAAADVByb3ZpZGVyRXJyb3IAAAAAAAADAAAAAAAAAAtJbnZhbGlkVXNlcgAAAAABAAAAAAAAABJNZXRyaWNOb3RTdXBwb3J0ZWQAAAAAAAIAAAAAAAAADUludGVybmFsRXJyb3IAAAAAAAAD",
        "AAAAAQAAAFBSZXByZXNlbnRzIGFuIGFpcmRyb3AgZXZlbnQgd2l0aCBkeW5hbWljIGVsaWdpYmlsaXR5IGNvbmRpdGlvbnMgYW5kIGNvbnN0cmFpbnRzLgAAAAAAAAAMQWlyZHJvcEV2ZW50AAAACgAAADVBbW91bnQgb2YgdG9rZW5zIHRvIGRpc3RyaWJ1dGUgdG8gZWFjaCBlbGlnaWJsZSB1c2VyLgAAAAAAAAZhbW91bnQAAAAAAAsAAABLTWFwIG9mIGNvbmRpdGlvbiBuYW1lcyB0byBtaW5pbXVtIHJlcXVpcmVkIHZhbHVlcyAoZS5nLiwgInB1cmNoYXNlcyIgLT4gNSkuAAAAAApjb25kaXRpb25zAAAAAAPsAAAAEQAAAAYAAAAqRGV0YWlsZWQgZGVzY3JpcHRpb24gb2YgdGhlIGFpcmRyb3AgZXZlbnQuAAAAAAALZGVzY3JpcHRpb24AAAAADgAAACtFbmQgdGltZXN0YW1wIChVbml4IHNlY29uZHMpIGZvciB0aGUgZXZlbnQuAAAAAAhlbmRfdGltZQAAAAYAAAA7V2hldGhlciB0aGUgZXZlbnQgaXMgYWN0aXZlIChlLmcuLCBub3QgcGF1c2VkIG9yIGNhbmNlbGVkKS4AAAAACWlzX2FjdGl2ZQAAAAAAAAEAAAAoT3B0aW9uYWwgbWF4IHRvdGFsIHRva2VucyB0byBkaXN0cmlidXRlLgAAABBtYXhfdG90YWxfYW1vdW50AAAD6AAAAAsAAAArT3B0aW9uYWwgbWF4IG51bWJlciBvZiB1c2VycyB3aG8gY2FuIGNsYWltLgAAAAAJbWF4X3VzZXJzAAAAAAAD6AAAAAYAAABQSHVtYW4tcmVhZGFibGUgbmFtZSBmb3IgdGhlIGFpcmRyb3AgZXZlbnQgKGUuZy4sICJMb3lhbHR5IFJld2FyZHMgLSBKdWx5IDIwMjUiKS4AAAAEbmFtZQAAABEAAAAtU3RhcnQgdGltZXN0YW1wIChVbml4IHNlY29uZHMpIGZvciB0aGUgZXZlbnQuAAAAAAAACnN0YXJ0X3RpbWUAAAAAAAYAAAA0QWRkcmVzcyBvZiB0aGUgdG9rZW4gY29udHJhY3QgKFhMTSBvciBjdXN0b20gdG9rZW4pLgAAAA10b2tlbl9hZGRyZXNzAAAAAAAAEw==",
        "AAAAAQAAACBTdGF0aXN0aWNzIGZvciBhbiBhaXJkcm9wIGV2ZW50LgAAAAAAAAAKRXZlbnRTdGF0cwAAAAAAAgAAACFOdW1iZXIgb2YgdXNlcnMgd2hvIGhhdmUgY2xhaW1lZC4AAAAAAAAPcmVjaXBpZW50X2NvdW50AAAAAAYAAAAZVG90YWwgdG9rZW5zIGRpc3RyaWJ1dGVkLgAAAAAAABh0b3RhbF9hbW91bnRfZGlzdHJpYnV0ZWQAAAAL",
        "AAAAAgAAADFTdG9yYWdlIGtleXMgZm9yIHBlcnNpc3RlbnQgZGF0YSBpbiB0aGUgY29udHJhY3QuAAAAAAAAAAAAAAdEYXRhS2V5AAAAAAcAAAAAAAAAHEtleSBmb3IgdGhlIGFkbWluJ3MgYWRkcmVzcy4AAAAFQWRtaW4AAAAAAAAAAAAAJUtleSBmb3IgdGhlIGN1cnJlbnQgZXZlbnQgSUQgY291bnRlci4AAAAAAAAHRXZlbnRJZAAAAAABAAAANUtleSBmb3IgYW4gYWlyZHJvcCBldmVudCwgaWRlbnRpZmllZCBieSBpdHMgZXZlbnQgSUQuAAAAAAAADEFpcmRyb3BFdmVudAAAAAEAAAAGAAAAAQAAAFdLZXkgdG8gdHJhY2sgaWYgYSB1c2VyIGhhcyBjbGFpbWVkIGFuIGFpcmRyb3AsIGlkZW50aWZpZWQgYnkgZXZlbnQgSUQgYW5kIHVzZXIgYWRkcmVzcy4AAAAAB0NsYWltZWQAAAAAAgAAAAYAAAATAAAAAQAAADFLZXkgZm9yIGV2ZW50IHN0YXRpc3RpY3MsIGlkZW50aWZpZWQgYnkgZXZlbnQgSUQuAAAAAAAACkV2ZW50U3RhdHMAAAAAAAEAAAAGAAAAAQAAAExLZXkgZm9yIHRoZSBwcm92aWRlciByZWdpc3RyeSwgbWFwcGluZyBjb25kaXRpb24gU3ltYm9sIHRvIHByb3ZpZGVyIEFkZHJlc3MuAAAAEFByb3ZpZGVyUmVnaXN0cnkAAAABAAAAEQAAAAEAAABJS2V5IGZvciB0aGUgbGlzdCBvZiB1c2VycyB3aG8gY2xhaW1lZCBhbiBhaXJkcm9wLCBpZGVudGlmaWVkIGJ5IGV2ZW50IElELgAAAAAAAAxDbGFpbWVkVXNlcnMAAAABAAAABg==",
        "AAAABAAAACVFcnJvciBjb2RlcyBmb3IgdGhlIGFpcmRyb3AgY29udHJhY3QuAAAAAAAAAAAAAAxBaXJkcm9wRXJyb3IAAAAPAAAAAAAAABJBbHJlYWR5SW5pdGlhbGl6ZWQAAAAAAAEAAAAAAAAADFVuYXV0aG9yaXplZAAAAAIAAAAAAAAAEkludmFsaWRUb2tlbkNvbmZpZwAAAAAAAwAAAAAAAAAPQWlyZHJvcE5vdEZvdW5kAAAAAAQAAAAAAAAAD1VzZXJOb3RFbGlnaWJsZQAAAAAFAAAAAAAAAA5BbHJlYWR5Q2xhaW1lZAAAAAAABgAAAAAAAAAbSW5zdWZmaWNpZW50Q29udHJhY3RCYWxhbmNlAAAAAAcAAAAAAAAAE1Rva2VuVHJhbnNmZXJGYWlsZWQAAAAACAAAAAAAAAARQ29uZGl0aW9uTm90Rm91bmQAAAAAAAAJAAAAAAAAAA1JbnZhbGlkQW1vdW50AAAAAAAACgAAAAAAAAAVUHJvdmlkZXJOb3RDb25maWd1cmVkAAAAAAAACwAAAAAAAAASUHJvdmlkZXJDYWxsRmFpbGVkAAAAAAAMAAAAAAAAAA1FdmVudEluYWN0aXZlAAAAAAAADQAAAAAAAAALQ2FwRXhjZWVkZWQAAAAADgAAAAAAAAASSW52YWxpZEV2ZW50Q29uZmlnAAAAAAAP",
        "AAAAAAAAAEVJbml0aWFsaXplIHRoZSBjb250cmFjdCB3aXRoIGFuIGFkbWluIGFuZCBvcHRpb25hbCBwcm92aWRlciByZWdpc3RyeS4AAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAABFpbml0aWFsX3Byb3ZpZGVycwAAAAAAA+gAAAPsAAAAEQAAABMAAAABAAAD6QAAA+0AAAAAAAAH0AAAAAxBaXJkcm9wRXJyb3I=",
        "AAAAAAAAABtDcmVhdGUgYSBuZXcgYWlyZHJvcCBldmVudC4AAAAADmNyZWF0ZV9haXJkcm9wAAAAAAAKAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAABG5hbWUAAAARAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAOAAAAAAAAAApjb25kaXRpb25zAAAAAAPsAAAAEQAAAAYAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAANdG9rZW5fYWRkcmVzcwAAAAAAABMAAAAAAAAACnN0YXJ0X3RpbWUAAAAAAAYAAAAAAAAACGVuZF90aW1lAAAABgAAAAAAAAAJbWF4X3VzZXJzAAAAAAAD6AAAAAYAAAAAAAAAEG1heF90b3RhbF9hbW91bnQAAAPoAAAACwAAAAEAAAPpAAAABgAAB9AAAAAMQWlyZHJvcEVycm9y",
        "AAAAAAAAAChVc2VyIGNsYWltcyB0b2tlbnMgZm9yIGFuIGFpcmRyb3AgZXZlbnQuAAAADWNsYWltX2FpcmRyb3AAAAAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAIZXZlbnRfaWQAAAAGAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAAMQWlyZHJvcEVycm9y",
        "AAAAAAAAACJBZG1pbiB0cmlnZ2VycyBiYXRjaCBkaXN0cmlidXRpb24uAAAAAAAQZGlzdHJpYnV0ZV9iYXRjaAAAAAMAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAAIZXZlbnRfaWQAAAAGAAAAAAAAAAV1c2VycwAAAAAAA+oAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAAMQWlyZHJvcEVycm9y",
        "AAAAAAAAABtSZWdpc3RlciBhIG1ldHJpYyBwcm92aWRlci4AAAAAEXJlZ2lzdGVyX3Byb3ZpZGVyAAAAAAAAAwAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAZtZXRyaWMAAAAAABEAAAAAAAAACHByb3ZpZGVyAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAfQAAAADEFpcmRyb3BFcnJvcg==",
        "AAAAAAAAABlVcGRhdGUgYSBtZXRyaWMgcHJvdmlkZXIuAAAAAAAAD3VwZGF0ZV9wcm92aWRlcgAAAAADAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAABm1ldHJpYwAAAAAAEQAAAAAAAAAMbmV3X3Byb3ZpZGVyAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAfQAAAADEFpcmRyb3BFcnJvcg==",
        "AAAAAAAAABlSZW1vdmUgYSBtZXRyaWMgcHJvdmlkZXIuAAAAAAAAD3JlbW92ZV9wcm92aWRlcgAAAAACAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAABm1ldHJpYwAAAAAAEQAAAAEAAAPpAAAD7QAAAAAAAAfQAAAADEFpcmRyb3BFcnJvcg==",
        "AAAAAAAAABdQYXVzZSBhbiBhaXJkcm9wIGV2ZW50LgAAAAALcGF1c2VfZXZlbnQAAAAAAgAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAhldmVudF9pZAAAAAYAAAABAAAD6QAAA+0AAAAAAAAH0AAAAAxBaXJkcm9wRXJyb3I=",
        "AAAAAAAAAB5SZXN1bWUgYSBwYXVzZWQgYWlyZHJvcCBldmVudC4AAAAAAAxyZXN1bWVfZXZlbnQAAAACAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAACGV2ZW50X2lkAAAABgAAAAEAAAPpAAAD7QAAAAAAAAfQAAAADEFpcmRyb3BFcnJvcg==",
        "AAAAAAAAABpGaW5hbGl6ZSBhbiBhaXJkcm9wIGV2ZW50LgAAAAAADmZpbmFsaXplX2V2ZW50AAAAAAACAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAACGV2ZW50X2lkAAAABgAAAAEAAAPpAAAD7QAAAAAAAAfQAAAADEFpcmRyb3BFcnJvcg==",
        "AAAAAAAAABlVcGRhdGUgdGhlIGFkbWluIGFkZHJlc3MuAAAAAAAACXNldF9hZG1pbgAAAAAAAAIAAAAAAAAADWN1cnJlbnRfYWRtaW4AAAAAAAATAAAAAAAAAAluZXdfYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAAMQWlyZHJvcEVycm9y",
        "AAAAAAAAABdRdWVyeSBhbiBhaXJkcm9wIGV2ZW50LgAAAAAJZ2V0X2V2ZW50AAAAAAAAAQAAAAAAAAAIZXZlbnRfaWQAAAAGAAAAAQAAA+kAAAfQAAAADEFpcmRyb3BFdmVudAAAB9AAAAAMQWlyZHJvcEVycm9y",
        "AAAAAAAAABdRdWVyeSBldmVudCBzdGF0aXN0aWNzLgAAAAAPZ2V0X2V2ZW50X3N0YXRzAAAAAAEAAAAAAAAACGV2ZW50X2lkAAAABgAAAAEAAAPpAAAH0AAAAApFdmVudFN0YXRzAAAAAAfQAAAADEFpcmRyb3BFcnJvcg==",
        "AAAAAAAAACFRdWVyeSBjbGFpbWVkIHVzZXJzIGZvciBhbiBldmVudC4AAAAAAAASbGlzdF9jbGFpbWVkX3VzZXJzAAAAAAACAAAAAAAAAAhldmVudF9pZAAAAAYAAAAAAAAAC21heF9yZXN1bHRzAAAAAAQAAAABAAAD6QAAA+oAAAATAAAH0AAAAAxBaXJkcm9wRXJyb3I=",
        "AAAAAAAAACZRdWVyeSBhIHByb3ZpZGVyIGFkZHJlc3MgZm9yIGEgbWV0cmljLgAAAAAADGdldF9wcm92aWRlcgAAAAEAAAAAAAAABm1ldHJpYwAAAAAAEQAAAAEAAAPpAAAAEwAAB9AAAAAMQWlyZHJvcEVycm9y",
        "AAAAAAAAACFDaGVjayBpZiBhbiBhZGRyZXNzIGlzIHRoZSBhZG1pbi4AAAAAAAAIaXNfYWRtaW4AAAABAAAAAAAAAAdhZGRyZXNzAAAAABMAAAABAAAAAQ==" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<Result<void>>,
        create_airdrop: this.txFromJSON<Result<u64>>,
        claim_airdrop: this.txFromJSON<Result<void>>,
        distribute_batch: this.txFromJSON<Result<void>>,
        register_provider: this.txFromJSON<Result<void>>,
        update_provider: this.txFromJSON<Result<void>>,
        remove_provider: this.txFromJSON<Result<void>>,
        pause_event: this.txFromJSON<Result<void>>,
        resume_event: this.txFromJSON<Result<void>>,
        finalize_event: this.txFromJSON<Result<void>>,
        set_admin: this.txFromJSON<Result<void>>,
        get_event: this.txFromJSON<Result<AirdropEvent>>,
        get_event_stats: this.txFromJSON<Result<EventStats>>,
        list_claimed_users: this.txFromJSON<Result<Array<string>>>,
        get_provider: this.txFromJSON<Result<string>>,
        is_admin: this.txFromJSON<boolean>
  }
}
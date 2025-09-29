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
    contractId: "CC7GNHRY25VXH4TSGPICK6TDD7RY7O5P6T4SML5D626ZRW4NN4ZYDHXJ",
  }
} as const

/**
 * Loyalty levels with increasing benefits
 */
export enum LoyaltyLevel {
  Bronze = 0,
  Silver = 1,
  Gold = 2,
}

/**
 * Points transaction types
 */
export type TransactionType = {tag: "Earned", values: void} | {tag: "Spent", values: void} | {tag: "Expired", values: void} | {tag: "Bonus", values: void};


/**
 * Transaction record for points
 */
export interface PointsTransaction {
  amount: i128;
  category: Option<string>;
  description: string;
  expiration: u64;
  product_id: Option<string>;
  timestamp: u64;
  transaction_type: TransactionType;
}


/**
 * User data containing all loyalty-related information
 */
export interface UserData {
  address: string;
  completed_milestones: Array<u32>;
  join_date: u64;
  last_anniversary_awarded: u64;
  level: LoyaltyLevel;
  level_updated_at: u64;
  lifetime_points: i128;
  transactions: Array<PointsTransaction>;
}


/**
 * Milestone achievement criteria and rewards
 */
export interface Milestone {
  description: string;
  id: u32;
  name: string;
  points_reward: i128;
  requirement: MilestoneRequirement;
}

/**
 * Different types of milestone requirements
 */
export type MilestoneRequirement = {tag: "TotalPurchases", values: readonly [u32]} | {tag: "SpendAmount", values: readonly [i128]} | {tag: "PointsEarned", values: readonly [i128]} | {tag: "SpecificProduct", values: readonly [string]} | {tag: "SpecificCategory", values: readonly [string]} | {tag: "DaysActive", values: readonly [u64]};


/**
 * Requirements for each loyalty level
 */
export interface LevelRequirements {
  gold: LevelCriteria;
  silver: LevelCriteria;
}


/**
 * Criteria for level upgrades
 */
export interface LevelCriteria {
  min_days_active: u64;
  min_points: i128;
  min_purchases: u32;
}


/**
 * Reward item that can be redeemed with points
 */
export interface Reward {
  description: string;
  id: u32;
  max_per_user: u32;
  min_level: LoyaltyLevel;
  name: string;
  points_cost: i128;
  reward_type: RewardType;
}

/**
 * Types of rewards available
 */
export type RewardType = {tag: "Discount", values: readonly [u32]} | {tag: "Product", values: readonly [string]} | {tag: "XLM", values: readonly [i128]} | {tag: "Token", values: readonly [string, i128]};

/**
 * Storage keys for contract data
 */
export type DataKey = {tag: "Admin", values: void} | {tag: "User", values: readonly [string]} | {tag: "Milestone", values: readonly [u32]} | {tag: "Reward", values: readonly [u32]} | {tag: "LevelRequirements", values: void} | {tag: "PointsExpiryDays", values: void} | {tag: "MaxRedemptionPercentage", values: void} | {tag: "PointsPerPurchaseRatio", values: void} | {tag: "ProductCategoryBonus", values: readonly [string]} | {tag: "ProductBonus", values: readonly [string]} | {tag: "TotalMilestones", values: void} | {tag: "TotalRewards", values: void} | {tag: "UserRedemption", values: readonly [UserRedemption]};

/**
 * Key for tracking user redemptions of a specific reward
 */
export type UserRedemption = readonly [string,  u32];

/**
 * Contract error types
 */
export const Errors = {
  1: {message:"NotInitialized"},
  2: {message:"AlreadyInitialized"},
  3: {message:"Unauthorized"},
  4: {message:"UserNotFound"},
  5: {message:"InsufficientPoints"},
  6: {message:"InvalidAmount"},
  7: {message:"MilestoneNotFound"},
  8: {message:"MilestoneAlreadyCompleted"},
  9: {message:"RewardNotFound"},
  10: {message:"InsufficientLoyaltyLevel"},
  11: {message:"MaxRedemptionExceeded"},
  12: {message:"InvalidPointsExpiry"},
  13: {message:"InvalidLevelRequirements"},
  14: {message:"PointsExpired"},
  15: {message:"ProductNotFound"},
  16: {message:"CategoryNotFound"},
  17: {message:"MilestoneNotEligible"},
  18: {message:"RewardLimitReached"}
}

export interface Client {
  /**
   * Construct and simulate a init transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  init: ({admin}: {admin: string}, options?: {
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
   * Construct and simulate a update_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_admin: ({new_admin}: {new_admin: string}, options?: {
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
   * Construct and simulate a set_points_expiry transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_points_expiry: ({days}: {days: u64}, options?: {
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
   * Construct and simulate a set_max_redemption_percentage transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_max_redemption_percentage: ({percentage_bps}: {percentage_bps: u32}, options?: {
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
   * Construct and simulate a set_points_ratio transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_points_ratio: ({ratio}: {ratio: u32}, options?: {
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
   * Construct and simulate a set_category_bonus transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_category_bonus: ({category, bonus_bps}: {category: string, bonus_bps: u32}, options?: {
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
   * Construct and simulate a set_product_bonus transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  set_product_bonus: ({product_id, bonus_bps}: {product_id: string, bonus_bps: u32}, options?: {
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
   * Construct and simulate a add_points transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  add_points: ({user, amount, description}: {user: string, amount: i128, description: string}, options?: {
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
   * Construct and simulate a get_points_balance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_points_balance: ({user}: {user: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<i128>>>

  /**
   * Construct and simulate a get_lifetime_points transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_lifetime_points: ({user}: {user: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<i128>>>

  /**
   * Construct and simulate a record_purchase_points transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  record_purchase_points: ({user, purchase_amount, product_id, category}: {user: string, purchase_amount: i128, product_id: Option<string>, category: Option<string>}, options?: {
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
  }) => Promise<AssembledTransaction<Result<i128>>>

  /**
   * Construct and simulate a init_level_requirements transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  init_level_requirements: ({requirements}: {requirements: LevelRequirements}, options?: {
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
   * Construct and simulate a check_and_update_level transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  check_and_update_level: ({user}: {user: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<boolean>>>

  /**
   * Construct and simulate a get_user_level transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_user_level: ({user}: {user: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<LoyaltyLevel>>>

  /**
   * Construct and simulate a award_anniversary_bonus transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  award_anniversary_bonus: ({user}: {user: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<i128>>>

  /**
   * Construct and simulate a create_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_milestone: ({milestone}: {milestone: Milestone}, options?: {
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
   * Construct and simulate a complete_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  complete_milestone: ({user, milestone_id}: {user: string, milestone_id: u32}, options?: {
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
  }) => Promise<AssembledTransaction<Result<i128>>>

  /**
   * Construct and simulate a check_and_complete_milestones transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  check_and_complete_milestones: ({user}: {user: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Array<u32>>>>

  /**
   * Construct and simulate a create_reward transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_reward: ({reward}: {reward: Reward}, options?: {
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
   * Construct and simulate a redeem_reward transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  redeem_reward: ({user, reward_id, purchase_amount}: {user: string, reward_id: u32, purchase_amount: Option<i128>}, options?: {
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
  }) => Promise<AssembledTransaction<Result<i128>>>

  /**
   * Construct and simulate a get_available_rewards transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_available_rewards: (options?: {
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
  }) => Promise<AssembledTransaction<Result<Array<Reward>>>>

  /**
   * Construct and simulate a calculate_discount transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  calculate_discount: ({reward_id, purchase_amount}: {reward_id: u32, purchase_amount: i128}, options?: {
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
  }) => Promise<AssembledTransaction<Result<i128>>>

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
      new ContractSpec([ "AAAAAwAAACdMb3lhbHR5IGxldmVscyB3aXRoIGluY3JlYXNpbmcgYmVuZWZpdHMAAAAAAAAAAAxMb3lhbHR5TGV2ZWwAAAADAAAAAAAAAAZCcm9uemUAAAAAAAAAAAAAAAAABlNpbHZlcgAAAAAAAQAAAAAAAAAER29sZAAAAAI=",
        "AAAAAgAAABhQb2ludHMgdHJhbnNhY3Rpb24gdHlwZXMAAAAAAAAAD1RyYW5zYWN0aW9uVHlwZQAAAAAEAAAAAAAAAAAAAAAGRWFybmVkAAAAAAAAAAAAAAAAAAVTcGVudAAAAAAAAAAAAAAAAAAAB0V4cGlyZWQAAAAAAAAAAAAAAAAFQm9udXMAAAA=",
        "AAAAAQAAAB1UcmFuc2FjdGlvbiByZWNvcmQgZm9yIHBvaW50cwAAAAAAAAAAAAARUG9pbnRzVHJhbnNhY3Rpb24AAAAAAAAHAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAACGNhdGVnb3J5AAAD6AAAABEAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABEAAAAAAAAACmV4cGlyYXRpb24AAAAAAAYAAAAAAAAACnByb2R1Y3RfaWQAAAAAA+gAAAARAAAAAAAAAAl0aW1lc3RhbXAAAAAAAAAGAAAAAAAAABB0cmFuc2FjdGlvbl90eXBlAAAH0AAAAA9UcmFuc2FjdGlvblR5cGUA",
        "AAAAAQAAADRVc2VyIGRhdGEgY29udGFpbmluZyBhbGwgbG95YWx0eS1yZWxhdGVkIGluZm9ybWF0aW9uAAAAAAAAAAhVc2VyRGF0YQAAAAgAAAAAAAAAB2FkZHJlc3MAAAAAEwAAAAAAAAAUY29tcGxldGVkX21pbGVzdG9uZXMAAAPqAAAABAAAAAAAAAAJam9pbl9kYXRlAAAAAAAABgAAAAAAAAAYbGFzdF9hbm5pdmVyc2FyeV9hd2FyZGVkAAAABgAAAAAAAAAFbGV2ZWwAAAAAAAfQAAAADExveWFsdHlMZXZlbAAAAAAAAAAQbGV2ZWxfdXBkYXRlZF9hdAAAAAYAAAAAAAAAD2xpZmV0aW1lX3BvaW50cwAAAAALAAAAAAAAAAx0cmFuc2FjdGlvbnMAAAPqAAAH0AAAABFQb2ludHNUcmFuc2FjdGlvbgAAAA==",
        "AAAAAQAAACpNaWxlc3RvbmUgYWNoaWV2ZW1lbnQgY3JpdGVyaWEgYW5kIHJld2FyZHMAAAAAAAAAAAAJTWlsZXN0b25lAAAAAAAABQAAAAAAAAALZGVzY3JpcHRpb24AAAAAEQAAAAAAAAACaWQAAAAAAAQAAAAAAAAABG5hbWUAAAARAAAAAAAAAA1wb2ludHNfcmV3YXJkAAAAAAAACwAAAAAAAAALcmVxdWlyZW1lbnQAAAAH0AAAABRNaWxlc3RvbmVSZXF1aXJlbWVudA==",
        "AAAAAgAAAClEaWZmZXJlbnQgdHlwZXMgb2YgbWlsZXN0b25lIHJlcXVpcmVtZW50cwAAAAAAAAAAAAAUTWlsZXN0b25lUmVxdWlyZW1lbnQAAAAGAAAAAQAAAAAAAAAOVG90YWxQdXJjaGFzZXMAAAAAAAEAAAAEAAAAAQAAAAAAAAALU3BlbmRBbW91bnQAAAAAAQAAAAsAAAABAAAAAAAAAAxQb2ludHNFYXJuZWQAAAABAAAACwAAAAEAAAAAAAAAD1NwZWNpZmljUHJvZHVjdAAAAAABAAAAEQAAAAEAAAAAAAAAEFNwZWNpZmljQ2F0ZWdvcnkAAAABAAAAEQAAAAEAAAAAAAAACkRheXNBY3RpdmUAAAAAAAEAAAAG",
        "AAAAAQAAACNSZXF1aXJlbWVudHMgZm9yIGVhY2ggbG95YWx0eSBsZXZlbAAAAAAAAAAAEUxldmVsUmVxdWlyZW1lbnRzAAAAAAAAAgAAAAAAAAAEZ29sZAAAB9AAAAANTGV2ZWxDcml0ZXJpYQAAAAAAAAAAAAAGc2lsdmVyAAAAAAfQAAAADUxldmVsQ3JpdGVyaWEAAAA=",
        "AAAAAQAAABtDcml0ZXJpYSBmb3IgbGV2ZWwgdXBncmFkZXMAAAAAAAAAAA1MZXZlbENyaXRlcmlhAAAAAAAAAwAAAAAAAAAPbWluX2RheXNfYWN0aXZlAAAAAAYAAAAAAAAACm1pbl9wb2ludHMAAAAAAAsAAAAAAAAADW1pbl9wdXJjaGFzZXMAAAAAAAAE",
        "AAAAAQAAACxSZXdhcmQgaXRlbSB0aGF0IGNhbiBiZSByZWRlZW1lZCB3aXRoIHBvaW50cwAAAAAAAAAGUmV3YXJkAAAAAAAHAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAARAAAAAAAAAAJpZAAAAAAABAAAAAAAAAAMbWF4X3Blcl91c2VyAAAABAAAAAAAAAAJbWluX2xldmVsAAAAAAAH0AAAAAxMb3lhbHR5TGV2ZWwAAAAAAAAABG5hbWUAAAARAAAAAAAAAAtwb2ludHNfY29zdAAAAAALAAAAAAAAAAtyZXdhcmRfdHlwZQAAAAfQAAAAClJld2FyZFR5cGUAAA==",
        "AAAAAgAAABpUeXBlcyBvZiByZXdhcmRzIGF2YWlsYWJsZQAAAAAAAAAAAApSZXdhcmRUeXBlAAAAAAAEAAAAAQAAAAAAAAAIRGlzY291bnQAAAABAAAABAAAAAEAAAAAAAAAB1Byb2R1Y3QAAAAAAQAAABEAAAABAAAAAAAAAANYTE0AAAAAAQAAAAsAAAABAAAAAAAAAAVUb2tlbgAAAAAAAAIAAAATAAAACw==",
        "AAAAAgAAAB5TdG9yYWdlIGtleXMgZm9yIGNvbnRyYWN0IGRhdGEAAAAAAAAAAAAHRGF0YUtleQAAAAANAAAAAAAAAAAAAAAFQWRtaW4AAAAAAAABAAAAAAAAAARVc2VyAAAAAQAAABMAAAABAAAAAAAAAAlNaWxlc3RvbmUAAAAAAAABAAAABAAAAAEAAAAAAAAABlJld2FyZAAAAAAAAQAAAAQAAAAAAAAAAAAAABFMZXZlbFJlcXVpcmVtZW50cwAAAAAAAAAAAAAAAAAAEFBvaW50c0V4cGlyeURheXMAAAAAAAAAAAAAABdNYXhSZWRlbXB0aW9uUGVyY2VudGFnZQAAAAAAAAAAAAAAABZQb2ludHNQZXJQdXJjaGFzZVJhdGlvAAAAAAABAAAAAAAAABRQcm9kdWN0Q2F0ZWdvcnlCb251cwAAAAEAAAARAAAAAQAAAAAAAAAMUHJvZHVjdEJvbnVzAAAAAQAAABEAAAAAAAAAAAAAAA9Ub3RhbE1pbGVzdG9uZXMAAAAAAAAAAAAAAAAMVG90YWxSZXdhcmRzAAAAAQAAAAAAAAAOVXNlclJlZGVtcHRpb24AAAAAAAEAAAfQAAAADlVzZXJSZWRlbXB0aW9uAAA=",
        "AAAAAQAAADZLZXkgZm9yIHRyYWNraW5nIHVzZXIgcmVkZW1wdGlvbnMgb2YgYSBzcGVjaWZpYyByZXdhcmQAAAAAAAAAAAAOVXNlclJlZGVtcHRpb24AAAAAAAIAAAAAAAAAATAAAAAAAAATAAAAAAAAAAExAAAAAAAABA==",
        "AAAABAAAABRDb250cmFjdCBlcnJvciB0eXBlcwAAAAAAAAAFRXJyb3IAAAAAAAASAAAAAAAAAA5Ob3RJbml0aWFsaXplZAAAAAAAAQAAAAAAAAASQWxyZWFkeUluaXRpYWxpemVkAAAAAAACAAAAAAAAAAxVbmF1dGhvcml6ZWQAAAADAAAAAAAAAAxVc2VyTm90Rm91bmQAAAAEAAAAAAAAABJJbnN1ZmZpY2llbnRQb2ludHMAAAAAAAUAAAAAAAAADUludmFsaWRBbW91bnQAAAAAAAAGAAAAAAAAABFNaWxlc3RvbmVOb3RGb3VuZAAAAAAAAAcAAAAAAAAAGU1pbGVzdG9uZUFscmVhZHlDb21wbGV0ZWQAAAAAAAAIAAAAAAAAAA5SZXdhcmROb3RGb3VuZAAAAAAACQAAAAAAAAAYSW5zdWZmaWNpZW50TG95YWx0eUxldmVsAAAACgAAAAAAAAAVTWF4UmVkZW1wdGlvbkV4Y2VlZGVkAAAAAAAACwAAAAAAAAATSW52YWxpZFBvaW50c0V4cGlyeQAAAAAMAAAAAAAAABhJbnZhbGlkTGV2ZWxSZXF1aXJlbWVudHMAAAANAAAAAAAAAA1Qb2ludHNFeHBpcmVkAAAAAAAADgAAAAAAAAAPUHJvZHVjdE5vdEZvdW5kAAAAAA8AAAAAAAAAEENhdGVnb3J5Tm90Rm91bmQAAAAQAAAAAAAAABRNaWxlc3RvbmVOb3RFbGlnaWJsZQAAABEAAAAAAAAAElJld2FyZExpbWl0UmVhY2hlZAAAAAAAEg==",
        "AAAAAAAAAAAAAAAEaW5pdAAAAAEAAAAAAAAABWFkbWluAAAAAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAAMdXBkYXRlX2FkbWluAAAAAQAAAAAAAAAJbmV3X2FkbWluAAAAAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAARc2V0X3BvaW50c19leHBpcnkAAAAAAAABAAAAAAAAAARkYXlzAAAABgAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAAdc2V0X21heF9yZWRlbXB0aW9uX3BlcmNlbnRhZ2UAAAAAAAABAAAAAAAAAA5wZXJjZW50YWdlX2JwcwAAAAAABAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAAQc2V0X3BvaW50c19yYXRpbwAAAAEAAAAAAAAABXJhdGlvAAAAAAAABAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAASc2V0X2NhdGVnb3J5X2JvbnVzAAAAAAACAAAAAAAAAAhjYXRlZ29yeQAAABEAAAAAAAAACWJvbnVzX2JwcwAAAAAAAAQAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAAAAAAARc2V0X3Byb2R1Y3RfYm9udXMAAAAAAAACAAAAAAAAAApwcm9kdWN0X2lkAAAAAAARAAAAAAAAAAlib251c19icHMAAAAAAAAEAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAKYWRkX3BvaW50cwAAAAAAAwAAAAAAAAAEdXNlcgAAABMAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAALZGVzY3JpcHRpb24AAAAAEQAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAANcmVnaXN0ZXJfdXNlcgAAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAASZ2V0X3BvaW50c19iYWxhbmNlAAAAAAABAAAAAAAAAAR1c2VyAAAAEwAAAAEAAAPpAAAACwAAAAM=",
        "AAAAAAAAAAAAAAATZ2V0X2xpZmV0aW1lX3BvaW50cwAAAAABAAAAAAAAAAR1c2VyAAAAEwAAAAEAAAPpAAAACwAAAAM=",
        "AAAAAAAAAAAAAAAWcmVjb3JkX3B1cmNoYXNlX3BvaW50cwAAAAAABAAAAAAAAAAEdXNlcgAAABMAAAAAAAAAD3B1cmNoYXNlX2Ftb3VudAAAAAALAAAAAAAAAApwcm9kdWN0X2lkAAAAAAPoAAAAEQAAAAAAAAAIY2F0ZWdvcnkAAAPoAAAAEQAAAAEAAAPpAAAACwAAAAM=",
        "AAAAAAAAAAAAAAAXaW5pdF9sZXZlbF9yZXF1aXJlbWVudHMAAAAAAQAAAAAAAAAMcmVxdWlyZW1lbnRzAAAH0AAAABFMZXZlbFJlcXVpcmVtZW50cwAAAAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAAWY2hlY2tfYW5kX3VwZGF0ZV9sZXZlbAAAAAAAAQAAAAAAAAAEdXNlcgAAABMAAAABAAAD6QAAAAEAAAAD",
        "AAAAAAAAAAAAAAAOZ2V0X3VzZXJfbGV2ZWwAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAfQAAAADExveWFsdHlMZXZlbAAAAAM=",
        "AAAAAAAAAAAAAAAXYXdhcmRfYW5uaXZlcnNhcnlfYm9udXMAAAAAAQAAAAAAAAAEdXNlcgAAABMAAAABAAAD6QAAAAsAAAAD",
        "AAAAAAAAAAAAAAAQY3JlYXRlX21pbGVzdG9uZQAAAAEAAAAAAAAACW1pbGVzdG9uZQAAAAAAB9AAAAAJTWlsZXN0b25lAAAAAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAASY29tcGxldGVfbWlsZXN0b25lAAAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAMbWlsZXN0b25lX2lkAAAABAAAAAEAAAPpAAAACwAAAAM=",
        "AAAAAAAAAAAAAAAdY2hlY2tfYW5kX2NvbXBsZXRlX21pbGVzdG9uZXMAAAAAAAABAAAAAAAAAAR1c2VyAAAAEwAAAAEAAAPpAAAD6gAAAAQAAAAD",
        "AAAAAAAAAAAAAAANY3JlYXRlX3Jld2FyZAAAAAAAAAEAAAAAAAAABnJld2FyZAAAAAAH0AAAAAZSZXdhcmQAAAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAANcmVkZWVtX3Jld2FyZAAAAAAAAAMAAAAAAAAABHVzZXIAAAATAAAAAAAAAAlyZXdhcmRfaWQAAAAAAAAEAAAAAAAAAA9wdXJjaGFzZV9hbW91bnQAAAAD6AAAAAsAAAABAAAD6QAAAAsAAAAD",
        "AAAAAAAAAAAAAAAVZ2V0X2F2YWlsYWJsZV9yZXdhcmRzAAAAAAAAAAAAAAEAAAPpAAAD6gAAB9AAAAAGUmV3YXJkAAAAAAAD",
        "AAAAAAAAAAAAAAASY2FsY3VsYXRlX2Rpc2NvdW50AAAAAAACAAAAAAAAAAlyZXdhcmRfaWQAAAAAAAAEAAAAAAAAAA9wdXJjaGFzZV9hbW91bnQAAAAACwAAAAEAAAPpAAAACwAAAAM=" ]),
      options
    )
  }
  public readonly fromJSON = {
    init: this.txFromJSON<Result<void>>,
        update_admin: this.txFromJSON<Result<void>>,
        set_points_expiry: this.txFromJSON<Result<void>>,
        set_max_redemption_percentage: this.txFromJSON<Result<void>>,
        set_points_ratio: this.txFromJSON<Result<void>>,
        set_category_bonus: this.txFromJSON<Result<void>>,
        set_product_bonus: this.txFromJSON<Result<void>>,
        add_points: this.txFromJSON<Result<void>>,
        register_user: this.txFromJSON<Result<void>>,
        get_points_balance: this.txFromJSON<Result<i128>>,
        get_lifetime_points: this.txFromJSON<Result<i128>>,
        record_purchase_points: this.txFromJSON<Result<i128>>,
        init_level_requirements: this.txFromJSON<Result<void>>,
        check_and_update_level: this.txFromJSON<Result<boolean>>,
        get_user_level: this.txFromJSON<Result<LoyaltyLevel>>,
        award_anniversary_bonus: this.txFromJSON<Result<i128>>,
        create_milestone: this.txFromJSON<Result<void>>,
        complete_milestone: this.txFromJSON<Result<i128>>,
        check_and_complete_milestones: this.txFromJSON<Result<Array<u32>>>,
        create_reward: this.txFromJSON<Result<void>>,
        redeem_reward: this.txFromJSON<Result<i128>>,
        get_available_rewards: this.txFromJSON<Result<Array<Reward>>>,
        calculate_discount: this.txFromJSON<Result<i128>>
  }
}
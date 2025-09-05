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
    contractId: "CBF5UEADMZM5WA3SIT2NNQYQ5QVBHK33NY4QBSZBTSWP6NT3LIWQWZDS",
  }
} as const

/**
 * User verification status in the system
 */
export type VerificationStatus = {tag: "Pending", values: void} | {tag: "Verified", values: void} | {tag: "Rejected", values: readonly [string]};

/**
 * User levels with increasing benefits
 * Higher levels require stricter criteria and offer better rewards
 */
export enum UserLevel {
  Basic = 0,
  Silver = 1,
  Gold = 2,
  Platinum = 3,
}


/**
 * Core user data structure containing all user-related information
 */
export interface UserData {
  address: string;
  direct_referrals: Array<string>;
  identity_proof: string;
  join_date: u64;
  level: UserLevel;
  pending_rewards: i128;
  referrer: Option<string>;
  team_size: u32;
  total_rewards: i128;
  verification_status: VerificationStatus;
}


/**
 * Milestone achievement criteria and rewards
 */
export interface Milestone {
  description: string;
  required_level: UserLevel;
  requirement: MilestoneRequirement;
  reward_amount: i128;
}

/**
 * Different types of milestone requirements
 */
export type MilestoneRequirement = {tag: "DirectReferrals", values: readonly [u32]} | {tag: "TeamSize", values: readonly [u32]} | {tag: "TotalRewards", values: readonly [i128]} | {tag: "ActiveDays", values: readonly [u64]};

/**
 * Storage keys for contract data
 */
export type DataKey = {tag: "Admin", values: void} | {tag: "TotalUsers", values: void} | {tag: "RewardToken", values: void} | {tag: "RewardRates", values: void} | {tag: "User", values: readonly [string]} | {tag: "Milestone", values: readonly [u32]} | {tag: "ContractPaused", values: void} | {tag: "TotalDistributedRewards", values: void} | {tag: "UserAchievedMilestones", values: readonly [string]} | {tag: "PendingVerifications", values: readonly [Array<string>]} | {tag: "LevelRequirements", values: void};


/**
 * Commission rates for different referral levels
 */
export interface RewardRates {
  level1: u32;
  level2: u32;
  level3: u32;
  max_reward_per_referral: i128;
}


/**
 * Criteria for level upgrades
 */
export interface LevelCriteria {
  required_direct_referrals: u32;
  required_team_size: u32;
  required_total_rewards: i128;
}


/**
 * Requirements for each level upgrade
 */
export interface LevelRequirements {
  gold: LevelCriteria;
  platinum: LevelCriteria;
  silver: LevelCriteria;
}

/**
 * Contract error types
 */
export const Errors = {
  1: {message:"NotInitialized"},
  2: {message:"AlreadyInitialized"},
  3: {message:"Unauthorized"},
  4: {message:"AlreadyRegistered"},
  5: {message:"UserNotFound"},
  6: {message:"MilestoneNotFound"},
  7: {message:"InvalidAmount"},
  8: {message:"VerificationRequired"},
  9: {message:"AlreadyVerified"},
  10: {message:"InvalidIdentityProof"},
  11: {message:"InsufficientRewards"},
  12: {message:"InvalidRewardRates"},
  13: {message:"MaxRewardExceeded"},
  14: {message:"ReferrerNotVerified"},
  15: {message:"ReferrerNotFound"},
  16: {message:"InvalidLevelRequirements"},
  17: {message:"ContractPaused"},
  18: {message:"InvalidRewardToken"}
}

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Initializes the referral contract with an admin address, reward token, and default level requirements
   * 
   * # Arguments
   * * `admin` - The address of the contract administrator
   * * `reward_token` - The address of the token used for rewards
   */
  initialize: ({admin, reward_token}: {admin: string, reward_token: string}, options?: {
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
   * Construct and simulate a set_reward_rates transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Sets the reward rates for different referral levels
   * 
   * # Arguments
   * * `rates` - The new reward rates structure
   */
  set_reward_rates: ({rates}: {rates: RewardRates}, options?: {
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
   * get admin address
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
   * Construct and simulate a add_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Adds a new milestone to the referral program
   * 
   * # Arguments
   * * `milestone` - The milestone to be added
   */
  add_milestone: ({milestone}: {milestone: Milestone}, options?: {
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
   * Construct and simulate a remove_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Removes a milestone from the referral program
   * 
   * # Arguments
   * * `milestone_id` - The ID of the milestone to remove
   */
  remove_milestone: ({milestone_id}: {milestone_id: u32}, options?: {
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
   * Construct and simulate a update_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Updates an existing milestone
   * 
   * # Arguments
   * * `milestone_id` - The ID of the milestone to update
   * * `milestone` - The new milestone data
   */
  update_milestone: ({milestone_id, milestone}: {milestone_id: u32, milestone: Milestone}, options?: {
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
   * Construct and simulate a pause_contract transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Pauses all contract operations
   */
  pause_contract: (options?: {
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
   * Construct and simulate a resume_contract transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Resumes contract operations after being paused
   */
  resume_contract: (options?: {
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
   * Construct and simulate a get_paused_state transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Check if contract is paused
   */
  get_paused_state: (options?: {
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
   * Construct and simulate a transfer_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Transfers admin rights to a new address
   * 
   * # Arguments
   * * `new_admin` - The address of the new administrator
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
   * Construct and simulate a set_reward_token transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Sets or updates the reward token address
   * 
   * # Arguments
   * * `token` - The address of the new reward token
   */
  set_reward_token: ({token}: {token: string}, options?: {
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
   * Construct and simulate a set_level_requirements transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Updates the requirements for different referral levels
   * 
   * # Arguments
   * * `requirements` - The new level requirements
   */
  set_level_requirements: ({requirements}: {requirements: LevelRequirements}, options?: {
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
   * Construct and simulate a submit_verification transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Submits a verification request for a user
   * 
   * # Arguments
   * * `user` - The address of the user to verify
   * * `identity_proof` - Proof of identity for verification
   */
  submit_verification: ({user, identity_proof}: {user: string, identity_proof: string}, options?: {
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
   * Construct and simulate a approve_verification transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Approves a user's verification request
   * 
   * # Arguments
   * * `user` - The address of the user to approve
   */
  approve_verification: ({user}: {user: string}, options?: {
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
   * Construct and simulate a reject_verification transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Rejects a user's verification request with a reason
   * 
   * # Arguments
   * * `user` - The address of the user to reject
   * * `reason` - The reason for rejection
   */
  reject_verification: ({user, reason}: {user: string, reason: string}, options?: {
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
   * Construct and simulate a get_verification_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Retrieves the verification status of a user
   * 
   * # Arguments
   * * `user` - The address of the user to check
   */
  get_verification_status: ({user}: {user: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<VerificationStatus>>>

  /**
   * Construct and simulate a get_pending_verifications transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Returns a list of all pending verification requests
   */
  get_pending_verifications: (options?: {
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
   * Construct and simulate a register_with_referral transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Registers a new user with a referrer
   * 
   * # Arguments
   * * `user` - The address of the new user
   * * `referrer_address` - The address of the referrer
   * * `identity_proof` - Proof of identity for verification
   */
  register_with_referral: ({user, referrer_address, identity_proof}: {user: string, referrer_address: string, identity_proof: string}, options?: {
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
   * Construct and simulate a is_user_verified transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Checks if a user is verified
   * 
   * # Arguments
   * * `user` - The address of the user to check
   */
  is_user_verified: ({user}: {user: string}, options?: {
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
   * Construct and simulate a is_user_registered transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Checks if a user is registered in the system
   * 
   * # Arguments
   * * `user` - The address of the user to check
   */
  is_user_registered: ({user}: {user: string}, options?: {
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
   * Construct and simulate a get_user_info transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Retrieves detailed information about a user
   * 
   * # Arguments
   * * `user` - The address of the user
   */
  get_user_info: ({user}: {user: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<UserData>>>

  /**
   * Construct and simulate a get_direct_referrals transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Gets a list of direct referrals for a user
   * 
   * # Arguments
   * * `user` - The address of the user
   */
  get_direct_referrals: ({user}: {user: string}, options?: {
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
   * Construct and simulate a get_team_size transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Gets the total team size (direct and indirect referrals) for a user
   * 
   * # Arguments
   * * `user` - The address of the user
   */
  get_team_size: ({user}: {user: string}, options?: {
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
   * Construct and simulate a distribute_rewards transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Distributes rewards to a user and their upline
   * 
   * # Arguments
   * * `user` - The address of the user
   * * `amount` - The amount of rewards to distribute
   */
  distribute_rewards: ({user, amount}: {user: string, amount: i128}, options?: {
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
   * Construct and simulate a claim_rewards transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Allows a user to claim their accumulated rewards
   * 
   * # Arguments
   * * `user` - The address of the user claiming rewards
   */
  claim_rewards: ({user}: {user: string}, options?: {
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
   * Construct and simulate a get_pending_rewards transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Gets the amount of pending rewards for a user
   * 
   * # Arguments
   * * `user` - The address of the user
   */
  get_pending_rewards: ({user}: {user: string}, options?: {
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
   * Construct and simulate a get_total_rewards transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Gets the total rewards earned by a user
   * 
   * # Arguments
   * * `user` - The address of the user
   */
  get_total_rewards: ({user}: {user: string}, options?: {
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
   * Construct and simulate a check_and_reward_milestone transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Checks and rewards any achieved milestones for a user
   * 
   * # Arguments
   * * `user` - The address of the user
   */
  check_and_reward_milestone: ({user}: {user: string}, options?: {
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
   * Construct and simulate a get_total_users transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Gets the total number of users in the system
   */
  get_total_users: (options?: {
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
   * Construct and simulate a get_total_distributed_rewards transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Gets the total amount of rewards distributed
   */
  get_total_distributed_rewards: (options?: {
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
   * Construct and simulate a get_system_metrics transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Gets various system metrics as key-value pairs
   * total_users, total_rewards, average_reward_per_user
   * 
   */
  get_system_metrics: (options?: {
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
  }) => Promise<AssembledTransaction<Result<Array<readonly [string, i128]>>>>

  /**
   * Construct and simulate a get_referral_conversion_rate transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Gets the referral conversion rate for a user. verified users/registered users
   * 
   * # Arguments
   * * `user` - The address of the user
   */
  get_referral_conversion_rate: ({user}: {user: string}, options?: {
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
   * Construct and simulate a get_user_level transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Gets the level of a user
   * 
   * # Arguments
   * * `user` - The address of the user
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
  }) => Promise<AssembledTransaction<Result<UserLevel>>>

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
      new ContractSpec([ "AAAAAgAAACZVc2VyIHZlcmlmaWNhdGlvbiBzdGF0dXMgaW4gdGhlIHN5c3RlbQAAAAAAAAAAABJWZXJpZmljYXRpb25TdGF0dXMAAAAAAAMAAAAAAAAAAAAAAAdQZW5kaW5nAAAAAAAAAAAAAAAACFZlcmlmaWVkAAAAAQAAAAAAAAAIUmVqZWN0ZWQAAAABAAAAEA==",
        "AAAAAwAAAGVVc2VyIGxldmVscyB3aXRoIGluY3JlYXNpbmcgYmVuZWZpdHMKSGlnaGVyIGxldmVscyByZXF1aXJlIHN0cmljdGVyIGNyaXRlcmlhIGFuZCBvZmZlciBiZXR0ZXIgcmV3YXJkcwAAAAAAAAAAAAAJVXNlckxldmVsAAAAAAAABAAAAAAAAAAFQmFzaWMAAAAAAAAAAAAAAAAAAAZTaWx2ZXIAAAAAAAEAAAAAAAAABEdvbGQAAAACAAAAAAAAAAhQbGF0aW51bQAAAAM=",
        "AAAAAQAAAEBDb3JlIHVzZXIgZGF0YSBzdHJ1Y3R1cmUgY29udGFpbmluZyBhbGwgdXNlci1yZWxhdGVkIGluZm9ybWF0aW9uAAAAAAAAAAhVc2VyRGF0YQAAAAoAAAAAAAAAB2FkZHJlc3MAAAAAEwAAAAAAAAAQZGlyZWN0X3JlZmVycmFscwAAA+oAAAATAAAAAAAAAA5pZGVudGl0eV9wcm9vZgAAAAAAEAAAAAAAAAAJam9pbl9kYXRlAAAAAAAABgAAAAAAAAAFbGV2ZWwAAAAAAAfQAAAACVVzZXJMZXZlbAAAAAAAAAAAAAAPcGVuZGluZ19yZXdhcmRzAAAAAAsAAAAAAAAACHJlZmVycmVyAAAD6AAAABMAAAAAAAAACXRlYW1fc2l6ZQAAAAAAAAQAAAAAAAAADXRvdGFsX3Jld2FyZHMAAAAAAAALAAAAAAAAABN2ZXJpZmljYXRpb25fc3RhdHVzAAAAB9AAAAASVmVyaWZpY2F0aW9uU3RhdHVzAAA=",
        "AAAAAQAAACpNaWxlc3RvbmUgYWNoaWV2ZW1lbnQgY3JpdGVyaWEgYW5kIHJld2FyZHMAAAAAAAAAAAAJTWlsZXN0b25lAAAAAAAABAAAAAAAAAALZGVzY3JpcHRpb24AAAAAEAAAAAAAAAAOcmVxdWlyZWRfbGV2ZWwAAAAAB9AAAAAJVXNlckxldmVsAAAAAAAAAAAAAAtyZXF1aXJlbWVudAAAAAfQAAAAFE1pbGVzdG9uZVJlcXVpcmVtZW50AAAAAAAAAA1yZXdhcmRfYW1vdW50AAAAAAAACw==",
        "AAAAAgAAAClEaWZmZXJlbnQgdHlwZXMgb2YgbWlsZXN0b25lIHJlcXVpcmVtZW50cwAAAAAAAAAAAAAUTWlsZXN0b25lUmVxdWlyZW1lbnQAAAAEAAAAAQAAAAAAAAAPRGlyZWN0UmVmZXJyYWxzAAAAAAEAAAAEAAAAAQAAAAAAAAAIVGVhbVNpemUAAAABAAAABAAAAAEAAAAAAAAADFRvdGFsUmV3YXJkcwAAAAEAAAALAAAAAQAAAAAAAAAKQWN0aXZlRGF5cwAAAAAAAQAAAAY=",
        "AAAAAgAAAB5TdG9yYWdlIGtleXMgZm9yIGNvbnRyYWN0IGRhdGEAAAAAAAAAAAAHRGF0YUtleQAAAAALAAAAAAAAAAAAAAAFQWRtaW4AAAAAAAAAAAAAAAAAAApUb3RhbFVzZXJzAAAAAAAAAAAAAAAAAAtSZXdhcmRUb2tlbgAAAAAAAAAAAAAAAAtSZXdhcmRSYXRlcwAAAAABAAAAAAAAAARVc2VyAAAAAQAAABMAAAABAAAAAAAAAAlNaWxlc3RvbmUAAAAAAAABAAAABAAAAAAAAAAAAAAADkNvbnRyYWN0UGF1c2VkAAAAAAAAAAAAAAAAABdUb3RhbERpc3RyaWJ1dGVkUmV3YXJkcwAAAAABAAAAAAAAABZVc2VyQWNoaWV2ZWRNaWxlc3RvbmVzAAAAAAABAAAAEwAAAAEAAAAAAAAAFFBlbmRpbmdWZXJpZmljYXRpb25zAAAAAQAAA+oAAAATAAAAAAAAAAAAAAARTGV2ZWxSZXF1aXJlbWVudHMAAAA=",
        "AAAAAQAAAC5Db21taXNzaW9uIHJhdGVzIGZvciBkaWZmZXJlbnQgcmVmZXJyYWwgbGV2ZWxzAAAAAAAAAAAAC1Jld2FyZFJhdGVzAAAAAAQAAAAAAAAABmxldmVsMQAAAAAABAAAAAAAAAAGbGV2ZWwyAAAAAAAEAAAAAAAAAAZsZXZlbDMAAAAAAAQAAAAAAAAAF21heF9yZXdhcmRfcGVyX3JlZmVycmFsAAAAAAs=",
        "AAAAAQAAABtDcml0ZXJpYSBmb3IgbGV2ZWwgdXBncmFkZXMAAAAAAAAAAA1MZXZlbENyaXRlcmlhAAAAAAAAAwAAAAAAAAAZcmVxdWlyZWRfZGlyZWN0X3JlZmVycmFscwAAAAAAAAQAAAAAAAAAEnJlcXVpcmVkX3RlYW1fc2l6ZQAAAAAABAAAAAAAAAAWcmVxdWlyZWRfdG90YWxfcmV3YXJkcwAAAAAACw==",
        "AAAAAQAAACNSZXF1aXJlbWVudHMgZm9yIGVhY2ggbGV2ZWwgdXBncmFkZQAAAAAAAAAAEUxldmVsUmVxdWlyZW1lbnRzAAAAAAAAAwAAAAAAAAAEZ29sZAAAB9AAAAANTGV2ZWxDcml0ZXJpYQAAAAAAAAAAAAAIcGxhdGludW0AAAfQAAAADUxldmVsQ3JpdGVyaWEAAAAAAAAAAAAABnNpbHZlcgAAAAAH0AAAAA1MZXZlbENyaXRlcmlhAAAA",
        "AAAABAAAABRDb250cmFjdCBlcnJvciB0eXBlcwAAAAAAAAAFRXJyb3IAAAAAAAASAAAAAAAAAA5Ob3RJbml0aWFsaXplZAAAAAAAAQAAAAAAAAASQWxyZWFkeUluaXRpYWxpemVkAAAAAAACAAAAAAAAAAxVbmF1dGhvcml6ZWQAAAADAAAAAAAAABFBbHJlYWR5UmVnaXN0ZXJlZAAAAAAAAAQAAAAAAAAADFVzZXJOb3RGb3VuZAAAAAUAAAAAAAAAEU1pbGVzdG9uZU5vdEZvdW5kAAAAAAAABgAAAAAAAAANSW52YWxpZEFtb3VudAAAAAAAAAcAAAAAAAAAFFZlcmlmaWNhdGlvblJlcXVpcmVkAAAACAAAAAAAAAAPQWxyZWFkeVZlcmlmaWVkAAAAAAkAAAAAAAAAFEludmFsaWRJZGVudGl0eVByb29mAAAACgAAAAAAAAATSW5zdWZmaWNpZW50UmV3YXJkcwAAAAALAAAAAAAAABJJbnZhbGlkUmV3YXJkUmF0ZXMAAAAAAAwAAAAAAAAAEU1heFJld2FyZEV4Y2VlZGVkAAAAAAAADQAAAAAAAAATUmVmZXJyZXJOb3RWZXJpZmllZAAAAAAOAAAAAAAAABBSZWZlcnJlck5vdEZvdW5kAAAADwAAAAAAAAAYSW52YWxpZExldmVsUmVxdWlyZW1lbnRzAAAAEAAAAAAAAAAOQ29udHJhY3RQYXVzZWQAAAAAABEAAAAAAAAAEkludmFsaWRSZXdhcmRUb2tlbgAAAAAAEg==",
        "AAAAAAAAAOVJbml0aWFsaXplcyB0aGUgcmVmZXJyYWwgY29udHJhY3Qgd2l0aCBhbiBhZG1pbiBhZGRyZXNzLCByZXdhcmQgdG9rZW4sIGFuZCBkZWZhdWx0IGxldmVsIHJlcXVpcmVtZW50cwoKIyBBcmd1bWVudHMKKiBgYWRtaW5gIC0gVGhlIGFkZHJlc3Mgb2YgdGhlIGNvbnRyYWN0IGFkbWluaXN0cmF0b3IKKiBgcmV3YXJkX3Rva2VuYCAtIFRoZSBhZGRyZXNzIG9mIHRoZSB0b2tlbiB1c2VkIGZvciByZXdhcmRzAAAAAAAACmluaXRpYWxpemUAAAAAAAIAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAAMcmV3YXJkX3Rva2VuAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAGtTZXRzIHRoZSByZXdhcmQgcmF0ZXMgZm9yIGRpZmZlcmVudCByZWZlcnJhbCBsZXZlbHMKCiMgQXJndW1lbnRzCiogYHJhdGVzYCAtIFRoZSBuZXcgcmV3YXJkIHJhdGVzIHN0cnVjdHVyZQAAAAAQc2V0X3Jld2FyZF9yYXRlcwAAAAEAAAAAAAAABXJhdGVzAAAAAAAH0AAAAAtSZXdhcmRSYXRlcwAAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAABFnZXQgYWRtaW4gYWRkcmVzcwAAAAAAAAlnZXRfYWRtaW4AAAAAAAAAAAAAAQAAA+kAAAATAAAAAw==",
        "AAAAAAAAAGNBZGRzIGEgbmV3IG1pbGVzdG9uZSB0byB0aGUgcmVmZXJyYWwgcHJvZ3JhbQoKIyBBcmd1bWVudHMKKiBgbWlsZXN0b25lYCAtIFRoZSBtaWxlc3RvbmUgdG8gYmUgYWRkZWQAAAAADWFkZF9taWxlc3RvbmUAAAAAAAABAAAAAAAAAAltaWxlc3RvbmUAAAAAAAfQAAAACU1pbGVzdG9uZQAAAAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAG9SZW1vdmVzIGEgbWlsZXN0b25lIGZyb20gdGhlIHJlZmVycmFsIHByb2dyYW0KCiMgQXJndW1lbnRzCiogYG1pbGVzdG9uZV9pZGAgLSBUaGUgSUQgb2YgdGhlIG1pbGVzdG9uZSB0byByZW1vdmUAAAAAEHJlbW92ZV9taWxlc3RvbmUAAAABAAAAAAAAAAxtaWxlc3RvbmVfaWQAAAAEAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAIZVcGRhdGVzIGFuIGV4aXN0aW5nIG1pbGVzdG9uZQoKIyBBcmd1bWVudHMKKiBgbWlsZXN0b25lX2lkYCAtIFRoZSBJRCBvZiB0aGUgbWlsZXN0b25lIHRvIHVwZGF0ZQoqIGBtaWxlc3RvbmVgIC0gVGhlIG5ldyBtaWxlc3RvbmUgZGF0YQAAAAAAEHVwZGF0ZV9taWxlc3RvbmUAAAACAAAAAAAAAAxtaWxlc3RvbmVfaWQAAAAEAAAAAAAAAAltaWxlc3RvbmUAAAAAAAfQAAAACU1pbGVzdG9uZQAAAAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAB5QYXVzZXMgYWxsIGNvbnRyYWN0IG9wZXJhdGlvbnMAAAAAAA5wYXVzZV9jb250cmFjdAAAAAAAAAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAC5SZXN1bWVzIGNvbnRyYWN0IG9wZXJhdGlvbnMgYWZ0ZXIgYmVpbmcgcGF1c2VkAAAAAAAPcmVzdW1lX2NvbnRyYWN0AAAAAAAAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAABtDaGVjayBpZiBjb250cmFjdCBpcyBwYXVzZWQAAAAAEGdldF9wYXVzZWRfc3RhdGUAAAAAAAAAAQAAA+kAAAABAAAAAw==",
        "AAAAAAAAAGlUcmFuc2ZlcnMgYWRtaW4gcmlnaHRzIHRvIGEgbmV3IGFkZHJlc3MKCiMgQXJndW1lbnRzCiogYG5ld19hZG1pbmAgLSBUaGUgYWRkcmVzcyBvZiB0aGUgbmV3IGFkbWluaXN0cmF0b3IAAAAAAAAOdHJhbnNmZXJfYWRtaW4AAAAAAAEAAAAAAAAACW5ld19hZG1pbgAAAAAAABMAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAGVTZXRzIG9yIHVwZGF0ZXMgdGhlIHJld2FyZCB0b2tlbiBhZGRyZXNzCgojIEFyZ3VtZW50cwoqIGB0b2tlbmAgLSBUaGUgYWRkcmVzcyBvZiB0aGUgbmV3IHJld2FyZCB0b2tlbgAAAAAAABBzZXRfcmV3YXJkX3Rva2VuAAAAAQAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAHFVcGRhdGVzIHRoZSByZXF1aXJlbWVudHMgZm9yIGRpZmZlcmVudCByZWZlcnJhbCBsZXZlbHMKCiMgQXJndW1lbnRzCiogYHJlcXVpcmVtZW50c2AgLSBUaGUgbmV3IGxldmVsIHJlcXVpcmVtZW50cwAAAAAAABZzZXRfbGV2ZWxfcmVxdWlyZW1lbnRzAAAAAAABAAAAAAAAAAxyZXF1aXJlbWVudHMAAAfQAAAAEUxldmVsUmVxdWlyZW1lbnRzAAAAAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAJtTdWJtaXRzIGEgdmVyaWZpY2F0aW9uIHJlcXVlc3QgZm9yIGEgdXNlcgoKIyBBcmd1bWVudHMKKiBgdXNlcmAgLSBUaGUgYWRkcmVzcyBvZiB0aGUgdXNlciB0byB2ZXJpZnkKKiBgaWRlbnRpdHlfcHJvb2ZgIC0gUHJvb2Ygb2YgaWRlbnRpdHkgZm9yIHZlcmlmaWNhdGlvbgAAAAATc3VibWl0X3ZlcmlmaWNhdGlvbgAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAOaWRlbnRpdHlfcHJvb2YAAAAAABAAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAGFBcHByb3ZlcyBhIHVzZXIncyB2ZXJpZmljYXRpb24gcmVxdWVzdAoKIyBBcmd1bWVudHMKKiBgdXNlcmAgLSBUaGUgYWRkcmVzcyBvZiB0aGUgdXNlciB0byBhcHByb3ZlAAAAAAAAFGFwcHJvdmVfdmVyaWZpY2F0aW9uAAAAAQAAAAAAAAAEdXNlcgAAABMAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAJNSZWplY3RzIGEgdXNlcidzIHZlcmlmaWNhdGlvbiByZXF1ZXN0IHdpdGggYSByZWFzb24KCiMgQXJndW1lbnRzCiogYHVzZXJgIC0gVGhlIGFkZHJlc3Mgb2YgdGhlIHVzZXIgdG8gcmVqZWN0CiogYHJlYXNvbmAgLSBUaGUgcmVhc29uIGZvciByZWplY3Rpb24AAAAAE3JlamVjdF92ZXJpZmljYXRpb24AAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAABnJlYXNvbgAAAAAAEAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAGRSZXRyaWV2ZXMgdGhlIHZlcmlmaWNhdGlvbiBzdGF0dXMgb2YgYSB1c2VyCgojIEFyZ3VtZW50cwoqIGB1c2VyYCAtIFRoZSBhZGRyZXNzIG9mIHRoZSB1c2VyIHRvIGNoZWNrAAAAF2dldF92ZXJpZmljYXRpb25fc3RhdHVzAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAfQAAAAElZlcmlmaWNhdGlvblN0YXR1cwAAAAAAAw==",
        "AAAAAAAAADNSZXR1cm5zIGEgbGlzdCBvZiBhbGwgcGVuZGluZyB2ZXJpZmljYXRpb24gcmVxdWVzdHMAAAAAGWdldF9wZW5kaW5nX3ZlcmlmaWNhdGlvbnMAAAAAAAAAAAAAAQAAA+kAAAPqAAAAEwAAAAM=",
        "AAAAAAAAAMNSZWdpc3RlcnMgYSBuZXcgdXNlciB3aXRoIGEgcmVmZXJyZXIKCiMgQXJndW1lbnRzCiogYHVzZXJgIC0gVGhlIGFkZHJlc3Mgb2YgdGhlIG5ldyB1c2VyCiogYHJlZmVycmVyX2FkZHJlc3NgIC0gVGhlIGFkZHJlc3Mgb2YgdGhlIHJlZmVycmVyCiogYGlkZW50aXR5X3Byb29mYCAtIFByb29mIG9mIGlkZW50aXR5IGZvciB2ZXJpZmljYXRpb24AAAAAFnJlZ2lzdGVyX3dpdGhfcmVmZXJyYWwAAAAAAAMAAAAAAAAABHVzZXIAAAATAAAAAAAAABByZWZlcnJlcl9hZGRyZXNzAAAAEwAAAAAAAAAOaWRlbnRpdHlfcHJvb2YAAAAAABAAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAFVDaGVja3MgaWYgYSB1c2VyIGlzIHZlcmlmaWVkCgojIEFyZ3VtZW50cwoqIGB1c2VyYCAtIFRoZSBhZGRyZXNzIG9mIHRoZSB1c2VyIHRvIGNoZWNrAAAAAAAAEGlzX3VzZXJfdmVyaWZpZWQAAAABAAAAAAAAAAR1c2VyAAAAEwAAAAEAAAPpAAAAAQAAAAM=",
        "AAAAAAAAAGVDaGVja3MgaWYgYSB1c2VyIGlzIHJlZ2lzdGVyZWQgaW4gdGhlIHN5c3RlbQoKIyBBcmd1bWVudHMKKiBgdXNlcmAgLSBUaGUgYWRkcmVzcyBvZiB0aGUgdXNlciB0byBjaGVjawAAAAAAABJpc191c2VyX3JlZ2lzdGVyZWQAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAABAAAAAw==",
        "AAAAAAAAAFtSZXRyaWV2ZXMgZGV0YWlsZWQgaW5mb3JtYXRpb24gYWJvdXQgYSB1c2VyCgojIEFyZ3VtZW50cwoqIGB1c2VyYCAtIFRoZSBhZGRyZXNzIG9mIHRoZSB1c2VyAAAAAA1nZXRfdXNlcl9pbmZvAAAAAAAAAQAAAAAAAAAEdXNlcgAAABMAAAABAAAD6QAAB9AAAAAIVXNlckRhdGEAAAAD",
        "AAAAAAAAAFpHZXRzIGEgbGlzdCBvZiBkaXJlY3QgcmVmZXJyYWxzIGZvciBhIHVzZXIKCiMgQXJndW1lbnRzCiogYHVzZXJgIC0gVGhlIGFkZHJlc3Mgb2YgdGhlIHVzZXIAAAAAABRnZXRfZGlyZWN0X3JlZmVycmFscwAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAPqAAAAEwAAAAM=",
        "AAAAAAAAAHNHZXRzIHRoZSB0b3RhbCB0ZWFtIHNpemUgKGRpcmVjdCBhbmQgaW5kaXJlY3QgcmVmZXJyYWxzKSBmb3IgYSB1c2VyCgojIEFyZ3VtZW50cwoqIGB1c2VyYCAtIFRoZSBhZGRyZXNzIG9mIHRoZSB1c2VyAAAAAA1nZXRfdGVhbV9zaXplAAAAAAAAAQAAAAAAAAAEdXNlcgAAABMAAAABAAAD6QAAAAQAAAAD",
        "AAAAAAAAAI9EaXN0cmlidXRlcyByZXdhcmRzIHRvIGEgdXNlciBhbmQgdGhlaXIgdXBsaW5lCgojIEFyZ3VtZW50cwoqIGB1c2VyYCAtIFRoZSBhZGRyZXNzIG9mIHRoZSB1c2VyCiogYGFtb3VudGAgLSBUaGUgYW1vdW50IG9mIHJld2FyZHMgdG8gZGlzdHJpYnV0ZQAAAAASZGlzdHJpYnV0ZV9yZXdhcmRzAAAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAHFBbGxvd3MgYSB1c2VyIHRvIGNsYWltIHRoZWlyIGFjY3VtdWxhdGVkIHJld2FyZHMKCiMgQXJndW1lbnRzCiogYHVzZXJgIC0gVGhlIGFkZHJlc3Mgb2YgdGhlIHVzZXIgY2xhaW1pbmcgcmV3YXJkcwAAAAAAAA1jbGFpbV9yZXdhcmRzAAAAAAAAAQAAAAAAAAAEdXNlcgAAABMAAAABAAAD6QAAAAsAAAAD",
        "AAAAAAAAAF1HZXRzIHRoZSBhbW91bnQgb2YgcGVuZGluZyByZXdhcmRzIGZvciBhIHVzZXIKCiMgQXJndW1lbnRzCiogYHVzZXJgIC0gVGhlIGFkZHJlc3Mgb2YgdGhlIHVzZXIAAAAAAAATZ2V0X3BlbmRpbmdfcmV3YXJkcwAAAAABAAAAAAAAAAR1c2VyAAAAEwAAAAEAAAPpAAAACwAAAAM=",
        "AAAAAAAAAFdHZXRzIHRoZSB0b3RhbCByZXdhcmRzIGVhcm5lZCBieSBhIHVzZXIKCiMgQXJndW1lbnRzCiogYHVzZXJgIC0gVGhlIGFkZHJlc3Mgb2YgdGhlIHVzZXIAAAAAEWdldF90b3RhbF9yZXdhcmRzAAAAAAAAAQAAAAAAAAAEdXNlcgAAABMAAAABAAAD6QAAAAsAAAAD",
        "AAAAAAAAAGVDaGVja3MgYW5kIHJld2FyZHMgYW55IGFjaGlldmVkIG1pbGVzdG9uZXMgZm9yIGEgdXNlcgoKIyBBcmd1bWVudHMKKiBgdXNlcmAgLSBUaGUgYWRkcmVzcyBvZiB0aGUgdXNlcgAAAAAAABpjaGVja19hbmRfcmV3YXJkX21pbGVzdG9uZQAAAAAAAQAAAAAAAAAEdXNlcgAAABMAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAACxHZXRzIHRoZSB0b3RhbCBudW1iZXIgb2YgdXNlcnMgaW4gdGhlIHN5c3RlbQAAAA9nZXRfdG90YWxfdXNlcnMAAAAAAAAAAAEAAAPpAAAABAAAAAM=",
        "AAAAAAAAACxHZXRzIHRoZSB0b3RhbCBhbW91bnQgb2YgcmV3YXJkcyBkaXN0cmlidXRlZAAAAB1nZXRfdG90YWxfZGlzdHJpYnV0ZWRfcmV3YXJkcwAAAAAAAAAAAAABAAAD6QAAAAsAAAAD",
        "AAAAAAAAAGNHZXRzIHZhcmlvdXMgc3lzdGVtIG1ldHJpY3MgYXMga2V5LXZhbHVlIHBhaXJzCnRvdGFsX3VzZXJzLCB0b3RhbF9yZXdhcmRzLCBhdmVyYWdlX3Jld2FyZF9wZXJfdXNlcgoAAAAAEmdldF9zeXN0ZW1fbWV0cmljcwAAAAAAAAAAAAEAAAPpAAAD6gAAA+0AAAACAAAAEAAAAAsAAAAD",
        "AAAAAAAAAH1HZXRzIHRoZSByZWZlcnJhbCBjb252ZXJzaW9uIHJhdGUgZm9yIGEgdXNlci4gdmVyaWZpZWQgdXNlcnMvcmVnaXN0ZXJlZCB1c2VycwoKIyBBcmd1bWVudHMKKiBgdXNlcmAgLSBUaGUgYWRkcmVzcyBvZiB0aGUgdXNlcgAAAAAAABxnZXRfcmVmZXJyYWxfY29udmVyc2lvbl9yYXRlAAAAAQAAAAAAAAAEdXNlcgAAABMAAAABAAAD6QAAAAQAAAAD",
        "AAAAAAAAAEhHZXRzIHRoZSBsZXZlbCBvZiBhIHVzZXIKCiMgQXJndW1lbnRzCiogYHVzZXJgIC0gVGhlIGFkZHJlc3Mgb2YgdGhlIHVzZXIAAAAOZ2V0X3VzZXJfbGV2ZWwAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAfQAAAACVVzZXJMZXZlbAAAAAAAAAM=" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<Result<void>>,
        set_reward_rates: this.txFromJSON<Result<void>>,
        get_admin: this.txFromJSON<Result<string>>,
        add_milestone: this.txFromJSON<Result<void>>,
        remove_milestone: this.txFromJSON<Result<void>>,
        update_milestone: this.txFromJSON<Result<void>>,
        pause_contract: this.txFromJSON<Result<void>>,
        resume_contract: this.txFromJSON<Result<void>>,
        get_paused_state: this.txFromJSON<Result<boolean>>,
        transfer_admin: this.txFromJSON<Result<void>>,
        set_reward_token: this.txFromJSON<Result<void>>,
        set_level_requirements: this.txFromJSON<Result<void>>,
        submit_verification: this.txFromJSON<Result<void>>,
        approve_verification: this.txFromJSON<Result<void>>,
        reject_verification: this.txFromJSON<Result<void>>,
        get_verification_status: this.txFromJSON<Result<VerificationStatus>>,
        get_pending_verifications: this.txFromJSON<Result<Array<string>>>,
        register_with_referral: this.txFromJSON<Result<void>>,
        is_user_verified: this.txFromJSON<Result<boolean>>,
        is_user_registered: this.txFromJSON<Result<boolean>>,
        get_user_info: this.txFromJSON<Result<UserData>>,
        get_direct_referrals: this.txFromJSON<Result<Array<string>>>,
        get_team_size: this.txFromJSON<Result<u32>>,
        distribute_rewards: this.txFromJSON<Result<void>>,
        claim_rewards: this.txFromJSON<Result<i128>>,
        get_pending_rewards: this.txFromJSON<Result<i128>>,
        get_total_rewards: this.txFromJSON<Result<i128>>,
        check_and_reward_milestone: this.txFromJSON<Result<void>>,
        get_total_users: this.txFromJSON<Result<u32>>,
        get_total_distributed_rewards: this.txFromJSON<Result<i128>>,
        get_system_metrics: this.txFromJSON<Result<Array<readonly [string, i128]>>>,
        get_referral_conversion_rate: this.txFromJSON<Result<u32>>,
        get_user_level: this.txFromJSON<Result<UserLevel>>
  }
}
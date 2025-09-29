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
    contractId: "CAXIUU3GKDXIFVLKYHMHIQ5TRHBJOLMTSRM2DABN4ITIURMPM5JEWL5Z",
  }
} as const

export enum ProposalStatus {
  Draft = 0,
  Active = 1,
  Passed = 2,
  Rejected = 3,
  Executed = 4,
  Canceled = 5,
  Vetoed = 6,
}

export enum ProposalType {
  FeatureRequest = 0,
  PolicyChange = 1,
  ParameterChange = 2,
  ContractUpgrade = 3,
  EmergencyAction = 4,
  EconomicChange = 5,
}


export interface Proposal {
  actions: Array<Action>;
  activated_at: u64;
  created_at: u64;
  description: string;
  id: u32;
  metadata_hash: string;
  proposal_type: ProposalType;
  proposer: string;
  status: ProposalStatus;
  title: string;
  voting_config: VotingConfig;
}


export interface ProposalRequirements {
  cooldown_period: u64;
  max_voting_power: i128;
  proposal_limit: u32;
  required_stake: i128;
}


export interface Vote {
  support: boolean;
  timestamp: u64;
  voter: string;
  weight: i128;
}


export interface VotingConfig {
  duration: u64;
  execution_delay: u64;
  one_address_one_vote: boolean;
  quorum: u128;
  threshold: u128;
}


export interface WeightSnapshot {
  proposal_id: u32;
  snapshot_at: u64;
}


export interface Moderator {
  address: string;
  appointed_at: u64;
}

export type Action = {tag: "UpdateProposalRequirements", values: readonly [ProposalRequirements]} | {tag: "AppointModerator", values: readonly [string]} | {tag: "RemoveModerator", values: readonly [string]} | {tag: "UpdateRewardRates", values: readonly [RewardRates]} | {tag: "UpdateLevelRequirements", values: readonly [LevelRequirements]} | {tag: "UpdateAuctionConditions", values: readonly [u32, AuctionConditions]};

export const Errors = {
  1: {message:"AlreadyInitialized"},
  2: {message:"NotInitialized"},
  3: {message:"Unauthorized"},
  101: {message:"ProposalNotFound"},
  102: {message:"InvalidProposalStatus"},
  103: {message:"NotEligibleToPropose"},
  104: {message:"ProposalInCooldown"},
  105: {message:"InsufficientStake"},
  106: {message:"InvalidProposalType"},
  107: {message:"ProposalLimitReached"},
  108: {message:"InvalidProposalInput"},
  201: {message:"ProposalNotActive"},
  202: {message:"AlreadyVoted"},
  203: {message:"NoVotingPower"},
  204: {message:"InvalidVotingPeriod"},
  301: {message:"InvalidDelegation"},
  302: {message:"SelfDelegationNotAllowed"},
  401: {message:"ProposalNotExecutable"},
  402: {message:"ExecutionFailed"},
  403: {message:"ExecutionDelayNotMet"},
  404: {message:"InvalidAction"},
  501: {message:"NotVerified"},
  502: {message:"UserLevelNotSet"},
  503: {message:"InsufficientReferralLevel"},
  601: {message:"ModeratorNotFound"},
  602: {message:"AlreadyModerator"},
  701: {message:"ContractCallFailed"}
}


export interface RewardRates {
  gold_rate: i128;
  platinum_rate: i128;
  silver_rate: i128;
}


export interface LevelCriteria {
  required_direct_referrals: u32;
  required_team_size: u32;
  required_total_rewards: i128;
}


export interface LevelRequirements {
  gold: LevelCriteria;
  platinum: LevelCriteria;
  silver: LevelCriteria;
}

export type UserLevel = {tag: "Basic", values: void} | {tag: "Silver", values: void} | {tag: "Gold", values: void} | {tag: "Platinum", values: void};


export interface AuctionConditions {
  auction_type: AuctionType;
  end_time: u64;
  on_bid_count: Option<u32>;
  on_fixed_sequence_number: Option<u32>;
  on_inactivity_seconds: Option<u64>;
  on_maximum_participants: Option<u32>;
  on_minimum_participants: Option<u32>;
  on_target_price: Option<i128>;
  starting_price: i128;
}

export type AuctionType = {tag: "Regular", values: void} | {tag: "Reverse", values: void} | {tag: "Dutch", values: readonly [DutchAuctionData]};


export interface DutchAuctionData {
  floor_price: i128;
}

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Initialize the governance contract with required configurations
   * 
   * # Arguments
   * * `env` - The environment object
   * * `admin` - The administrator address with special privileges
   * * `token` - The governance token address used for voting weight
   * * `referral_contract` - The address of the referral contract for user verification
   * * `auction_contract` - The address of the auction contract for economic actions
   * * `config` - The initial voting configuration
   * 
   * # Returns
   * * `Result<(), Error>` - Success or an error if initialization fails
   */
  initialize: ({admin, token, referral_contract, auction_contract, config}: {admin: string, token: string, referral_contract: string, auction_contract: string, config: VotingConfig}, options?: {
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
   * Construct and simulate a create_proposal transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Create a new governance proposal
   * 
   * # Arguments
   * * `env` - The environment object
   * * `proposer` - The address creating the proposal
   * * `title` - The title of the proposal
   * * `description` - The description of the proposal
   * * `metadata_hash` - A hash pointing to additional metadata
   * * `proposal_type` - The type of proposal (e.g., governance, technical, economic)
   * * `actions` - The actions to be executed if proposal passes
   * * `voting_config` - Configuration for the voting process
   * 
   * # Returns
   * * `Result<u32, Error>` - The proposal ID or an error
   */
  create_proposal: ({proposer, title, description, metadata_hash, proposal_type, actions, voting_config}: {proposer: string, title: string, description: string, metadata_hash: string, proposal_type: ProposalType, actions: Array<Action>, voting_config: VotingConfig}, options?: {
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
   * Construct and simulate a activate_proposal transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Activate a proposal to begin the voting period
   * 
   * # Arguments
   * * `env` - The environment object
   * * `caller` - The address activating the proposal (must be a moderator)
   * * `proposal_id` - The ID of the proposal to activate
   * 
   * # Returns
   * * `Result<(), Error>` - Success or an error
   */
  activate_proposal: ({caller, proposal_id}: {caller: string, proposal_id: u32}, options?: {
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
   * Construct and simulate a cancel_proposal transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Cancel a proposal before execution
   * 
   * # Arguments
   * * `env` - The environment object
   * * `caller` - The address canceling the proposal
   * * `proposal_id` - The ID of the proposal to cancel
   * 
   * # Returns
   * * `Result<(), Error>` - Success or an error
   */
  cancel_proposal: ({caller, proposal_id}: {caller: string, proposal_id: u32}, options?: {
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
   * Construct and simulate a veto_proposal transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Veto a passed proposal by a moderator
   * 
   * # Arguments
   * * `env` - The environment object
   * * `moderator` - The address of the moderator vetoing the proposal
   * * `proposal_id` - The ID of the proposal to veto
   * 
   * # Returns
   * * `Result<(), Error>` - Success or an error
   */
  veto_proposal: ({moderator, proposal_id}: {moderator: string, proposal_id: u32}, options?: {
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
   * Construct and simulate a mark_passed transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Mark a proposal as passed (for moderator use)
   * 
   * # Arguments
   * * `env` - The environment object
   * * `caller` - The address marking the proposal (must be a moderator)
   * * `proposal_id` - The ID of the proposal to mark as passed
   * 
   * # Returns
   * * `Result<(), Error>` - Success or an error
   */
  mark_passed: ({caller, proposal_id}: {caller: string, proposal_id: u32}, options?: {
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
   * Construct and simulate a mark_rejected transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Mark a proposal as rejected (for moderator use)
   * 
   * # Arguments
   * * `env` - The environment object
   * * `caller` - The address marking the proposal (must be a moderator)
   * * `proposal_id` - The ID of the proposal to mark as rejected
   * 
   * # Returns
   * * `Result<(), Error>` - Success or an error
   */
  mark_rejected: ({caller, proposal_id}: {caller: string, proposal_id: u32}, options?: {
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
   * Construct and simulate a mark_executed transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Mark a proposal as executed (for moderator use)
   * 
   * # Arguments
   * * `env` - The environment object
   * * `caller` - The address marking the proposal (must be a moderator)
   * * `proposal_id` - The ID of the proposal to mark as executed
   * 
   * # Returns
   * * `Result<(), Error>` - Success or an error
   */
  mark_executed: ({caller, proposal_id}: {caller: string, proposal_id: u32}, options?: {
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
   * Cast a vote on a proposal
   * 
   * # Arguments
   * * `env` - The environment object
   * * `voter` - The address of the voter
   * * `proposal_id` - The ID of the proposal being voted on
   * * `support` - Whether the vote is in support (true) or against (false)
   * 
   * # Returns
   * * `Result<(), Error>` - Success or an error
   */
  cast_vote: ({voter, proposal_id, support}: {voter: string, proposal_id: u32, support: boolean}, options?: {
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
   * Construct and simulate a take_snapshot transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Take a voting power snapshot for a proposal
   * 
   * # Arguments
   * * `env` - The environment object
   * * `proposal_id` - The ID of the proposal
   * 
   * # Returns
   * * `Result<(), Error>` - Success or an error
   */
  take_snapshot: ({proposal_id}: {proposal_id: u32}, options?: {
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
   * Construct and simulate a delegate_vote transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Delegate voting power to another address
   * 
   * # Arguments
   * * `env` - The environment object
   * * `delegator` - The address delegating their voting power
   * * `delegatee` - The address receiving the delegated voting power
   * 
   * # Returns
   * * `Result<(), Error>` - Success or an error
   */
  delegate_vote: ({delegator, delegatee}: {delegator: string, delegatee: string}, options?: {
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
   * Construct and simulate a get_vote_weight transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get the voting weight of an address for a specific proposal
   * 
   * # Arguments
   * * `env` - The environment object
   * * `voter` - The address to check
   * * `proposal_id` - The ID of the proposal
   * 
   * # Returns
   * * `Result<i128, Error>` - The voting weight or an error
   */
  get_vote_weight: ({voter, proposal_id}: {voter: string, proposal_id: u32}, options?: {
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
   * Construct and simulate a execute_proposal transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Execute a passed proposal's actions
   * 
   * # Arguments
   * * `env` - The environment object
   * * `executor` - The address executing the proposal
   * * `proposal_id` - The ID of the proposal to execute
   * 
   * # Returns
   * * `Result<(), Error>` - Success or an error
   */
  execute_proposal: ({executor, proposal_id}: {executor: string, proposal_id: u32}, options?: {
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
   * Construct and simulate a get_proposal transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get a proposal by ID
   * 
   * # Arguments
   * * `env` - The environment object
   * * `proposal_id` - The ID of the proposal to retrieve
   * 
   * # Returns
   * * `Result<Proposal, Error>` - The proposal or an error if not found
   */
  get_proposal: ({proposal_id}: {proposal_id: u32}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Proposal>>>

  /**
   * Construct and simulate a get_active_proposals transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get all active proposals
   * 
   * # Arguments
   * * `env` - The environment object
   * 
   * # Returns
   * * `Vec<u32>` - A list of active proposal IDs
   */
  get_active_proposals: (options?: {
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
  }) => Promise<AssembledTransaction<Array<u32>>>

  /**
   * Construct and simulate a get_executable_proposals transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get all proposals that are passed and ready for execution
   * 
   * # Arguments
   * * `env` - The environment object
   * 
   * # Returns
   * * `Vec<u32>` - A list of executable proposal IDs
   */
  get_executable_proposals: (options?: {
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
  }) => Promise<AssembledTransaction<Array<u32>>>

  /**
   * Construct and simulate a get_proposal_voters_count transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get total number of voters
   */
  get_proposal_voters_count: ({proposal_id}: {proposal_id: u32}, options?: {
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
  }) => Promise<AssembledTransaction<u128>>

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
      new ContractSpec([ "AAAAAAAAAgtJbml0aWFsaXplIHRoZSBnb3Zlcm5hbmNlIGNvbnRyYWN0IHdpdGggcmVxdWlyZWQgY29uZmlndXJhdGlvbnMKCiMgQXJndW1lbnRzCiogYGVudmAgLSBUaGUgZW52aXJvbm1lbnQgb2JqZWN0CiogYGFkbWluYCAtIFRoZSBhZG1pbmlzdHJhdG9yIGFkZHJlc3Mgd2l0aCBzcGVjaWFsIHByaXZpbGVnZXMKKiBgdG9rZW5gIC0gVGhlIGdvdmVybmFuY2UgdG9rZW4gYWRkcmVzcyB1c2VkIGZvciB2b3Rpbmcgd2VpZ2h0CiogYHJlZmVycmFsX2NvbnRyYWN0YCAtIFRoZSBhZGRyZXNzIG9mIHRoZSByZWZlcnJhbCBjb250cmFjdCBmb3IgdXNlciB2ZXJpZmljYXRpb24KKiBgYXVjdGlvbl9jb250cmFjdGAgLSBUaGUgYWRkcmVzcyBvZiB0aGUgYXVjdGlvbiBjb250cmFjdCBmb3IgZWNvbm9taWMgYWN0aW9ucwoqIGBjb25maWdgIC0gVGhlIGluaXRpYWwgdm90aW5nIGNvbmZpZ3VyYXRpb24KCiMgUmV0dXJucwoqIGBSZXN1bHQ8KCksIEVycm9yPmAgLSBTdWNjZXNzIG9yIGFuIGVycm9yIGlmIGluaXRpYWxpemF0aW9uIGZhaWxzAAAAAAppbml0aWFsaXplAAAAAAAFAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAABXRva2VuAAAAAAAAEwAAAAAAAAARcmVmZXJyYWxfY29udHJhY3QAAAAAAAATAAAAAAAAABBhdWN0aW9uX2NvbnRyYWN0AAAAEwAAAAAAAAAGY29uZmlnAAAAAAfQAAAADFZvdGluZ0NvbmZpZwAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAhhDcmVhdGUgYSBuZXcgZ292ZXJuYW5jZSBwcm9wb3NhbAoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBlbnZpcm9ubWVudCBvYmplY3QKKiBgcHJvcG9zZXJgIC0gVGhlIGFkZHJlc3MgY3JlYXRpbmcgdGhlIHByb3Bvc2FsCiogYHRpdGxlYCAtIFRoZSB0aXRsZSBvZiB0aGUgcHJvcG9zYWwKKiBgZGVzY3JpcHRpb25gIC0gVGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBwcm9wb3NhbAoqIGBtZXRhZGF0YV9oYXNoYCAtIEEgaGFzaCBwb2ludGluZyB0byBhZGRpdGlvbmFsIG1ldGFkYXRhCiogYHByb3Bvc2FsX3R5cGVgIC0gVGhlIHR5cGUgb2YgcHJvcG9zYWwgKGUuZy4sIGdvdmVybmFuY2UsIHRlY2huaWNhbCwgZWNvbm9taWMpCiogYGFjdGlvbnNgIC0gVGhlIGFjdGlvbnMgdG8gYmUgZXhlY3V0ZWQgaWYgcHJvcG9zYWwgcGFzc2VzCiogYHZvdGluZ19jb25maWdgIC0gQ29uZmlndXJhdGlvbiBmb3IgdGhlIHZvdGluZyBwcm9jZXNzCgojIFJldHVybnMKKiBgUmVzdWx0PHUzMiwgRXJyb3I+YCAtIFRoZSBwcm9wb3NhbCBJRCBvciBhbiBlcnJvcgAAAA9jcmVhdGVfcHJvcG9zYWwAAAAABwAAAAAAAAAIcHJvcG9zZXIAAAATAAAAAAAAAAV0aXRsZQAAAAAAABEAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABEAAAAAAAAADW1ldGFkYXRhX2hhc2gAAAAAAAAQAAAAAAAAAA1wcm9wb3NhbF90eXBlAAAAAAAH0AAAAAxQcm9wb3NhbFR5cGUAAAAAAAAAB2FjdGlvbnMAAAAD6gAAB9AAAAAGQWN0aW9uAAAAAAAAAAAADXZvdGluZ19jb25maWcAAAAAAAfQAAAADFZvdGluZ0NvbmZpZwAAAAEAAAPpAAAABAAAAAM=",
        "AAAAAAAAAQ9BY3RpdmF0ZSBhIHByb3Bvc2FsIHRvIGJlZ2luIHRoZSB2b3RpbmcgcGVyaW9kCgojIEFyZ3VtZW50cwoqIGBlbnZgIC0gVGhlIGVudmlyb25tZW50IG9iamVjdAoqIGBjYWxsZXJgIC0gVGhlIGFkZHJlc3MgYWN0aXZhdGluZyB0aGUgcHJvcG9zYWwgKG11c3QgYmUgYSBtb2RlcmF0b3IpCiogYHByb3Bvc2FsX2lkYCAtIFRoZSBJRCBvZiB0aGUgcHJvcG9zYWwgdG8gYWN0aXZhdGUKCiMgUmV0dXJucwoqIGBSZXN1bHQ8KCksIEVycm9yPmAgLSBTdWNjZXNzIG9yIGFuIGVycm9yAAAAABFhY3RpdmF0ZV9wcm9wb3NhbAAAAAAAAAIAAAAAAAAABmNhbGxlcgAAAAAAEwAAAAAAAAALcHJvcG9zYWxfaWQAAAAABAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAOpDYW5jZWwgYSBwcm9wb3NhbCBiZWZvcmUgZXhlY3V0aW9uCgojIEFyZ3VtZW50cwoqIGBlbnZgIC0gVGhlIGVudmlyb25tZW50IG9iamVjdAoqIGBjYWxsZXJgIC0gVGhlIGFkZHJlc3MgY2FuY2VsaW5nIHRoZSBwcm9wb3NhbAoqIGBwcm9wb3NhbF9pZGAgLSBUaGUgSUQgb2YgdGhlIHByb3Bvc2FsIHRvIGNhbmNlbAoKIyBSZXR1cm5zCiogYFJlc3VsdDwoKSwgRXJyb3I+YCAtIFN1Y2Nlc3Mgb3IgYW4gZXJyb3IAAAAAAA9jYW5jZWxfcHJvcG9zYWwAAAAAAgAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAAAAAAtwcm9wb3NhbF9pZAAAAAAEAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAP1WZXRvIGEgcGFzc2VkIHByb3Bvc2FsIGJ5IGEgbW9kZXJhdG9yCgojIEFyZ3VtZW50cwoqIGBlbnZgIC0gVGhlIGVudmlyb25tZW50IG9iamVjdAoqIGBtb2RlcmF0b3JgIC0gVGhlIGFkZHJlc3Mgb2YgdGhlIG1vZGVyYXRvciB2ZXRvaW5nIHRoZSBwcm9wb3NhbAoqIGBwcm9wb3NhbF9pZGAgLSBUaGUgSUQgb2YgdGhlIHByb3Bvc2FsIHRvIHZldG8KCiMgUmV0dXJucwoqIGBSZXN1bHQ8KCksIEVycm9yPmAgLSBTdWNjZXNzIG9yIGFuIGVycm9yAAAAAAAADXZldG9fcHJvcG9zYWwAAAAAAAACAAAAAAAAAAltb2RlcmF0b3IAAAAAAAATAAAAAAAAAAtwcm9wb3NhbF9pZAAAAAAEAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAARFNYXJrIGEgcHJvcG9zYWwgYXMgcGFzc2VkIChmb3IgbW9kZXJhdG9yIHVzZSkKCiMgQXJndW1lbnRzCiogYGVudmAgLSBUaGUgZW52aXJvbm1lbnQgb2JqZWN0CiogYGNhbGxlcmAgLSBUaGUgYWRkcmVzcyBtYXJraW5nIHRoZSBwcm9wb3NhbCAobXVzdCBiZSBhIG1vZGVyYXRvcikKKiBgcHJvcG9zYWxfaWRgIC0gVGhlIElEIG9mIHRoZSBwcm9wb3NhbCB0byBtYXJrIGFzIHBhc3NlZAoKIyBSZXR1cm5zCiogYFJlc3VsdDwoKSwgRXJyb3I+YCAtIFN1Y2Nlc3Mgb3IgYW4gZXJyb3IAAAAAAAALbWFya19wYXNzZWQAAAAAAgAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAAAAAAtwcm9wb3NhbF9pZAAAAAAEAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAARVNYXJrIGEgcHJvcG9zYWwgYXMgcmVqZWN0ZWQgKGZvciBtb2RlcmF0b3IgdXNlKQoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBlbnZpcm9ubWVudCBvYmplY3QKKiBgY2FsbGVyYCAtIFRoZSBhZGRyZXNzIG1hcmtpbmcgdGhlIHByb3Bvc2FsIChtdXN0IGJlIGEgbW9kZXJhdG9yKQoqIGBwcm9wb3NhbF9pZGAgLSBUaGUgSUQgb2YgdGhlIHByb3Bvc2FsIHRvIG1hcmsgYXMgcmVqZWN0ZWQKCiMgUmV0dXJucwoqIGBSZXN1bHQ8KCksIEVycm9yPmAgLSBTdWNjZXNzIG9yIGFuIGVycm9yAAAAAAAADW1hcmtfcmVqZWN0ZWQAAAAAAAACAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAAAAAAC3Byb3Bvc2FsX2lkAAAAAAQAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAARVNYXJrIGEgcHJvcG9zYWwgYXMgZXhlY3V0ZWQgKGZvciBtb2RlcmF0b3IgdXNlKQoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBlbnZpcm9ubWVudCBvYmplY3QKKiBgY2FsbGVyYCAtIFRoZSBhZGRyZXNzIG1hcmtpbmcgdGhlIHByb3Bvc2FsIChtdXN0IGJlIGEgbW9kZXJhdG9yKQoqIGBwcm9wb3NhbF9pZGAgLSBUaGUgSUQgb2YgdGhlIHByb3Bvc2FsIHRvIG1hcmsgYXMgZXhlY3V0ZWQKCiMgUmV0dXJucwoqIGBSZXN1bHQ8KCksIEVycm9yPmAgLSBTdWNjZXNzIG9yIGFuIGVycm9yAAAAAAAADW1hcmtfZXhlY3V0ZWQAAAAAAAACAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAAAAAAC3Byb3Bvc2FsX2lkAAAAAAQAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAASJDYXN0IGEgdm90ZSBvbiBhIHByb3Bvc2FsCgojIEFyZ3VtZW50cwoqIGBlbnZgIC0gVGhlIGVudmlyb25tZW50IG9iamVjdAoqIGB2b3RlcmAgLSBUaGUgYWRkcmVzcyBvZiB0aGUgdm90ZXIKKiBgcHJvcG9zYWxfaWRgIC0gVGhlIElEIG9mIHRoZSBwcm9wb3NhbCBiZWluZyB2b3RlZCBvbgoqIGBzdXBwb3J0YCAtIFdoZXRoZXIgdGhlIHZvdGUgaXMgaW4gc3VwcG9ydCAodHJ1ZSkgb3IgYWdhaW5zdCAoZmFsc2UpCgojIFJldHVybnMKKiBgUmVzdWx0PCgpLCBFcnJvcj5gIC0gU3VjY2VzcyBvciBhbiBlcnJvcgAAAAAACWNhc3Rfdm90ZQAAAAAAAAMAAAAAAAAABXZvdGVyAAAAAAAAEwAAAAAAAAALcHJvcG9zYWxfaWQAAAAABAAAAAAAAAAHc3VwcG9ydAAAAAABAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAALlUYWtlIGEgdm90aW5nIHBvd2VyIHNuYXBzaG90IGZvciBhIHByb3Bvc2FsCgojIEFyZ3VtZW50cwoqIGBlbnZgIC0gVGhlIGVudmlyb25tZW50IG9iamVjdAoqIGBwcm9wb3NhbF9pZGAgLSBUaGUgSUQgb2YgdGhlIHByb3Bvc2FsCgojIFJldHVybnMKKiBgUmVzdWx0PCgpLCBFcnJvcj5gIC0gU3VjY2VzcyBvciBhbiBlcnJvcgAAAAAAAA10YWtlX3NuYXBzaG90AAAAAAAAAQAAAAAAAAALcHJvcG9zYWxfaWQAAAAABAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAQhEZWxlZ2F0ZSB2b3RpbmcgcG93ZXIgdG8gYW5vdGhlciBhZGRyZXNzCgojIEFyZ3VtZW50cwoqIGBlbnZgIC0gVGhlIGVudmlyb25tZW50IG9iamVjdAoqIGBkZWxlZ2F0b3JgIC0gVGhlIGFkZHJlc3MgZGVsZWdhdGluZyB0aGVpciB2b3RpbmcgcG93ZXIKKiBgZGVsZWdhdGVlYCAtIFRoZSBhZGRyZXNzIHJlY2VpdmluZyB0aGUgZGVsZWdhdGVkIHZvdGluZyBwb3dlcgoKIyBSZXR1cm5zCiogYFJlc3VsdDwoKSwgRXJyb3I+YCAtIFN1Y2Nlc3Mgb3IgYW4gZXJyb3IAAAANZGVsZWdhdGVfdm90ZQAAAAAAAAIAAAAAAAAACWRlbGVnYXRvcgAAAAAAABMAAAAAAAAACWRlbGVnYXRlZQAAAAAAABMAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAPZHZXQgdGhlIHZvdGluZyB3ZWlnaHQgb2YgYW4gYWRkcmVzcyBmb3IgYSBzcGVjaWZpYyBwcm9wb3NhbAoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBlbnZpcm9ubWVudCBvYmplY3QKKiBgdm90ZXJgIC0gVGhlIGFkZHJlc3MgdG8gY2hlY2sKKiBgcHJvcG9zYWxfaWRgIC0gVGhlIElEIG9mIHRoZSBwcm9wb3NhbAoKIyBSZXR1cm5zCiogYFJlc3VsdDxpMTI4LCBFcnJvcj5gIC0gVGhlIHZvdGluZyB3ZWlnaHQgb3IgYW4gZXJyb3IAAAAAAA9nZXRfdm90ZV93ZWlnaHQAAAAAAgAAAAAAAAAFdm90ZXIAAAAAAAATAAAAAAAAAAtwcm9wb3NhbF9pZAAAAAAEAAAAAQAAA+kAAAALAAAAAw==",
        "AAAAAAAAAO5FeGVjdXRlIGEgcGFzc2VkIHByb3Bvc2FsJ3MgYWN0aW9ucwoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBlbnZpcm9ubWVudCBvYmplY3QKKiBgZXhlY3V0b3JgIC0gVGhlIGFkZHJlc3MgZXhlY3V0aW5nIHRoZSBwcm9wb3NhbAoqIGBwcm9wb3NhbF9pZGAgLSBUaGUgSUQgb2YgdGhlIHByb3Bvc2FsIHRvIGV4ZWN1dGUKCiMgUmV0dXJucwoqIGBSZXN1bHQ8KCksIEVycm9yPmAgLSBTdWNjZXNzIG9yIGFuIGVycm9yAAAAAAAQZXhlY3V0ZV9wcm9wb3NhbAAAAAIAAAAAAAAACGV4ZWN1dG9yAAAAEwAAAAAAAAALcHJvcG9zYWxfaWQAAAAABAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAMZHZXQgYSBwcm9wb3NhbCBieSBJRAoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBlbnZpcm9ubWVudCBvYmplY3QKKiBgcHJvcG9zYWxfaWRgIC0gVGhlIElEIG9mIHRoZSBwcm9wb3NhbCB0byByZXRyaWV2ZQoKIyBSZXR1cm5zCiogYFJlc3VsdDxQcm9wb3NhbCwgRXJyb3I+YCAtIFRoZSBwcm9wb3NhbCBvciBhbiBlcnJvciBpZiBub3QgZm91bmQAAAAAAAxnZXRfcHJvcG9zYWwAAAABAAAAAAAAAAtwcm9wb3NhbF9pZAAAAAAEAAAAAQAAA+kAAAfQAAAACFByb3Bvc2FsAAAAAw==",
        "AAAAAAAAAH5HZXQgYWxsIGFjdGl2ZSBwcm9wb3NhbHMKCiMgQXJndW1lbnRzCiogYGVudmAgLSBUaGUgZW52aXJvbm1lbnQgb2JqZWN0CgojIFJldHVybnMKKiBgVmVjPHUzMj5gIC0gQSBsaXN0IG9mIGFjdGl2ZSBwcm9wb3NhbCBJRHMAAAAAABRnZXRfYWN0aXZlX3Byb3Bvc2FscwAAAAAAAAABAAAD6gAAAAQ=",
        "AAAAAAAAAKNHZXQgYWxsIHByb3Bvc2FscyB0aGF0IGFyZSBwYXNzZWQgYW5kIHJlYWR5IGZvciBleGVjdXRpb24KCiMgQXJndW1lbnRzCiogYGVudmAgLSBUaGUgZW52aXJvbm1lbnQgb2JqZWN0CgojIFJldHVybnMKKiBgVmVjPHUzMj5gIC0gQSBsaXN0IG9mIGV4ZWN1dGFibGUgcHJvcG9zYWwgSURzAAAAABhnZXRfZXhlY3V0YWJsZV9wcm9wb3NhbHMAAAAAAAAAAQAAA+oAAAAE",
        "AAAAAAAAABpHZXQgdG90YWwgbnVtYmVyIG9mIHZvdGVycwAAAAAAGWdldF9wcm9wb3NhbF92b3RlcnNfY291bnQAAAAAAAABAAAAAAAAAAtwcm9wb3NhbF9pZAAAAAAEAAAAAQAAAAo=",
        "AAAAAwAAAAAAAAAAAAAADlByb3Bvc2FsU3RhdHVzAAAAAAAHAAAAAAAAAAVEcmFmdAAAAAAAAAAAAAAAAAAABkFjdGl2ZQAAAAAAAQAAAAAAAAAGUGFzc2VkAAAAAAACAAAAAAAAAAhSZWplY3RlZAAAAAMAAAAAAAAACEV4ZWN1dGVkAAAABAAAAAAAAAAIQ2FuY2VsZWQAAAAFAAAAAAAAAAZWZXRvZWQAAAAAAAY=",
        "AAAAAwAAAAAAAAAAAAAADFByb3Bvc2FsVHlwZQAAAAYAAAAAAAAADkZlYXR1cmVSZXF1ZXN0AAAAAAAAAAAAAAAAAAxQb2xpY3lDaGFuZ2UAAAABAAAAAAAAAA9QYXJhbWV0ZXJDaGFuZ2UAAAAAAgAAAAAAAAAPQ29udHJhY3RVcGdyYWRlAAAAAAMAAAAAAAAAD0VtZXJnZW5jeUFjdGlvbgAAAAAEAAAAAAAAAA5FY29ub21pY0NoYW5nZQAAAAAABQ==",
        "AAAAAQAAAAAAAAAAAAAACFByb3Bvc2FsAAAACwAAAAAAAAAHYWN0aW9ucwAAAAPqAAAH0AAAAAZBY3Rpb24AAAAAAAAAAAAMYWN0aXZhdGVkX2F0AAAABgAAAAAAAAAKY3JlYXRlZF9hdAAAAAAABgAAAAAAAAALZGVzY3JpcHRpb24AAAAAEQAAAAAAAAACaWQAAAAAAAQAAAAAAAAADW1ldGFkYXRhX2hhc2gAAAAAAAAQAAAAAAAAAA1wcm9wb3NhbF90eXBlAAAAAAAH0AAAAAxQcm9wb3NhbFR5cGUAAAAAAAAACHByb3Bvc2VyAAAAEwAAAAAAAAAGc3RhdHVzAAAAAAfQAAAADlByb3Bvc2FsU3RhdHVzAAAAAAAAAAAABXRpdGxlAAAAAAAAEQAAAAAAAAANdm90aW5nX2NvbmZpZwAAAAAAB9AAAAAMVm90aW5nQ29uZmln",
        "AAAAAQAAAAAAAAAAAAAAFFByb3Bvc2FsUmVxdWlyZW1lbnRzAAAABAAAAAAAAAAPY29vbGRvd25fcGVyaW9kAAAAAAYAAAAAAAAAEG1heF92b3RpbmdfcG93ZXIAAAALAAAAAAAAAA5wcm9wb3NhbF9saW1pdAAAAAAABAAAAAAAAAAOcmVxdWlyZWRfc3Rha2UAAAAAAAs=",
        "AAAAAQAAAAAAAAAAAAAABFZvdGUAAAAEAAAAAAAAAAdzdXBwb3J0AAAAAAEAAAAAAAAACXRpbWVzdGFtcAAAAAAAAAYAAAAAAAAABXZvdGVyAAAAAAAAEwAAAAAAAAAGd2VpZ2h0AAAAAAAL",
        "AAAAAQAAAAAAAAAAAAAADFZvdGluZ0NvbmZpZwAAAAUAAAAAAAAACGR1cmF0aW9uAAAABgAAAAAAAAAPZXhlY3V0aW9uX2RlbGF5AAAAAAYAAAAAAAAAFG9uZV9hZGRyZXNzX29uZV92b3RlAAAAAQAAAAAAAAAGcXVvcnVtAAAAAAAKAAAAAAAAAAl0aHJlc2hvbGQAAAAAAAAK",
        "AAAAAQAAAAAAAAAAAAAADldlaWdodFNuYXBzaG90AAAAAAACAAAAAAAAAAtwcm9wb3NhbF9pZAAAAAAEAAAAAAAAAAtzbmFwc2hvdF9hdAAAAAAG",
        "AAAAAQAAAAAAAAAAAAAACU1vZGVyYXRvcgAAAAAAAAIAAAAAAAAAB2FkZHJlc3MAAAAAEwAAAAAAAAAMYXBwb2ludGVkX2F0AAAABg==",
        "AAAAAgAAAAAAAAAAAAAABkFjdGlvbgAAAAAABgAAAAEAAAAAAAAAGlVwZGF0ZVByb3Bvc2FsUmVxdWlyZW1lbnRzAAAAAAABAAAH0AAAABRQcm9wb3NhbFJlcXVpcmVtZW50cwAAAAEAAAAAAAAAEEFwcG9pbnRNb2RlcmF0b3IAAAABAAAAEwAAAAEAAAAAAAAAD1JlbW92ZU1vZGVyYXRvcgAAAAABAAAAEwAAAAEAAAAAAAAAEVVwZGF0ZVJld2FyZFJhdGVzAAAAAAAAAQAAB9AAAAALUmV3YXJkUmF0ZXMAAAAAAQAAAAAAAAAXVXBkYXRlTGV2ZWxSZXF1aXJlbWVudHMAAAAAAQAAB9AAAAARTGV2ZWxSZXF1aXJlbWVudHMAAAAAAAABAAAAAAAAABdVcGRhdGVBdWN0aW9uQ29uZGl0aW9ucwAAAAACAAAABAAAB9AAAAARQXVjdGlvbkNvbmRpdGlvbnMAAAA=",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAAGwAAAAAAAAASQWxyZWFkeUluaXRpYWxpemVkAAAAAAABAAAAAAAAAA5Ob3RJbml0aWFsaXplZAAAAAAAAgAAAAAAAAAMVW5hdXRob3JpemVkAAAAAwAAAAAAAAAQUHJvcG9zYWxOb3RGb3VuZAAAAGUAAAAAAAAAFUludmFsaWRQcm9wb3NhbFN0YXR1cwAAAAAAAGYAAAAAAAAAFE5vdEVsaWdpYmxlVG9Qcm9wb3NlAAAAZwAAAAAAAAASUHJvcG9zYWxJbkNvb2xkb3duAAAAAABoAAAAAAAAABFJbnN1ZmZpY2llbnRTdGFrZQAAAAAAAGkAAAAAAAAAE0ludmFsaWRQcm9wb3NhbFR5cGUAAAAAagAAAAAAAAAUUHJvcG9zYWxMaW1pdFJlYWNoZWQAAABrAAAAAAAAABRJbnZhbGlkUHJvcG9zYWxJbnB1dAAAAGwAAAAAAAAAEVByb3Bvc2FsTm90QWN0aXZlAAAAAAAAyQAAAAAAAAAMQWxyZWFkeVZvdGVkAAAAygAAAAAAAAANTm9Wb3RpbmdQb3dlcgAAAAAAAMsAAAAAAAAAE0ludmFsaWRWb3RpbmdQZXJpb2QAAAAAzAAAAAAAAAARSW52YWxpZERlbGVnYXRpb24AAAAAAAEtAAAAAAAAABhTZWxmRGVsZWdhdGlvbk5vdEFsbG93ZWQAAAEuAAAAAAAAABVQcm9wb3NhbE5vdEV4ZWN1dGFibGUAAAAAAAGRAAAAAAAAAA9FeGVjdXRpb25GYWlsZWQAAAABkgAAAAAAAAAURXhlY3V0aW9uRGVsYXlOb3RNZXQAAAGTAAAAAAAAAA1JbnZhbGlkQWN0aW9uAAAAAAABlAAAAAAAAAALTm90VmVyaWZpZWQAAAAB9QAAAAAAAAAPVXNlckxldmVsTm90U2V0AAAAAfYAAAAAAAAAGUluc3VmZmljaWVudFJlZmVycmFsTGV2ZWwAAAAAAAH3AAAAAAAAABFNb2RlcmF0b3JOb3RGb3VuZAAAAAAAAlkAAAAAAAAAEEFscmVhZHlNb2RlcmF0b3IAAAJaAAAAAAAAABJDb250cmFjdENhbGxGYWlsZWQAAAAAAr0=",
        "AAAAAQAAAAAAAAAAAAAAC1Jld2FyZFJhdGVzAAAAAAMAAAAAAAAACWdvbGRfcmF0ZQAAAAAAAAsAAAAAAAAADXBsYXRpbnVtX3JhdGUAAAAAAAALAAAAAAAAAAtzaWx2ZXJfcmF0ZQAAAAAL",
        "AAAAAQAAAAAAAAAAAAAADUxldmVsQ3JpdGVyaWEAAAAAAAADAAAAAAAAABlyZXF1aXJlZF9kaXJlY3RfcmVmZXJyYWxzAAAAAAAABAAAAAAAAAAScmVxdWlyZWRfdGVhbV9zaXplAAAAAAAEAAAAAAAAABZyZXF1aXJlZF90b3RhbF9yZXdhcmRzAAAAAAAL",
        "AAAAAQAAAAAAAAAAAAAAEUxldmVsUmVxdWlyZW1lbnRzAAAAAAAAAwAAAAAAAAAEZ29sZAAAB9AAAAANTGV2ZWxDcml0ZXJpYQAAAAAAAAAAAAAIcGxhdGludW0AAAfQAAAADUxldmVsQ3JpdGVyaWEAAAAAAAAAAAAABnNpbHZlcgAAAAAH0AAAAA1MZXZlbENyaXRlcmlhAAAA",
        "AAAAAgAAAAAAAAAAAAAACVVzZXJMZXZlbAAAAAAAAAQAAAAAAAAAAAAAAAVCYXNpYwAAAAAAAAAAAAAAAAAABlNpbHZlcgAAAAAAAAAAAAAAAAAER29sZAAAAAAAAAAAAAAACFBsYXRpbnVt",
        "AAAAAQAAAAAAAAAAAAAAEUF1Y3Rpb25Db25kaXRpb25zAAAAAAAACQAAAAAAAAAMYXVjdGlvbl90eXBlAAAH0AAAAAtBdWN0aW9uVHlwZQAAAAAAAAAACGVuZF90aW1lAAAABgAAAAAAAAAMb25fYmlkX2NvdW50AAAD6AAAAAQAAAAAAAAAGG9uX2ZpeGVkX3NlcXVlbmNlX251bWJlcgAAA+gAAAAEAAAAAAAAABVvbl9pbmFjdGl2aXR5X3NlY29uZHMAAAAAAAPoAAAABgAAAAAAAAAXb25fbWF4aW11bV9wYXJ0aWNpcGFudHMAAAAD6AAAAAQAAAAAAAAAF29uX21pbmltdW1fcGFydGljaXBhbnRzAAAAA+gAAAAEAAAAAAAAAA9vbl90YXJnZXRfcHJpY2UAAAAD6AAAAAsAAAAAAAAADnN0YXJ0aW5nX3ByaWNlAAAAAAAL",
        "AAAAAgAAAAAAAAAAAAAAC0F1Y3Rpb25UeXBlAAAAAAMAAAAAAAAAAAAAAAdSZWd1bGFyAAAAAAAAAAAAAAAAB1JldmVyc2UAAAAAAQAAAAAAAAAFRHV0Y2gAAAAAAAABAAAH0AAAABBEdXRjaEF1Y3Rpb25EYXRh",
        "AAAAAQAAAAAAAAAAAAAAEER1dGNoQXVjdGlvbkRhdGEAAAABAAAAAAAAAAtmbG9vcl9wcmljZQAAAAAL" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<Result<void>>,
        create_proposal: this.txFromJSON<Result<u32>>,
        activate_proposal: this.txFromJSON<Result<void>>,
        cancel_proposal: this.txFromJSON<Result<void>>,
        veto_proposal: this.txFromJSON<Result<void>>,
        mark_passed: this.txFromJSON<Result<void>>,
        mark_rejected: this.txFromJSON<Result<void>>,
        mark_executed: this.txFromJSON<Result<void>>,
        cast_vote: this.txFromJSON<Result<void>>,
        take_snapshot: this.txFromJSON<Result<void>>,
        delegate_vote: this.txFromJSON<Result<void>>,
        get_vote_weight: this.txFromJSON<Result<i128>>,
        execute_proposal: this.txFromJSON<Result<void>>,
        get_proposal: this.txFromJSON<Result<Proposal>>,
        get_active_proposals: this.txFromJSON<Array<u32>>,
        get_executable_proposals: this.txFromJSON<Array<u32>>,
        get_proposal_voters_count: this.txFromJSON<u128>
  }
}
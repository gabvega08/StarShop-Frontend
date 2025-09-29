import { Buffer } from "buffer";
import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, MethodOptions, Result } from '@stellar/stellar-sdk/contract';
import type { u32, u64, u128, i128, Option } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CAXIUU3GKDXIFVLKYHMHIQ5TRHBJOLMTSRM2DABN4ITIURMPM5JEWL5Z";
    };
};
export declare enum ProposalStatus {
    Draft = 0,
    Active = 1,
    Passed = 2,
    Rejected = 3,
    Executed = 4,
    Canceled = 5,
    Vetoed = 6
}
export declare enum ProposalType {
    FeatureRequest = 0,
    PolicyChange = 1,
    ParameterChange = 2,
    ContractUpgrade = 3,
    EmergencyAction = 4,
    EconomicChange = 5
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
export type Action = {
    tag: "UpdateProposalRequirements";
    values: readonly [ProposalRequirements];
} | {
    tag: "AppointModerator";
    values: readonly [string];
} | {
    tag: "RemoveModerator";
    values: readonly [string];
} | {
    tag: "UpdateRewardRates";
    values: readonly [RewardRates];
} | {
    tag: "UpdateLevelRequirements";
    values: readonly [LevelRequirements];
} | {
    tag: "UpdateAuctionConditions";
    values: readonly [u32, AuctionConditions];
};
export declare const Errors: {
    1: {
        message: string;
    };
    2: {
        message: string;
    };
    3: {
        message: string;
    };
    101: {
        message: string;
    };
    102: {
        message: string;
    };
    103: {
        message: string;
    };
    104: {
        message: string;
    };
    105: {
        message: string;
    };
    106: {
        message: string;
    };
    107: {
        message: string;
    };
    108: {
        message: string;
    };
    201: {
        message: string;
    };
    202: {
        message: string;
    };
    203: {
        message: string;
    };
    204: {
        message: string;
    };
    301: {
        message: string;
    };
    302: {
        message: string;
    };
    401: {
        message: string;
    };
    402: {
        message: string;
    };
    403: {
        message: string;
    };
    404: {
        message: string;
    };
    501: {
        message: string;
    };
    502: {
        message: string;
    };
    503: {
        message: string;
    };
    601: {
        message: string;
    };
    602: {
        message: string;
    };
    701: {
        message: string;
    };
};
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
export type UserLevel = {
    tag: "Basic";
    values: void;
} | {
    tag: "Silver";
    values: void;
} | {
    tag: "Gold";
    values: void;
} | {
    tag: "Platinum";
    values: void;
};
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
export type AuctionType = {
    tag: "Regular";
    values: void;
} | {
    tag: "Reverse";
    values: void;
} | {
    tag: "Dutch";
    values: readonly [DutchAuctionData];
};
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
    initialize: ({ admin, token, referral_contract, auction_contract, config }: {
        admin: string;
        token: string;
        referral_contract: string;
        auction_contract: string;
        config: VotingConfig;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<void>>>;
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
    create_proposal: ({ proposer, title, description, metadata_hash, proposal_type, actions, voting_config }: {
        proposer: string;
        title: string;
        description: string;
        metadata_hash: string;
        proposal_type: ProposalType;
        actions: Array<Action>;
        voting_config: VotingConfig;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<u32>>>;
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
    activate_proposal: ({ caller, proposal_id }: {
        caller: string;
        proposal_id: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<void>>>;
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
    cancel_proposal: ({ caller, proposal_id }: {
        caller: string;
        proposal_id: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<void>>>;
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
    veto_proposal: ({ moderator, proposal_id }: {
        moderator: string;
        proposal_id: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<void>>>;
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
    mark_passed: ({ caller, proposal_id }: {
        caller: string;
        proposal_id: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<void>>>;
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
    mark_rejected: ({ caller, proposal_id }: {
        caller: string;
        proposal_id: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<void>>>;
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
    mark_executed: ({ caller, proposal_id }: {
        caller: string;
        proposal_id: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<void>>>;
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
    cast_vote: ({ voter, proposal_id, support }: {
        voter: string;
        proposal_id: u32;
        support: boolean;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<void>>>;
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
    take_snapshot: ({ proposal_id }: {
        proposal_id: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<void>>>;
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
    delegate_vote: ({ delegator, delegatee }: {
        delegator: string;
        delegatee: string;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<void>>>;
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
    get_vote_weight: ({ voter, proposal_id }: {
        voter: string;
        proposal_id: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<i128>>>;
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
    execute_proposal: ({ executor, proposal_id }: {
        executor: string;
        proposal_id: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<void>>>;
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
    get_proposal: ({ proposal_id }: {
        proposal_id: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<Proposal>>>;
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
    }) => Promise<AssembledTransaction<Array<u32>>>;
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
    }) => Promise<AssembledTransaction<Array<u32>>>;
    /**
     * Construct and simulate a get_proposal_voters_count transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Get total number of voters
     */
    get_proposal_voters_count: ({ proposal_id }: {
        proposal_id: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<u128>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    static deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions & Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
    }): Promise<AssembledTransaction<T>>;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        initialize: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        create_proposal: (json: string) => AssembledTransaction<Result<number, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        activate_proposal: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        cancel_proposal: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        veto_proposal: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        mark_passed: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        mark_rejected: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        mark_executed: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        cast_vote: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        take_snapshot: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        delegate_vote: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        get_vote_weight: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        execute_proposal: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        get_proposal: (json: string) => AssembledTransaction<Result<Proposal, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        get_active_proposals: (json: string) => AssembledTransaction<number[]>;
        get_executable_proposals: (json: string) => AssembledTransaction<number[]>;
        get_proposal_voters_count: (json: string) => AssembledTransaction<bigint>;
    };
}

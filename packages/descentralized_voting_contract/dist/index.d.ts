import { Buffer } from "buffer";
import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, MethodOptions, Result } from '@stellar/stellar-sdk/contract';
import type { u32, u64, u128, i128 } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CDPXV6XUA52PQMISIHDXY6RK5V7S33J4E7SFIYD7Y3GGB5IMVBRKSKTN";
    };
};
export type DataKey = {
    tag: "Escrow";
    values: readonly [string];
} | {
    tag: "Balance";
    values: readonly [string];
} | {
    tag: "Allowance";
    values: readonly [AllowanceDataKey];
} | {
    tag: "Arbitrator";
    values: void;
} | {
    tag: "DisputedPayments";
    values: void;
} | {
    tag: "ResolvedDisputes";
    values: void;
} | {
    tag: "SellerRegId";
    values: readonly [string];
} | {
    tag: "PaymentCounter";
    values: void;
};
export declare const PaymentEscrowError: {
    1: {
        message: string;
    };
    2: {
        message: string;
    };
    3: {
        message: string;
    };
    4: {
        message: string;
    };
    5: {
        message: string;
    };
    6: {
        message: string;
    };
    7: {
        message: string;
    };
    8: {
        message: string;
    };
    9: {
        message: string;
    };
    10: {
        message: string;
    };
    11: {
        message: string;
    };
    12: {
        message: string;
    };
    13: {
        message: string;
    };
    14: {
        message: string;
    };
    15: {
        message: string;
    };
    16: {
        message: string;
    };
    17: {
        message: string;
    };
    18: {
        message: string;
    };
    19: {
        message: string;
    };
};
export type PaymentStatus = {
    tag: "Pending";
    values: void;
} | {
    tag: "Delivered";
    values: void;
} | {
    tag: "Completed";
    values: void;
} | {
    tag: "Disputed";
    values: void;
} | {
    tag: "Refunded";
    values: void;
} | {
    tag: "Expired";
    values: void;
};
export declare enum DisputeDecision {
    RefundBuyer = 0,
    PaySeller = 1
}
export interface DisputeEvent {
    initiator: string;
    order_id: u128;
    reason: string;
}
export interface DisputeResolvedEvent {
    admin: string;
    order_id: u128;
    resolution: DisputeDecision;
}
export interface Payment {
    amount: i128;
    buyer: string;
    created_at: u64;
    description: string;
    dispute_deadline: u64;
    expiry: u64;
    id: u128;
    seller: string;
    status: PaymentStatus;
    token: string;
}
export interface AllowanceValue {
    amount: i128;
    expiration_ledger: u32;
}
export interface AllowanceDataKey {
    from: string;
    spender: string;
}
export interface DeliveryDetails {
    buyer: string;
    created_at: u64;
    description: string;
    expiry: u64;
    payment_id: u128;
    seller: string;
    status: PaymentStatus;
}
export interface Client {
    /**
     * Construct and simulate a init transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Initialize the payment escrow contract with an initial arbitrator
     *
     * This function sets up the contract with the first arbitrator who will have
     * the authority to add additional arbitrators and resolve disputes. The contract
     * can only be initialized once to prevent re-initialization attacks.
     *
     * # Arguments
     * * `env` - The Soroban environment
     * * `arbitrator` - The address of the initial arbitrator
     *
     * # Returns
     * * `Ok(())` - Contract successfully initialized
     * * `Err(PaymentEscrowError::AlreadyInitialized)` - Contract already initialized
     *
     * # Security Considerations
     * - Prevents re-initialization to maintain contract state integrity
     * - Initial arbitrator has full authority to manage the system
     * - Arbitrator address should be carefully chosen for trustworthiness
     */
    init: ({ arbitrator }: {
        arbitrator: string;
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
     * Construct and simulate a version transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Get the current version of the contract
     *
     * This function returns the contract version number, which is useful for
     * tracking contract upgrades and ensuring compatibility with frontend applications.
     * The version number should be incremented when the contract is upgraded.
     *
     * # Returns
     * * `u32` - The current contract version
     */
    version: (options?: {
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
    }) => Promise<AssembledTransaction<u32>>;
    /**
     * Construct and simulate a upgrade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Upgrade the contract with new WASM code
     *
     * This function allows the contract to be upgraded with new WASM code while
     * preserving all existing state. The upgrade requires authorization from all
     * current arbitrators to ensure security and prevent unauthorized upgrades.
     *
     * # Arguments
     * * `e` - The Soroban environment
     * * `new_wasm_hash` - The hash of the new WASM code to deploy
     *
     * # Security Features
     * - Requires authorization from all arbitrators (consensus mechanism)
     * - Preserves all existing contract state during upgrade
     * - Prevents unauthorized upgrades that could compromise the system
     *
     * # Upgrade Process
     * 1. All arbitrators must authorize the upgrade
     * 2. New WASM code is deployed to the contract
     * 3. All existing state (payments, arbitrators, etc.) is preserved
     * 4. Contract continues to function with new code
     *
     * # Important Notes
     * - The new WASM must be compatible with existing state structure
     * - All arbitrators must be available to authorize the upgrade
     * - Upgrade should be thoroughly tested before deployment
     */
    upgrade: ({ new_wasm_hash }: {
        new_wasm_hash: Buffer;
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
     * Construct and simulate a get_payment_count transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Retrieves the total count of payments created in the system
     *
     * # Arguments
     * * `env` - The Soroban environment reference
     *
     * # Returns
     * * `u128` - The total number of payments created
     *
     * # Purpose
     * * Provides system statistics for monitoring and analytics
     * * Used internally for generating unique payment IDs
     * * Enables external systems to track payment volume
     */
    get_payment_count: (options?: {
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
    /**
     * Construct and simulate a create_payment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Creates a new escrow payment between a buyer and seller
     *
     * # Arguments
     * * `env` - The Soroban environment
     * * `buyer` - The address of the buyer (payer)
     * * `seller` - The address of the seller (recipient)
     * * `amount` - The payment amount in token units
     * * `token` - The token contract address for the payment
     * * `expiry_days` - Number of days until payment expires (0 = 30 days default)
     * * `description` - Human-readable description of the payment
     *
     * # Returns
     * * `Result<u128, PaymentEscrowError>` - Payment ID on success, error on failure
     *
     * # Business Logic
     * * Transfers funds from buyer to escrow contract
     * * Creates unique payment ID and stores payment details
     * * Sets up dispute deadline based on expiry period
     * * Validates all inputs and buyer authorization
     *
     * # Security
     * * Requires buyer authentication
     * * Validates buyer has sufficient funds
     * * Prevents self-payment (buyer != seller)
     * * Ensures positive payment amounts
     */
    create_payment: ({ buyer, seller, amount, token, expiry_days, description }: {
        buyer: string;
        seller: string;
        amount: i128;
        token: string;
        expiry_days: u32;
        description: string;
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
    }) => Promise<AssembledTransaction<Result<u128>>>;
    /**
     * Construct and simulate a get_a_payment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Retrieves a specific payment by its unique identifier
     *
     * # Arguments
     * * `env` - The Soroban environment
     * * `payment_id` - The unique identifier of the payment to retrieve
     *
     * # Returns
     * * `Result<Payment, PaymentEscrowError>` - Payment details or error if not found
     *
     * # Purpose
     * * Enables payment status checking and details retrieval
     * * Supports dispute resolution and claim verification
     * * Provides transparency for all payment participants
     */
    get_a_payment: ({ payment_id }: {
        payment_id: u128;
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
    }) => Promise<AssembledTransaction<Result<Payment>>>;
    /**
     * Construct and simulate a buyer_confirm_delivery transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Allows the buyer to confirm delivery and release funds to the seller
     *
     * # Arguments
     * * `env` - The Soroban environment
     * * `payment_id` - The unique identifier of the payment to confirm
     * * `buyer` - The address of the buyer confirming delivery
     *
     * # Returns
     * * `Result<(), PaymentEscrowError>` - Success or error
     *
     * # Business Logic
     * * Only works after seller has confirmed delivery (status = Delivered)
     * * Transfers funds from escrow to seller
     * * Marks payment as Completed
     * * Final step in successful escrow completion
     *
     * # Security
     * * Requires buyer authentication
     * * Validates payment status and authorization
     * * Prevents confirmation of disputed payments
     * * Ensures only buyer can confirm delivery
     */
    buyer_confirm_delivery: ({ payment_id, buyer }: {
        payment_id: u128;
        buyer: string;
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
     * Construct and simulate a seller_confirm_delivery transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Allows the seller to confirm that delivery has been made
     *
     * # Arguments
     * * `env` - The Soroban environment
     * * `payment_id` - The unique identifier of the payment to mark as delivered
     * * `seller` - The address of the seller confirming delivery
     *
     * # Returns
     * * `Result<(), PaymentEscrowError>` - Success or error
     *
     * # Business Logic
     * * Changes payment status from Pending to Delivered
     * * First step in the delivery confirmation process
     * * Enables buyer to then confirm and release funds
     *
     * # Security
     * * Requires seller authentication
     * * Validates payment status and authorization
     * * Prevents confirmation of disputed payments
     * * Ensures only seller can mark as delivered
     */
    seller_confirm_delivery: ({ payment_id, seller }: {
        payment_id: u128;
        seller: string;
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
     * Construct and simulate a get_delivery_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Retrieves the current delivery status of a payment
     *
     * # Arguments
     * * `env` - The Soroban environment
     * * `payment_id` - The unique identifier of the payment
     *
     * # Returns
     * * `Result<PaymentStatus, PaymentEscrowError>` - Current payment status or error
     *
     * # Purpose
     * * Enables status checking for payment participants
     * * Supports UI/UX for showing current payment state
     * * Helps determine next available actions
     */
    get_delivery_status: ({ payment_id }: {
        payment_id: u128;
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
    }) => Promise<AssembledTransaction<Result<PaymentStatus>>>;
    /**
     * Construct and simulate a get_delivery_details transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Retrieves comprehensive delivery details for a payment
     *
     * # Arguments
     * * `env` - The Soroban environment
     * * `payment_id` - The unique identifier of the payment
     *
     * # Returns
     * * `Result<DeliveryDetails, PaymentEscrowError>` - Delivery details or error
     *
     * # Purpose
     * * Provides complete delivery information for transparency
     * * Enables detailed payment tracking and reporting
     * * Supports dispute resolution and claim verification
     */
    get_delivery_details: ({ payment_id }: {
        payment_id: u128;
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
    }) => Promise<AssembledTransaction<Result<DeliveryDetails>>>;
    /**
     * Construct and simulate a dispute_payment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Allows buyers or sellers to initiate a dispute for an escrow payment
     *
     * # Arguments
     * * `env` - The Soroban environment
     * * `payment_id` - The unique identifier of the payment to dispute
     * * `disputer` - The address initiating the dispute (must be buyer or seller)
     * * `reason` - Human-readable reason for the dispute
     *
     * # Returns
     * * `Result<(), PaymentEscrowError>` - Success or error
     *
     * # Business Logic
     * * Locks funds in escrow until arbitrator resolution
     * * Records dispute details for transparency
     * * Prevents further payment actions until resolved
     * * Only works within dispute deadline period
     *
     * # Security
     * * Requires disputer authentication
     * * Validates disputer is buyer or seller
     * * Prevents duplicate disputes
     * * Enforces dispute deadline
     * * Prevents disputes on completed/expired payments
     */
    dispute_payment: ({ payment_id, disputer, reason }: {
        payment_id: u128;
        disputer: string;
        reason: string;
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
     * Construct and simulate a resolve_dispute transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Allows authorized arbitrators to resolve disputes and distribute funds
     *
     * # Arguments
     * * `env` - The Soroban environment
     * * `payment_id` - The unique identifier of the disputed payment
     * * `arbitrator` - The address of the arbitrator resolving the dispute
     * * `decision` - The arbitrator's decision (PaySeller or RefundBuyer)
     * * `reason` - Human-readable reason for the decision
     *
     * # Returns
     * * `Result<(), PaymentEscrowError>` - Success or error
     *
     * # Business Logic
     * * Transfers funds based on arbitrator decision
     * * Marks payment as Completed (seller wins) or Refunded (buyer wins)
     * * Records resolution details for transparency
     * * Finalizes the dispute resolution process
     *
     * # Security
     * * Requires arbitrator authentication
     * * Validates arbitrator authorization
     * * Ensures payment is in disputed status
     * * Requires non-empty resolution reason
     * * Prevents unauthorized dispute resolution
     */
    resolve_dispute: ({ payment_id, arbitrator, decision, reason }: {
        payment_id: u128;
        arbitrator: string;
        decision: DisputeDecision;
        reason: string;
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
     * Construct and simulate a claim_payment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Allows the buyer to claim a refund for an expired payment
     *
     * # Arguments
     * * `env` - The Soroban environment
     * * `payment_id` - The unique identifier of the payment to claim
     * * `claimer` - The address attempting to claim the payment (must be the buyer)
     *
     * # Returns
     * * `Result<(), PaymentEscrowError>` - Success or error
     *
     * # Business Logic
     * * Only expired payments can be claimed
     * * Only the buyer can claim expired payments
     * * Disputed payments cannot be claimed (must be resolved first)
     * * Claims transfer funds back to the buyer and mark payment as Refunded
     *
     * # Security
     * * Requires authentication from the claimer
     * * Validates payment expiration
     * * Prevents claiming of disputed payments
     * * Ensures only the buyer can claim
     */
    claim_payment: ({ payment_id, claimer }: {
        payment_id: u128;
        claimer: string;
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
     * Construct and simulate a add_arbitrator transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Adds a new arbitrator to the system
     *
     * # Arguments
     * * `env` - The Soroban environment
     * * `arbitrator` - The existing arbitrator who is authorizing this transaction
     * * `new_arbitrator` - The new arbitrator address to be added
     *
     * # Returns
     * * `Result<(), PaymentEscrowError>` - Success or error
     *
     * # Security
     * * Only existing arbitrators can add new arbitrators
     * * Prevents duplicate arbitrators
     * * Requires authentication from the existing arbitrator
     */
    add_arbitrator: ({ arbitrator, new_arbitrator }: {
        arbitrator: string;
        new_arbitrator: string;
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
     * Construct and simulate a get_arbitrators transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Retrieves the current list of all authorized arbitrators
     *
     * # Arguments
     * * `env` - The Soroban environment
     *
     * # Returns
     * * `Result<Vec<Address>, PaymentEscrowError>` - List of arbitrator addresses or error
     *
     * # Purpose
     * * Provides transparency about who can resolve disputes
     * * Allows external systems to verify arbitrator authorization
     * * Useful for UI/UX to show available arbitrators
     */
    get_arbitrators: (options?: {
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
    }) => Promise<AssembledTransaction<Result<Array<string>>>>;
    /**
     * Construct and simulate a transfer_arbitrator_rights transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Transfers arbitrator rights from one address to another
     *
     * # Arguments
     * * `env` - The Soroban environment
     * * `old_arbitrator` - The current arbitrator transferring their rights
     * * `new_arbitrator` - The new address to receive arbitrator rights
     *
     * # Returns
     * * `Result<(), PaymentEscrowError>` - Success or error
     *
     * # Security
     * * Only existing arbitrators can transfer their rights
     * * Prevents transferring to existing arbitrators
     * * Requires authentication from the old arbitrator
     *
     * # Use Cases
     * * Key rotation for security
     * * Changing arbitrator addresses
     * * Replacing compromised arbitrator keys
     */
    transfer_arbitrator_rights: ({ old_arbitrator, new_arbitrator }: {
        old_arbitrator: string;
        new_arbitrator: string;
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
        init: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        version: (json: string) => AssembledTransaction<number>;
        upgrade: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        get_payment_count: (json: string) => AssembledTransaction<bigint>;
        create_payment: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        get_a_payment: (json: string) => AssembledTransaction<Result<Payment, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        buyer_confirm_delivery: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        seller_confirm_delivery: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        get_delivery_status: (json: string) => AssembledTransaction<Result<PaymentStatus, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        get_delivery_details: (json: string) => AssembledTransaction<Result<DeliveryDetails, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        dispute_payment: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        resolve_dispute: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        claim_payment: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        add_arbitrator: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        get_arbitrators: (json: string) => AssembledTransaction<Result<string[], import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        transfer_arbitrator_rights: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
    };
}

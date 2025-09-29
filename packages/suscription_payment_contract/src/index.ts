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
    contractId: "CDPXV6XUA52PQMISIHDXY6RK5V7S33J4E7SFIYD7Y3GGB5IMVBRKSKTN",
  }
} as const

export type DataKey = {tag: "Escrow", values: readonly [string]} | {tag: "Balance", values: readonly [string]} | {tag: "Allowance", values: readonly [AllowanceDataKey]} | {tag: "Arbitrator", values: void} | {tag: "DisputedPayments", values: void} | {tag: "ResolvedDisputes", values: void} | {tag: "SellerRegId", values: readonly [string]} | {tag: "PaymentCounter", values: void};

export const PaymentEscrowError = {
  1: {message:"NotInitialized"},
  2: {message:"AlreadyInitialized"},
  3: {message:"UnauthorizedAccess"},
  4: {message:"InsufficientFunds"},
  5: {message:"TransferFailed"},
  6: {message:"InvalidAmount"},
  7: {message:"CannotPaySelf"},
  8: {message:"DepositPaymentFailed"},
  9: {message:"NotFound"},
  10: {message:"NotDelivered"},
  11: {message:"NotCompleted"},
  12: {message:"NotValid"},
  13: {message:"DisputePeriodExpired"},
  14: {message:"AlreadyDisputed"},
  15: {message:"NotArbitrator"},
  16: {message:"NotExpired"},
  17: {message:"NotSeller"},
  18: {message:"ArbitratorAlreadyExists"},
  19: {message:"PaymentDisputed"}
}

export type PaymentStatus = {tag: "Pending", values: void} | {tag: "Delivered", values: void} | {tag: "Completed", values: void} | {tag: "Disputed", values: void} | {tag: "Refunded", values: void} | {tag: "Expired", values: void};

export enum DisputeDecision {
  RefundBuyer = 0,
  PaySeller = 1,
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
  init: ({arbitrator}: {arbitrator: string}, options?: {
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
  }) => Promise<AssembledTransaction<u32>>

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
  }) => Promise<AssembledTransaction<u128>>

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
  create_payment: ({buyer, seller, amount, token, expiry_days, description}: {buyer: string, seller: string, amount: i128, token: string, expiry_days: u32, description: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<u128>>>

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
  get_a_payment: ({payment_id}: {payment_id: u128}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Payment>>>

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
  buyer_confirm_delivery: ({payment_id, buyer}: {payment_id: u128, buyer: string}, options?: {
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
  seller_confirm_delivery: ({payment_id, seller}: {payment_id: u128, seller: string}, options?: {
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
  get_delivery_status: ({payment_id}: {payment_id: u128}, options?: {
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
  }) => Promise<AssembledTransaction<Result<PaymentStatus>>>

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
  get_delivery_details: ({payment_id}: {payment_id: u128}, options?: {
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
  }) => Promise<AssembledTransaction<Result<DeliveryDetails>>>

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
  dispute_payment: ({payment_id, disputer, reason}: {payment_id: u128, disputer: string, reason: string}, options?: {
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
  resolve_dispute: ({payment_id, arbitrator, decision, reason}: {payment_id: u128, arbitrator: string, decision: DisputeDecision, reason: string}, options?: {
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
  claim_payment: ({payment_id, claimer}: {payment_id: u128, claimer: string}, options?: {
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
  add_arbitrator: ({arbitrator, new_arbitrator}: {arbitrator: string, new_arbitrator: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Array<string>>>>

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
  transfer_arbitrator_rights: ({old_arbitrator, new_arbitrator}: {old_arbitrator: string, new_arbitrator: string}, options?: {
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
      new ContractSpec([ "AAAAAAAAAuxJbml0aWFsaXplIHRoZSBwYXltZW50IGVzY3JvdyBjb250cmFjdCB3aXRoIGFuIGluaXRpYWwgYXJiaXRyYXRvcgoKVGhpcyBmdW5jdGlvbiBzZXRzIHVwIHRoZSBjb250cmFjdCB3aXRoIHRoZSBmaXJzdCBhcmJpdHJhdG9yIHdobyB3aWxsIGhhdmUKdGhlIGF1dGhvcml0eSB0byBhZGQgYWRkaXRpb25hbCBhcmJpdHJhdG9ycyBhbmQgcmVzb2x2ZSBkaXNwdXRlcy4gVGhlIGNvbnRyYWN0CmNhbiBvbmx5IGJlIGluaXRpYWxpemVkIG9uY2UgdG8gcHJldmVudCByZS1pbml0aWFsaXphdGlvbiBhdHRhY2tzLgoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBTb3JvYmFuIGVudmlyb25tZW50CiogYGFyYml0cmF0b3JgIC0gVGhlIGFkZHJlc3Mgb2YgdGhlIGluaXRpYWwgYXJiaXRyYXRvcgoKIyBSZXR1cm5zCiogYE9rKCgpKWAgLSBDb250cmFjdCBzdWNjZXNzZnVsbHkgaW5pdGlhbGl6ZWQKKiBgRXJyKFBheW1lbnRFc2Nyb3dFcnJvcjo6QWxyZWFkeUluaXRpYWxpemVkKWAgLSBDb250cmFjdCBhbHJlYWR5IGluaXRpYWxpemVkCgojIFNlY3VyaXR5IENvbnNpZGVyYXRpb25zCi0gUHJldmVudHMgcmUtaW5pdGlhbGl6YXRpb24gdG8gbWFpbnRhaW4gY29udHJhY3Qgc3RhdGUgaW50ZWdyaXR5Ci0gSW5pdGlhbCBhcmJpdHJhdG9yIGhhcyBmdWxsIGF1dGhvcml0eSB0byBtYW5hZ2UgdGhlIHN5c3RlbQotIEFyYml0cmF0b3IgYWRkcmVzcyBzaG91bGQgYmUgY2FyZWZ1bGx5IGNob3NlbiBmb3IgdHJ1c3R3b3J0aGluZXNzAAAABGluaXQAAAABAAAAAAAAAAphcmJpdHJhdG9yAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAASUGF5bWVudEVzY3Jvd0Vycm9yAAA=",
        "AAAAAAAAATtHZXQgdGhlIGN1cnJlbnQgdmVyc2lvbiBvZiB0aGUgY29udHJhY3QKClRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgY29udHJhY3QgdmVyc2lvbiBudW1iZXIsIHdoaWNoIGlzIHVzZWZ1bCBmb3IKdHJhY2tpbmcgY29udHJhY3QgdXBncmFkZXMgYW5kIGVuc3VyaW5nIGNvbXBhdGliaWxpdHkgd2l0aCBmcm9udGVuZCBhcHBsaWNhdGlvbnMuClRoZSB2ZXJzaW9uIG51bWJlciBzaG91bGQgYmUgaW5jcmVtZW50ZWQgd2hlbiB0aGUgY29udHJhY3QgaXMgdXBncmFkZWQuCgojIFJldHVybnMKKiBgdTMyYCAtIFRoZSBjdXJyZW50IGNvbnRyYWN0IHZlcnNpb24AAAAAB3ZlcnNpb24AAAAAAAAAAAEAAAAE",
        "AAAAAAAAA+lVcGdyYWRlIHRoZSBjb250cmFjdCB3aXRoIG5ldyBXQVNNIGNvZGUKClRoaXMgZnVuY3Rpb24gYWxsb3dzIHRoZSBjb250cmFjdCB0byBiZSB1cGdyYWRlZCB3aXRoIG5ldyBXQVNNIGNvZGUgd2hpbGUKcHJlc2VydmluZyBhbGwgZXhpc3Rpbmcgc3RhdGUuIFRoZSB1cGdyYWRlIHJlcXVpcmVzIGF1dGhvcml6YXRpb24gZnJvbSBhbGwKY3VycmVudCBhcmJpdHJhdG9ycyB0byBlbnN1cmUgc2VjdXJpdHkgYW5kIHByZXZlbnQgdW5hdXRob3JpemVkIHVwZ3JhZGVzLgoKIyBBcmd1bWVudHMKKiBgZWAgLSBUaGUgU29yb2JhbiBlbnZpcm9ubWVudAoqIGBuZXdfd2FzbV9oYXNoYCAtIFRoZSBoYXNoIG9mIHRoZSBuZXcgV0FTTSBjb2RlIHRvIGRlcGxveQoKIyBTZWN1cml0eSBGZWF0dXJlcwotIFJlcXVpcmVzIGF1dGhvcml6YXRpb24gZnJvbSBhbGwgYXJiaXRyYXRvcnMgKGNvbnNlbnN1cyBtZWNoYW5pc20pCi0gUHJlc2VydmVzIGFsbCBleGlzdGluZyBjb250cmFjdCBzdGF0ZSBkdXJpbmcgdXBncmFkZQotIFByZXZlbnRzIHVuYXV0aG9yaXplZCB1cGdyYWRlcyB0aGF0IGNvdWxkIGNvbXByb21pc2UgdGhlIHN5c3RlbQoKIyBVcGdyYWRlIFByb2Nlc3MKMS4gQWxsIGFyYml0cmF0b3JzIG11c3QgYXV0aG9yaXplIHRoZSB1cGdyYWRlCjIuIE5ldyBXQVNNIGNvZGUgaXMgZGVwbG95ZWQgdG8gdGhlIGNvbnRyYWN0CjMuIEFsbCBleGlzdGluZyBzdGF0ZSAocGF5bWVudHMsIGFyYml0cmF0b3JzLCBldGMuKSBpcyBwcmVzZXJ2ZWQKNC4gQ29udHJhY3QgY29udGludWVzIHRvIGZ1bmN0aW9uIHdpdGggbmV3IGNvZGUKCiMgSW1wb3J0YW50IE5vdGVzCi0gVGhlIG5ldyBXQVNNIG11c3QgYmUgY29tcGF0aWJsZSB3aXRoIGV4aXN0aW5nIHN0YXRlIHN0cnVjdHVyZQotIEFsbCBhcmJpdHJhdG9ycyBtdXN0IGJlIGF2YWlsYWJsZSB0byBhdXRob3JpemUgdGhlIHVwZ3JhZGUKLSBVcGdyYWRlIHNob3VsZCBiZSB0aG9yb3VnaGx5IHRlc3RlZCBiZWZvcmUgZGVwbG95bWVudAAAAAAAAAd1cGdyYWRlAAAAAAEAAAAAAAAADW5ld193YXNtX2hhc2gAAAAAAAPuAAAAIAAAAAEAAAPpAAAD7QAAAAAAAAfQAAAAElBheW1lbnRFc2Nyb3dFcnJvcgAA",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAACAAAAAEAAAAAAAAABkVzY3JvdwAAAAAAAQAAABAAAAABAAAAAAAAAAdCYWxhbmNlAAAAAAEAAAATAAAAAQAAAAAAAAAJQWxsb3dhbmNlAAAAAAAAAQAAB9AAAAAQQWxsb3dhbmNlRGF0YUtleQAAAAAAAAAAAAAACkFyYml0cmF0b3IAAAAAAAAAAAAAAAAAEERpc3B1dGVkUGF5bWVudHMAAAAAAAAAAAAAABBSZXNvbHZlZERpc3B1dGVzAAAAAQAAAAAAAAALU2VsbGVyUmVnSWQAAAAAAQAAABMAAAAAAAAAAAAAAA5QYXltZW50Q291bnRlcgAA",
        "AAAABAAAAAAAAAAAAAAAElBheW1lbnRFc2Nyb3dFcnJvcgAAAAAAEwAAAAAAAAAOTm90SW5pdGlhbGl6ZWQAAAAAAAEAAAAAAAAAEkFscmVhZHlJbml0aWFsaXplZAAAAAAAAgAAAAAAAAASVW5hdXRob3JpemVkQWNjZXNzAAAAAAADAAAAAAAAABFJbnN1ZmZpY2llbnRGdW5kcwAAAAAAAAQAAAAAAAAADlRyYW5zZmVyRmFpbGVkAAAAAAAFAAAAAAAAAA1JbnZhbGlkQW1vdW50AAAAAAAABgAAAAAAAAANQ2Fubm90UGF5U2VsZgAAAAAAAAcAAAAAAAAAFERlcG9zaXRQYXltZW50RmFpbGVkAAAACAAAAAAAAAAITm90Rm91bmQAAAAJAAAAAAAAAAxOb3REZWxpdmVyZWQAAAAKAAAAAAAAAAxOb3RDb21wbGV0ZWQAAAALAAAAAAAAAAhOb3RWYWxpZAAAAAwAAAAAAAAAFERpc3B1dGVQZXJpb2RFeHBpcmVkAAAADQAAAAAAAAAPQWxyZWFkeURpc3B1dGVkAAAAAA4AAAAAAAAADU5vdEFyYml0cmF0b3IAAAAAAAAPAAAAAAAAAApOb3RFeHBpcmVkAAAAAAAQAAAAAAAAAAlOb3RTZWxsZXIAAAAAAAARAAAAAAAAABdBcmJpdHJhdG9yQWxyZWFkeUV4aXN0cwAAAAASAAAAAAAAAA9QYXltZW50RGlzcHV0ZWQAAAAAEw==",
        "AAAAAgAAAAAAAAAAAAAADVBheW1lbnRTdGF0dXMAAAAAAAAGAAAAAAAAAAAAAAAHUGVuZGluZwAAAAAAAAAAAAAAAAlEZWxpdmVyZWQAAAAAAAAAAAAAAAAAAAlDb21wbGV0ZWQAAAAAAAAAAAAAAAAAAAhEaXNwdXRlZAAAAAAAAAAAAAAACFJlZnVuZGVkAAAAAAAAAAAAAAAHRXhwaXJlZAA=",
        "AAAAAwAAAAAAAAAAAAAAD0Rpc3B1dGVEZWNpc2lvbgAAAAACAAAAAAAAAAtSZWZ1bmRCdXllcgAAAAAAAAAAAAAAAAlQYXlTZWxsZXIAAAAAAAAB",
        "AAAAAQAAAAAAAAAAAAAADERpc3B1dGVFdmVudAAAAAMAAAAAAAAACWluaXRpYXRvcgAAAAAAABMAAAAAAAAACG9yZGVyX2lkAAAACgAAAAAAAAAGcmVhc29uAAAAAAAQ",
        "AAAAAQAAAAAAAAAAAAAAFERpc3B1dGVSZXNvbHZlZEV2ZW50AAAAAwAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAAhvcmRlcl9pZAAAAAoAAAAAAAAACnJlc29sdXRpb24AAAAAB9AAAAAPRGlzcHV0ZURlY2lzaW9uAA==",
        "AAAAAQAAAAAAAAAAAAAAB1BheW1lbnQAAAAACgAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAAAVidXllcgAAAAAAABMAAAAAAAAACmNyZWF0ZWRfYXQAAAAAAAYAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAAAAAAAEGRpc3B1dGVfZGVhZGxpbmUAAAAGAAAAAAAAAAZleHBpcnkAAAAAAAYAAAAAAAAAAmlkAAAAAAAKAAAAAAAAAAZzZWxsZXIAAAAAABMAAAAAAAAABnN0YXR1cwAAAAAH0AAAAA1QYXltZW50U3RhdHVzAAAAAAAAAAAAAAV0b2tlbgAAAAAAABM=",
        "AAAAAQAAAAAAAAAAAAAADkFsbG93YW5jZVZhbHVlAAAAAAACAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAAEWV4cGlyYXRpb25fbGVkZ2VyAAAAAAAABA==",
        "AAAAAQAAAAAAAAAAAAAAEEFsbG93YW5jZURhdGFLZXkAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAHc3BlbmRlcgAAAAAT",
        "AAAAAQAAAAAAAAAAAAAAD0RlbGl2ZXJ5RGV0YWlscwAAAAAHAAAAAAAAAAVidXllcgAAAAAAABMAAAAAAAAACmNyZWF0ZWRfYXQAAAAAAAYAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAAAAAAABmV4cGlyeQAAAAAABgAAAAAAAAAKcGF5bWVudF9pZAAAAAAACgAAAAAAAAAGc2VsbGVyAAAAAAATAAAAAAAAAAZzdGF0dXMAAAAAB9AAAAANUGF5bWVudFN0YXR1cwAAAA==",
        "AAAAAAAAAVtSZXRyaWV2ZXMgdGhlIHRvdGFsIGNvdW50IG9mIHBheW1lbnRzIGNyZWF0ZWQgaW4gdGhlIHN5c3RlbQoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBTb3JvYmFuIGVudmlyb25tZW50IHJlZmVyZW5jZQoKIyBSZXR1cm5zCiogYHUxMjhgIC0gVGhlIHRvdGFsIG51bWJlciBvZiBwYXltZW50cyBjcmVhdGVkCgojIFB1cnBvc2UKKiBQcm92aWRlcyBzeXN0ZW0gc3RhdGlzdGljcyBmb3IgbW9uaXRvcmluZyBhbmQgYW5hbHl0aWNzCiogVXNlZCBpbnRlcm5hbGx5IGZvciBnZW5lcmF0aW5nIHVuaXF1ZSBwYXltZW50IElEcwoqIEVuYWJsZXMgZXh0ZXJuYWwgc3lzdGVtcyB0byB0cmFjayBwYXltZW50IHZvbHVtZQAAAAARZ2V0X3BheW1lbnRfY291bnQAAAAAAAAAAAAAAQAAAAo=",
        "AAAAAAAAA4lDcmVhdGVzIGEgbmV3IGVzY3JvdyBwYXltZW50IGJldHdlZW4gYSBidXllciBhbmQgc2VsbGVyCgojIEFyZ3VtZW50cwoqIGBlbnZgIC0gVGhlIFNvcm9iYW4gZW52aXJvbm1lbnQKKiBgYnV5ZXJgIC0gVGhlIGFkZHJlc3Mgb2YgdGhlIGJ1eWVyIChwYXllcikKKiBgc2VsbGVyYCAtIFRoZSBhZGRyZXNzIG9mIHRoZSBzZWxsZXIgKHJlY2lwaWVudCkKKiBgYW1vdW50YCAtIFRoZSBwYXltZW50IGFtb3VudCBpbiB0b2tlbiB1bml0cwoqIGB0b2tlbmAgLSBUaGUgdG9rZW4gY29udHJhY3QgYWRkcmVzcyBmb3IgdGhlIHBheW1lbnQKKiBgZXhwaXJ5X2RheXNgIC0gTnVtYmVyIG9mIGRheXMgdW50aWwgcGF5bWVudCBleHBpcmVzICgwID0gMzAgZGF5cyBkZWZhdWx0KQoqIGBkZXNjcmlwdGlvbmAgLSBIdW1hbi1yZWFkYWJsZSBkZXNjcmlwdGlvbiBvZiB0aGUgcGF5bWVudAoKIyBSZXR1cm5zCiogYFJlc3VsdDx1MTI4LCBQYXltZW50RXNjcm93RXJyb3I+YCAtIFBheW1lbnQgSUQgb24gc3VjY2VzcywgZXJyb3Igb24gZmFpbHVyZQoKIyBCdXNpbmVzcyBMb2dpYwoqIFRyYW5zZmVycyBmdW5kcyBmcm9tIGJ1eWVyIHRvIGVzY3JvdyBjb250cmFjdAoqIENyZWF0ZXMgdW5pcXVlIHBheW1lbnQgSUQgYW5kIHN0b3JlcyBwYXltZW50IGRldGFpbHMKKiBTZXRzIHVwIGRpc3B1dGUgZGVhZGxpbmUgYmFzZWQgb24gZXhwaXJ5IHBlcmlvZAoqIFZhbGlkYXRlcyBhbGwgaW5wdXRzIGFuZCBidXllciBhdXRob3JpemF0aW9uCgojIFNlY3VyaXR5CiogUmVxdWlyZXMgYnV5ZXIgYXV0aGVudGljYXRpb24KKiBWYWxpZGF0ZXMgYnV5ZXIgaGFzIHN1ZmZpY2llbnQgZnVuZHMKKiBQcmV2ZW50cyBzZWxmLXBheW1lbnQgKGJ1eWVyICE9IHNlbGxlcikKKiBFbnN1cmVzIHBvc2l0aXZlIHBheW1lbnQgYW1vdW50cwAAAAAAAA5jcmVhdGVfcGF5bWVudAAAAAAABgAAAAAAAAAFYnV5ZXIAAAAAAAATAAAAAAAAAAZzZWxsZXIAAAAAABMAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAAFdG9rZW4AAAAAAAATAAAAAAAAAAtleHBpcnlfZGF5cwAAAAAEAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAQAAAAAQAAA+kAAAAKAAAH0AAAABJQYXltZW50RXNjcm93RXJyb3IAAA==",
        "AAAAAAAAAa5SZXRyaWV2ZXMgYSBzcGVjaWZpYyBwYXltZW50IGJ5IGl0cyB1bmlxdWUgaWRlbnRpZmllcgoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBTb3JvYmFuIGVudmlyb25tZW50CiogYHBheW1lbnRfaWRgIC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBwYXltZW50IHRvIHJldHJpZXZlCgojIFJldHVybnMKKiBgUmVzdWx0PFBheW1lbnQsIFBheW1lbnRFc2Nyb3dFcnJvcj5gIC0gUGF5bWVudCBkZXRhaWxzIG9yIGVycm9yIGlmIG5vdCBmb3VuZAoKIyBQdXJwb3NlCiogRW5hYmxlcyBwYXltZW50IHN0YXR1cyBjaGVja2luZyBhbmQgZGV0YWlscyByZXRyaWV2YWwKKiBTdXBwb3J0cyBkaXNwdXRlIHJlc29sdXRpb24gYW5kIGNsYWltIHZlcmlmaWNhdGlvbgoqIFByb3ZpZGVzIHRyYW5zcGFyZW5jeSBmb3IgYWxsIHBheW1lbnQgcGFydGljaXBhbnRzAAAAAAANZ2V0X2FfcGF5bWVudAAAAAAAAAEAAAAAAAAACnBheW1lbnRfaWQAAAAAAAoAAAABAAAD6QAAB9AAAAAHUGF5bWVudAAAAAfQAAAAElBheW1lbnRFc2Nyb3dFcnJvcgAA",
        "AAAAAAAAAqhBbGxvd3MgdGhlIGJ1eWVyIHRvIGNvbmZpcm0gZGVsaXZlcnkgYW5kIHJlbGVhc2UgZnVuZHMgdG8gdGhlIHNlbGxlcgoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBTb3JvYmFuIGVudmlyb25tZW50CiogYHBheW1lbnRfaWRgIC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBwYXltZW50IHRvIGNvbmZpcm0KKiBgYnV5ZXJgIC0gVGhlIGFkZHJlc3Mgb2YgdGhlIGJ1eWVyIGNvbmZpcm1pbmcgZGVsaXZlcnkKCiMgUmV0dXJucwoqIGBSZXN1bHQ8KCksIFBheW1lbnRFc2Nyb3dFcnJvcj5gIC0gU3VjY2VzcyBvciBlcnJvcgoKIyBCdXNpbmVzcyBMb2dpYwoqIE9ubHkgd29ya3MgYWZ0ZXIgc2VsbGVyIGhhcyBjb25maXJtZWQgZGVsaXZlcnkgKHN0YXR1cyA9IERlbGl2ZXJlZCkKKiBUcmFuc2ZlcnMgZnVuZHMgZnJvbSBlc2Nyb3cgdG8gc2VsbGVyCiogTWFya3MgcGF5bWVudCBhcyBDb21wbGV0ZWQKKiBGaW5hbCBzdGVwIGluIHN1Y2Nlc3NmdWwgZXNjcm93IGNvbXBsZXRpb24KCiMgU2VjdXJpdHkKKiBSZXF1aXJlcyBidXllciBhdXRoZW50aWNhdGlvbgoqIFZhbGlkYXRlcyBwYXltZW50IHN0YXR1cyBhbmQgYXV0aG9yaXphdGlvbgoqIFByZXZlbnRzIGNvbmZpcm1hdGlvbiBvZiBkaXNwdXRlZCBwYXltZW50cwoqIEVuc3VyZXMgb25seSBidXllciBjYW4gY29uZmlybSBkZWxpdmVyeQAAABZidXllcl9jb25maXJtX2RlbGl2ZXJ5AAAAAAACAAAAAAAAAApwYXltZW50X2lkAAAAAAAKAAAAAAAAAAVidXllcgAAAAAAABMAAAABAAAD6QAAA+0AAAAAAAAH0AAAABJQYXltZW50RXNjcm93RXJyb3IAAA==",
        "AAAAAAAAAopBbGxvd3MgdGhlIHNlbGxlciB0byBjb25maXJtIHRoYXQgZGVsaXZlcnkgaGFzIGJlZW4gbWFkZQoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBTb3JvYmFuIGVudmlyb25tZW50CiogYHBheW1lbnRfaWRgIC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBwYXltZW50IHRvIG1hcmsgYXMgZGVsaXZlcmVkCiogYHNlbGxlcmAgLSBUaGUgYWRkcmVzcyBvZiB0aGUgc2VsbGVyIGNvbmZpcm1pbmcgZGVsaXZlcnkKCiMgUmV0dXJucwoqIGBSZXN1bHQ8KCksIFBheW1lbnRFc2Nyb3dFcnJvcj5gIC0gU3VjY2VzcyBvciBlcnJvcgoKIyBCdXNpbmVzcyBMb2dpYwoqIENoYW5nZXMgcGF5bWVudCBzdGF0dXMgZnJvbSBQZW5kaW5nIHRvIERlbGl2ZXJlZAoqIEZpcnN0IHN0ZXAgaW4gdGhlIGRlbGl2ZXJ5IGNvbmZpcm1hdGlvbiBwcm9jZXNzCiogRW5hYmxlcyBidXllciB0byB0aGVuIGNvbmZpcm0gYW5kIHJlbGVhc2UgZnVuZHMKCiMgU2VjdXJpdHkKKiBSZXF1aXJlcyBzZWxsZXIgYXV0aGVudGljYXRpb24KKiBWYWxpZGF0ZXMgcGF5bWVudCBzdGF0dXMgYW5kIGF1dGhvcml6YXRpb24KKiBQcmV2ZW50cyBjb25maXJtYXRpb24gb2YgZGlzcHV0ZWQgcGF5bWVudHMKKiBFbnN1cmVzIG9ubHkgc2VsbGVyIGNhbiBtYXJrIGFzIGRlbGl2ZXJlZAAAAAAAF3NlbGxlcl9jb25maXJtX2RlbGl2ZXJ5AAAAAAIAAAAAAAAACnBheW1lbnRfaWQAAAAAAAoAAAAAAAAABnNlbGxlcgAAAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAfQAAAAElBheW1lbnRFc2Nyb3dFcnJvcgAA",
        "AAAAAAAAAYxSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgZGVsaXZlcnkgc3RhdHVzIG9mIGEgcGF5bWVudAoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBTb3JvYmFuIGVudmlyb25tZW50CiogYHBheW1lbnRfaWRgIC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBwYXltZW50CgojIFJldHVybnMKKiBgUmVzdWx0PFBheW1lbnRTdGF0dXMsIFBheW1lbnRFc2Nyb3dFcnJvcj5gIC0gQ3VycmVudCBwYXltZW50IHN0YXR1cyBvciBlcnJvcgoKIyBQdXJwb3NlCiogRW5hYmxlcyBzdGF0dXMgY2hlY2tpbmcgZm9yIHBheW1lbnQgcGFydGljaXBhbnRzCiogU3VwcG9ydHMgVUkvVVggZm9yIHNob3dpbmcgY3VycmVudCBwYXltZW50IHN0YXRlCiogSGVscHMgZGV0ZXJtaW5lIG5leHQgYXZhaWxhYmxlIGFjdGlvbnMAAAATZ2V0X2RlbGl2ZXJ5X3N0YXR1cwAAAAABAAAAAAAAAApwYXltZW50X2lkAAAAAAAKAAAAAQAAA+kAAAfQAAAADVBheW1lbnRTdGF0dXMAAAAAAAfQAAAAElBheW1lbnRFc2Nyb3dFcnJvcgAA",
        "AAAAAAAAAZ5SZXRyaWV2ZXMgY29tcHJlaGVuc2l2ZSBkZWxpdmVyeSBkZXRhaWxzIGZvciBhIHBheW1lbnQKCiMgQXJndW1lbnRzCiogYGVudmAgLSBUaGUgU29yb2JhbiBlbnZpcm9ubWVudAoqIGBwYXltZW50X2lkYCAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgcGF5bWVudAoKIyBSZXR1cm5zCiogYFJlc3VsdDxEZWxpdmVyeURldGFpbHMsIFBheW1lbnRFc2Nyb3dFcnJvcj5gIC0gRGVsaXZlcnkgZGV0YWlscyBvciBlcnJvcgoKIyBQdXJwb3NlCiogUHJvdmlkZXMgY29tcGxldGUgZGVsaXZlcnkgaW5mb3JtYXRpb24gZm9yIHRyYW5zcGFyZW5jeQoqIEVuYWJsZXMgZGV0YWlsZWQgcGF5bWVudCB0cmFja2luZyBhbmQgcmVwb3J0aW5nCiogU3VwcG9ydHMgZGlzcHV0ZSByZXNvbHV0aW9uIGFuZCBjbGFpbSB2ZXJpZmljYXRpb24AAAAAABRnZXRfZGVsaXZlcnlfZGV0YWlscwAAAAEAAAAAAAAACnBheW1lbnRfaWQAAAAAAAoAAAABAAAD6QAAB9AAAAAPRGVsaXZlcnlEZXRhaWxzAAAAB9AAAAASUGF5bWVudEVzY3Jvd0Vycm9yAAA=",
        "AAAAAAAAAwZBbGxvd3MgYnV5ZXJzIG9yIHNlbGxlcnMgdG8gaW5pdGlhdGUgYSBkaXNwdXRlIGZvciBhbiBlc2Nyb3cgcGF5bWVudAoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBTb3JvYmFuIGVudmlyb25tZW50CiogYHBheW1lbnRfaWRgIC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBwYXltZW50IHRvIGRpc3B1dGUKKiBgZGlzcHV0ZXJgIC0gVGhlIGFkZHJlc3MgaW5pdGlhdGluZyB0aGUgZGlzcHV0ZSAobXVzdCBiZSBidXllciBvciBzZWxsZXIpCiogYHJlYXNvbmAgLSBIdW1hbi1yZWFkYWJsZSByZWFzb24gZm9yIHRoZSBkaXNwdXRlCgojIFJldHVybnMKKiBgUmVzdWx0PCgpLCBQYXltZW50RXNjcm93RXJyb3I+YCAtIFN1Y2Nlc3Mgb3IgZXJyb3IKCiMgQnVzaW5lc3MgTG9naWMKKiBMb2NrcyBmdW5kcyBpbiBlc2Nyb3cgdW50aWwgYXJiaXRyYXRvciByZXNvbHV0aW9uCiogUmVjb3JkcyBkaXNwdXRlIGRldGFpbHMgZm9yIHRyYW5zcGFyZW5jeQoqIFByZXZlbnRzIGZ1cnRoZXIgcGF5bWVudCBhY3Rpb25zIHVudGlsIHJlc29sdmVkCiogT25seSB3b3JrcyB3aXRoaW4gZGlzcHV0ZSBkZWFkbGluZSBwZXJpb2QKCiMgU2VjdXJpdHkKKiBSZXF1aXJlcyBkaXNwdXRlciBhdXRoZW50aWNhdGlvbgoqIFZhbGlkYXRlcyBkaXNwdXRlciBpcyBidXllciBvciBzZWxsZXIKKiBQcmV2ZW50cyBkdXBsaWNhdGUgZGlzcHV0ZXMKKiBFbmZvcmNlcyBkaXNwdXRlIGRlYWRsaW5lCiogUHJldmVudHMgZGlzcHV0ZXMgb24gY29tcGxldGVkL2V4cGlyZWQgcGF5bWVudHMAAAAAAA9kaXNwdXRlX3BheW1lbnQAAAAAAwAAAAAAAAAKcGF5bWVudF9pZAAAAAAACgAAAAAAAAAIZGlzcHV0ZXIAAAATAAAAAAAAAAZyZWFzb24AAAAAABAAAAABAAAD6QAAA+0AAAAAAAAH0AAAABJQYXltZW50RXNjcm93RXJyb3IAAA==",
        "AAAAAAAAA2BBbGxvd3MgYXV0aG9yaXplZCBhcmJpdHJhdG9ycyB0byByZXNvbHZlIGRpc3B1dGVzIGFuZCBkaXN0cmlidXRlIGZ1bmRzCgojIEFyZ3VtZW50cwoqIGBlbnZgIC0gVGhlIFNvcm9iYW4gZW52aXJvbm1lbnQKKiBgcGF5bWVudF9pZGAgLSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIGRpc3B1dGVkIHBheW1lbnQKKiBgYXJiaXRyYXRvcmAgLSBUaGUgYWRkcmVzcyBvZiB0aGUgYXJiaXRyYXRvciByZXNvbHZpbmcgdGhlIGRpc3B1dGUKKiBgZGVjaXNpb25gIC0gVGhlIGFyYml0cmF0b3IncyBkZWNpc2lvbiAoUGF5U2VsbGVyIG9yIFJlZnVuZEJ1eWVyKQoqIGByZWFzb25gIC0gSHVtYW4tcmVhZGFibGUgcmVhc29uIGZvciB0aGUgZGVjaXNpb24KCiMgUmV0dXJucwoqIGBSZXN1bHQ8KCksIFBheW1lbnRFc2Nyb3dFcnJvcj5gIC0gU3VjY2VzcyBvciBlcnJvcgoKIyBCdXNpbmVzcyBMb2dpYwoqIFRyYW5zZmVycyBmdW5kcyBiYXNlZCBvbiBhcmJpdHJhdG9yIGRlY2lzaW9uCiogTWFya3MgcGF5bWVudCBhcyBDb21wbGV0ZWQgKHNlbGxlciB3aW5zKSBvciBSZWZ1bmRlZCAoYnV5ZXIgd2lucykKKiBSZWNvcmRzIHJlc29sdXRpb24gZGV0YWlscyBmb3IgdHJhbnNwYXJlbmN5CiogRmluYWxpemVzIHRoZSBkaXNwdXRlIHJlc29sdXRpb24gcHJvY2VzcwoKIyBTZWN1cml0eQoqIFJlcXVpcmVzIGFyYml0cmF0b3IgYXV0aGVudGljYXRpb24KKiBWYWxpZGF0ZXMgYXJiaXRyYXRvciBhdXRob3JpemF0aW9uCiogRW5zdXJlcyBwYXltZW50IGlzIGluIGRpc3B1dGVkIHN0YXR1cwoqIFJlcXVpcmVzIG5vbi1lbXB0eSByZXNvbHV0aW9uIHJlYXNvbgoqIFByZXZlbnRzIHVuYXV0aG9yaXplZCBkaXNwdXRlIHJlc29sdXRpb24AAAAPcmVzb2x2ZV9kaXNwdXRlAAAAAAQAAAAAAAAACnBheW1lbnRfaWQAAAAAAAoAAAAAAAAACmFyYml0cmF0b3IAAAAAABMAAAAAAAAACGRlY2lzaW9uAAAH0AAAAA9EaXNwdXRlRGVjaXNpb24AAAAAAAAAAAZyZWFzb24AAAAAABAAAAABAAAD6QAAA+0AAAAAAAAH0AAAABJQYXltZW50RXNjcm93RXJyb3IAAA==",
        "AAAAAAAAAsNBbGxvd3MgdGhlIGJ1eWVyIHRvIGNsYWltIGEgcmVmdW5kIGZvciBhbiBleHBpcmVkIHBheW1lbnQKCiMgQXJndW1lbnRzCiogYGVudmAgLSBUaGUgU29yb2JhbiBlbnZpcm9ubWVudAoqIGBwYXltZW50X2lkYCAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgcGF5bWVudCB0byBjbGFpbQoqIGBjbGFpbWVyYCAtIFRoZSBhZGRyZXNzIGF0dGVtcHRpbmcgdG8gY2xhaW0gdGhlIHBheW1lbnQgKG11c3QgYmUgdGhlIGJ1eWVyKQoKIyBSZXR1cm5zCiogYFJlc3VsdDwoKSwgUGF5bWVudEVzY3Jvd0Vycm9yPmAgLSBTdWNjZXNzIG9yIGVycm9yCgojIEJ1c2luZXNzIExvZ2ljCiogT25seSBleHBpcmVkIHBheW1lbnRzIGNhbiBiZSBjbGFpbWVkCiogT25seSB0aGUgYnV5ZXIgY2FuIGNsYWltIGV4cGlyZWQgcGF5bWVudHMKKiBEaXNwdXRlZCBwYXltZW50cyBjYW5ub3QgYmUgY2xhaW1lZCAobXVzdCBiZSByZXNvbHZlZCBmaXJzdCkKKiBDbGFpbXMgdHJhbnNmZXIgZnVuZHMgYmFjayB0byB0aGUgYnV5ZXIgYW5kIG1hcmsgcGF5bWVudCBhcyBSZWZ1bmRlZAoKIyBTZWN1cml0eQoqIFJlcXVpcmVzIGF1dGhlbnRpY2F0aW9uIGZyb20gdGhlIGNsYWltZXIKKiBWYWxpZGF0ZXMgcGF5bWVudCBleHBpcmF0aW9uCiogUHJldmVudHMgY2xhaW1pbmcgb2YgZGlzcHV0ZWQgcGF5bWVudHMKKiBFbnN1cmVzIG9ubHkgdGhlIGJ1eWVyIGNhbiBjbGFpbQAAAAANY2xhaW1fcGF5bWVudAAAAAAAAAIAAAAAAAAACnBheW1lbnRfaWQAAAAAAAoAAAAAAAAAB2NsYWltZXIAAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAfQAAAAElBheW1lbnRFc2Nyb3dFcnJvcgAA",
        "AAAAAAAAAbRBZGRzIGEgbmV3IGFyYml0cmF0b3IgdG8gdGhlIHN5c3RlbQoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBTb3JvYmFuIGVudmlyb25tZW50CiogYGFyYml0cmF0b3JgIC0gVGhlIGV4aXN0aW5nIGFyYml0cmF0b3Igd2hvIGlzIGF1dGhvcml6aW5nIHRoaXMgdHJhbnNhY3Rpb24KKiBgbmV3X2FyYml0cmF0b3JgIC0gVGhlIG5ldyBhcmJpdHJhdG9yIGFkZHJlc3MgdG8gYmUgYWRkZWQKCiMgUmV0dXJucwoqIGBSZXN1bHQ8KCksIFBheW1lbnRFc2Nyb3dFcnJvcj5gIC0gU3VjY2VzcyBvciBlcnJvcgoKIyBTZWN1cml0eQoqIE9ubHkgZXhpc3RpbmcgYXJiaXRyYXRvcnMgY2FuIGFkZCBuZXcgYXJiaXRyYXRvcnMKKiBQcmV2ZW50cyBkdXBsaWNhdGUgYXJiaXRyYXRvcnMKKiBSZXF1aXJlcyBhdXRoZW50aWNhdGlvbiBmcm9tIHRoZSBleGlzdGluZyBhcmJpdHJhdG9yAAAADmFkZF9hcmJpdHJhdG9yAAAAAAACAAAAAAAAAAphcmJpdHJhdG9yAAAAAAATAAAAAAAAAA5uZXdfYXJiaXRyYXRvcgAAAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAfQAAAAElBheW1lbnRFc2Nyb3dFcnJvcgAA",
        "AAAAAAAAAXdSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgbGlzdCBvZiBhbGwgYXV0aG9yaXplZCBhcmJpdHJhdG9ycwoKIyBBcmd1bWVudHMKKiBgZW52YCAtIFRoZSBTb3JvYmFuIGVudmlyb25tZW50CgojIFJldHVybnMKKiBgUmVzdWx0PFZlYzxBZGRyZXNzPiwgUGF5bWVudEVzY3Jvd0Vycm9yPmAgLSBMaXN0IG9mIGFyYml0cmF0b3IgYWRkcmVzc2VzIG9yIGVycm9yCgojIFB1cnBvc2UKKiBQcm92aWRlcyB0cmFuc3BhcmVuY3kgYWJvdXQgd2hvIGNhbiByZXNvbHZlIGRpc3B1dGVzCiogQWxsb3dzIGV4dGVybmFsIHN5c3RlbXMgdG8gdmVyaWZ5IGFyYml0cmF0b3IgYXV0aG9yaXphdGlvbgoqIFVzZWZ1bCBmb3IgVUkvVVggdG8gc2hvdyBhdmFpbGFibGUgYXJiaXRyYXRvcnMAAAAAD2dldF9hcmJpdHJhdG9ycwAAAAAAAAAAAQAAA+kAAAPqAAAAEwAAB9AAAAASUGF5bWVudEVzY3Jvd0Vycm9yAAA=",
        "AAAAAAAAAkRUcmFuc2ZlcnMgYXJiaXRyYXRvciByaWdodHMgZnJvbSBvbmUgYWRkcmVzcyB0byBhbm90aGVyCgojIEFyZ3VtZW50cwoqIGBlbnZgIC0gVGhlIFNvcm9iYW4gZW52aXJvbm1lbnQKKiBgb2xkX2FyYml0cmF0b3JgIC0gVGhlIGN1cnJlbnQgYXJiaXRyYXRvciB0cmFuc2ZlcnJpbmcgdGhlaXIgcmlnaHRzCiogYG5ld19hcmJpdHJhdG9yYCAtIFRoZSBuZXcgYWRkcmVzcyB0byByZWNlaXZlIGFyYml0cmF0b3IgcmlnaHRzCgojIFJldHVybnMKKiBgUmVzdWx0PCgpLCBQYXltZW50RXNjcm93RXJyb3I+YCAtIFN1Y2Nlc3Mgb3IgZXJyb3IKCiMgU2VjdXJpdHkKKiBPbmx5IGV4aXN0aW5nIGFyYml0cmF0b3JzIGNhbiB0cmFuc2ZlciB0aGVpciByaWdodHMKKiBQcmV2ZW50cyB0cmFuc2ZlcnJpbmcgdG8gZXhpc3RpbmcgYXJiaXRyYXRvcnMKKiBSZXF1aXJlcyBhdXRoZW50aWNhdGlvbiBmcm9tIHRoZSBvbGQgYXJiaXRyYXRvcgoKIyBVc2UgQ2FzZXMKKiBLZXkgcm90YXRpb24gZm9yIHNlY3VyaXR5CiogQ2hhbmdpbmcgYXJiaXRyYXRvciBhZGRyZXNzZXMKKiBSZXBsYWNpbmcgY29tcHJvbWlzZWQgYXJiaXRyYXRvciBrZXlzAAAAGnRyYW5zZmVyX2FyYml0cmF0b3JfcmlnaHRzAAAAAAACAAAAAAAAAA5vbGRfYXJiaXRyYXRvcgAAAAAAEwAAAAAAAAAObmV3X2FyYml0cmF0b3IAAAAAABMAAAABAAAD6QAAA+0AAAAAAAAH0AAAABJQYXltZW50RXNjcm93RXJyb3IAAA==" ]),
      options
    )
  }
  public readonly fromJSON = {
    init: this.txFromJSON<Result<void>>,
        version: this.txFromJSON<u32>,
        upgrade: this.txFromJSON<Result<void>>,
        get_payment_count: this.txFromJSON<u128>,
        create_payment: this.txFromJSON<Result<u128>>,
        get_a_payment: this.txFromJSON<Result<Payment>>,
        buyer_confirm_delivery: this.txFromJSON<Result<void>>,
        seller_confirm_delivery: this.txFromJSON<Result<void>>,
        get_delivery_status: this.txFromJSON<Result<PaymentStatus>>,
        get_delivery_details: this.txFromJSON<Result<DeliveryDetails>>,
        dispute_payment: this.txFromJSON<Result<void>>,
        resolve_dispute: this.txFromJSON<Result<void>>,
        claim_payment: this.txFromJSON<Result<void>>,
        add_arbitrator: this.txFromJSON<Result<void>>,
        get_arbitrators: this.txFromJSON<Result<Array<string>>>,
        transfer_arbitrator_rights: this.txFromJSON<Result<void>>
  }
}
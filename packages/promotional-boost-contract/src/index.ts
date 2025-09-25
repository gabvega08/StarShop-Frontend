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
    contractId: "CBYABENJX5URHB2MR222ARIUY33V7UZYWXMSNBO7MJE3L4EQXHV3Y6TD",
  }
} as const


export interface BoostSlot {
  end_time: u64;
  price_paid: u64;
  product_id: u64;
  seller: string;
  start_time: u64;
}


export interface SlotManager {
  category_slots: Map<string, Array<u64>>;
  max_slots: Map<string, u32>;
  slots: Map<u64, BoostSlot>;
}


export interface BoostVisibility {
  end_time: u64;
  price_paid: u64;
  product_id: u64;
  seller: string;
  start_time: u64;
}


export interface VisibilityManager {
  boosts: Map<u64, BoostVisibility>;
}

export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an AssembledTransaction object which will have a result field containing the result of the simulation. If this transaction changes contract state, you will need to call signAndSend() on the returned object.
   * Initialize the contract with default slot limits
   */
  initialize: (options?: {
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
   * Construct and simulate a set_category_max_slots transaction. Returns an AssembledTransaction object which will have a result field containing the result of the simulation. If this transaction changes contract state, you will need to call signAndSend() on the returned object.
   * Set maximum slots for a category (admin function)
   */
  set_category_max_slots: ({category, max_slots}: {category: string, max_slots: u32}, options?: {
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
   * Construct and simulate a boost_product transaction. Returns an AssembledTransaction object which will have a result field containing the result of the simulation. If this transaction changes contract state, you will need to call signAndSend() on the returned object.
   * Seller calls this to boost a product
   */
  boost_product: ({seller_address, category, product_id, duration_secs, payment_amount}: {seller_address: string, category: string, product_id: u64, duration_secs: u64, payment_amount: i128}, options?: {
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
   * Construct and simulate a is_boosted transaction. Returns an AssembledTransaction object which will have a result field containing the result of the simulation. If this transaction changes contract state, you will need to call signAndSend() on the returned object.
   * View if a product is currently boosted
   */
  is_boosted: ({product_id}: {product_id: u64}, options?: {
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
   * Construct and simulate a get_boosted_list transaction. Returns an AssembledTransaction object which will have a result field containing the result of the simulation. If this transaction changes contract state, you will need to call signAndSend() on the returned object.
   * Return all active boosted product IDs
   */
  get_boosted_list: (options?: {
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
  }) => Promise<AssembledTransaction<Array<u64>>>

  /**
   * Construct and simulate a get_slot_count transaction. Returns an AssembledTransaction object which will have a result field containing the result of the simulation. If this transaction changes contract state, you will need to call signAndSend() on the returned object.
   * Get current slot count for a category
   */
  get_slot_count: ({category}: {category: string}, options?: {
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
   * Construct and simulate a cleanup_expired transaction. Returns an AssembledTransaction object which will have a result field containing the result of the simulation. If this transaction changes contract state, you will need to call signAndSend() on the returned object.
   * Admin clears expired slots (optional)
   */
  cleanup_expired: ({category}: {category: string}, options?: {
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
        /** The format used to decode wasmHash, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAACUJvb3N0U2xvdAAAAAAAAAUAAAAAAAAACGVuZF90aW1lAAAABgAAAAAAAAAKcHJpY2VfcGFpZAAAAAAABgAAAAAAAAAKcHJvZHVjdF9pZAAAAAAABgAAAAAAAAAGc2VsbGVyAAAAAAATAAAAAAAAAApzdGFydF90aW1lAAAAAAAG",
        "AAAAAQAAAAAAAAAAAAAAC1Nsb3RNYW5hZ2VyAAAAAAMAAAAAAAAADmNhdGVnb3J5X3Nsb3RzAAAAAAPsAAAAEQAAA+oAAAAGAAAAAAAAAAltYXhfc2xvdHMAAAAAAAPsAAAAEQAAAAQAAAAAAAAABXNsb3RzAAAAAAAD7AAAAAYAAAfQAAAACUJvb3N0U2xvdAAAAA==",
        "AAAAAQAAAAAAAAAAAAAAD0Jvb3N0VmlzaWJpbGl0eQAAAAAFAAAAAAAAAAhlbmRfdGltZQAAAAYAAAAAAAAACnByaWNlX3BhaWQAAAAAAAYAAAAAAAAACnByb2R1Y3RfaWQAAAAAAAYAAAAAAAAABnNlbGxlcgAAAAAAEwAAAAAAAAAKc3RhcnRfdGltZQAAAAAABg==",
        "AAAAAQAAAAAAAAAAAAAAEVZpc2liaWxpdHlNYW5hZ2VyAAAAAAAAAQAAAAAAAAAGYm9vc3RzAAAAAAPsAAAABgAAB9AAAAAPQm9vc3RWaXNpYmlsaXR5AA==",
        "AAAAAAAAADBJbml0aWFsaXplIHRoZSBjb250cmFjdCB3aXRoIGRlZmF1bHQgc2xvdCBsaW1pdHMAAAAKaW5pdGlhbGl6ZQAAAAAAAAAAAAA=",
        "AAAAAAAAADFTZXQgbWF4aW11bSBzbG90cyBmb3IgYSBjYXRlZ29yeSAoYWRtaW4gZnVuY3Rpb24pAAAAAAAAFnNldF9jYXRlZ29yeV9tYXhfc2xvdHMAAAAAAAIAAAAAAAAACGNhdGVnb3J5AAAAEQAAAAAAAAAJbWF4X3Nsb3RzAAAAAAAABAAAAAA=",
        "AAAAAAAAACRTZWxsZXIgY2FsbHMgdGhpcyB0byBib29zdCBhIHByb2R1Y3QAAAANYm9vc3RfcHJvZHVjdAAAAAAAAAUAAAAAAAAADnNlbGxlcl9hZGRyZXNzAAAAAAATAAAAAAAAAAhjYXRlZ29yeQAAABEAAAAAAAAACnByb2R1Y3RfaWQAAAAAAAYAAAAAAAAADWR1cmF0aW9uX3NlY3MAAAAAAAAGAAAAAAAAAA5wYXltZW50X2Ftb3VudAAAAAAACwAAAAA=",
        "AAAAAAAAACZWaWV3IGlmIGEgcHJvZHVjdCBpcyBjdXJyZW50bHkgYm9vc3RlZAAAAAAACmlzX2Jvb3N0ZWQAAAAAAAEAAAAAAAAACnByb2R1Y3RfaWQAAAAAAAYAAAABAAAAAQ==",
        "AAAAAAAAACVSZXR1cm4gYWxsIGFjdGl2ZSBib29zdGVkIHByb2R1Y3QgSURzAAAAAAAAEGdldF9ib29zdGVkX2xpc3QAAAAAAAAAAQAAA+oAAAAG",
        "AAAAAAAAACVHZXQgY3VycmVudCBzbG90IGNvdW50IGZvciBhIGNhdGVnb3J5AAAAAAAADmdldF9zbG90X2NvdW50AAAAAAABAAAAAAAAAAhjYXRlZ29yeQAAABEAAAABAAAABA==",
        "AAAAAAAAACVBZG1pbiBjbGVhcnMgZXhwaXJlZCBzbG90cyAob3B0aW9uYWwpAAAAAAAAD2NsZWFudXBfZXhwaXJlZAAAAAABAAAAAAAAAAhjYXRlZ29yeQAAABEAAAAA" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<null>,
        set_category_max_slots: this.txFromJSON<null>,
        boost_product: this.txFromJSON<null>,
        is_boosted: this.txFromJSON<boolean>,
        get_boosted_list: this.txFromJSON<Array<u64>>,
        get_slot_count: this.txFromJSON<u32>,
        cleanup_expired: this.txFromJSON<null>
  }
}
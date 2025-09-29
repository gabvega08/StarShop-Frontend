import { Buffer } from "buffer";
import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, MethodOptions } from '@stellar/stellar-sdk/contract';
import type { u32, u64, i128, Option } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CCLOYFYYBQHT45IUQMUB22OZDZCZMZZHSJ2PHRWJGSONEWIIEAY3DLRV";
    };
};
export declare const ValidationError: {
    101: {
        message: string;
    };
    102: {
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
    109: {
        message: string;
    };
    111: {
        message: string;
    };
    112: {
        message: string;
    };
    113: {
        message: string;
    };
};
export declare const AuctionError: {
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
};
export declare const ConditionError: {
    301: {
        message: string;
    };
    302: {
        message: string;
    };
    303: {
        message: string;
    };
    304: {
        message: string;
    };
    305: {
        message: string;
    };
    306: {
        message: string;
    };
    307: {
        message: string;
    };
    308: {
        message: string;
    };
    309: {
        message: string;
    };
    310: {
        message: string;
    };
    311: {
        message: string;
    };
    312: {
        message: string;
    };
    313: {
        message: string;
    };
    314: {
        message: string;
    };
    315: {
        message: string;
    };
    316: {
        message: string;
    };
    317: {
        message: string;
    };
    318: {
        message: string;
    };
    319: {
        message: string;
    };
    320: {
        message: string;
    };
    321: {
        message: string;
    };
};
export interface AuctionCreated {
    auction_id: u32;
    end_time: u64;
    owner: string;
    start_time: u64;
}
export interface NewBidPlaced {
    auction_id: u32;
    bid_amount: i128;
    bidder: string;
}
export interface AuctionCanceled {
    auction_id: u32;
    owner: string;
    timestamp: u64;
}
export interface AuctionCompleted {
    auction_id: u32;
    final_price: Option<i128>;
    timestamp: u64;
    winner: Option<string>;
}
export interface Auction {
    auction_conditions: AuctionConditions;
    auction_status: AuctionStatus;
    curr_bid_amount: Option<i128>;
    curr_bidder: Option<string>;
    id: u32;
    item_metadata: ItemMetadata;
    last_bid_time: u64;
    no_of_bids: u32;
    no_of_participants: u32;
    owner: string;
    start_time: u64;
    token: string;
}
export interface Bid {
    bid_amount: i128;
    bidder: string;
    id: u32;
}
export interface ItemMetadata {
    description: string;
    title: string;
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
export type AuctionStatus = {
    tag: "Active";
    values: void;
} | {
    tag: "Cancelled";
    values: void;
} | {
    tag: "Completed";
    values: void;
};
export interface Client {
    /**
     * Construct and simulate a create_auction transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Creates a new auction with provided metadata and auction conditions.
     */
    create_auction: ({ owner, token, item_metadata, auction_conditions }: {
        owner: string;
        token: string;
        item_metadata: ItemMetadata;
        auction_conditions: AuctionConditions;
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a make_bid transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Places a bid on an active auction.
     */
    make_bid: ({ auction_id, bidder, bid_amount }: {
        auction_id: u32;
        bidder: string;
        bid_amount: i128;
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a cancel_auction transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Cancels an active auction if it's still cancelable.
     */
    cancel_auction: ({ auction_id }: {
        auction_id: u32;
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a end_auction transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     * Ends an auction if its end conditions are met.
     */
    end_auction: ({ auction_id }: {
        auction_id: u32;
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
    }) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a get_auction transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_auction: ({ auction_id }: {
        auction_id: u32;
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
    }) => Promise<AssembledTransaction<Option<Auction>>>;
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
        create_auction: (json: string) => AssembledTransaction<null>;
        make_bid: (json: string) => AssembledTransaction<null>;
        cancel_auction: (json: string) => AssembledTransaction<null>;
        end_auction: (json: string) => AssembledTransaction<null>;
        get_auction: (json: string) => AssembledTransaction<Option<Auction>>;
    };
}

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
    contractId: "CCLOYFYYBQHT45IUQMUB22OZDZCZMZZHSJ2PHRWJGSONEWIIEAY3DLRV",
  }
} as const

export const ValidationError = {
  101: {message:"AuctionNameCannotBeEmpty"},
  102: {message:"AuctionDescriptionCannotBeEmpty"},
  104: {message:"StartingPriceCannotBeZero"},
  105: {message:"BidCountMustBeGreaterThanZero"},
  106: {message:"TargetPriceMustBeGreaterThanZero"},
  107: {message:"InactivitySecondsMustBeGreaterThanZero"},
  108: {message:"SequenceNumberMustBeGreaterThanZero"},
  109: {message:"MinimumParticipantsMustBeGreaterThanZero"},
  111: {message:"EndTimeInPast"},
  112: {message:"DutchAuctionFloorPriceMustBeGreaterThanZero"},
  113: {message:"MaximumParticipantsMustBeGreaterThanZero"}
}

export const AuctionError = {
  201: {message:"AuctionNotFound"},
  202: {message:"AuctionCanceled"},
  203: {message:"AuctionCompleted"},
  204: {message:"CannotCancelAuction"}
}

export const ConditionError = {
  301: {message:"MaxBidCountReached"},
  302: {message:"TargetPriceReached"},
  303: {message:"AuctionCompleted"},
  304: {message:"MaxInactivitySecondsExceeded"},
  305: {message:"TargetSequenceNumberReached"},
  306: {message:"MaxNumParticipantsReached"},
  307: {message:"BidMustBeHigherThanMaxBid"},
  308: {message:"BidMustBeHigherThanStartingPrice"},
  309: {message:"BidMustBeLowerThanMaxBid"},
  310: {message:"BidMustBeLowerThanStartingPrice"},
  311: {message:"DutchBidAlreadyRegistered"},
  312: {message:"BidMustMatchDutchPrice"},
  313: {message:"AuctionEnded"},
  314: {message:"AuctionNotEnded"},
  315: {message:"MaxBidCountNotReached"},
  316: {message:"TargetPriceNotReached"},
  317: {message:"MaxInactivitySecondsNotReached"},
  318: {message:"TargetSequenceNumberNotReached"},
  319: {message:"MinNumParticipantsNotReached"},
  320: {message:"MaxNumParticipantsNotReached"},
  321: {message:"NoBidsRegisteredYet"}
}


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

export type AuctionType = {tag: "Regular", values: void} | {tag: "Reverse", values: void} | {tag: "Dutch", values: readonly [DutchAuctionData]};


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

export type AuctionStatus = {tag: "Active", values: void} | {tag: "Cancelled", values: void} | {tag: "Completed", values: void};

export interface Client {
  /**
   * Construct and simulate a create_auction transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Creates a new auction with provided metadata and auction conditions.
   */
  create_auction: ({owner, token, item_metadata, auction_conditions}: {owner: string, token: string, item_metadata: ItemMetadata, auction_conditions: AuctionConditions}, options?: {
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
   * Construct and simulate a make_bid transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Places a bid on an active auction.
   */
  make_bid: ({auction_id, bidder, bid_amount}: {auction_id: u32, bidder: string, bid_amount: i128}, options?: {
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
   * Construct and simulate a cancel_auction transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Cancels an active auction if it's still cancelable.
   */
  cancel_auction: ({auction_id}: {auction_id: u32}, options?: {
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
   * Construct and simulate a end_auction transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Ends an auction if its end conditions are met.
   */
  end_auction: ({auction_id}: {auction_id: u32}, options?: {
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
   * Construct and simulate a get_auction transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_auction: ({auction_id}: {auction_id: u32}, options?: {
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
  }) => Promise<AssembledTransaction<Option<Auction>>>

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
      new ContractSpec([ "AAAAAAAAAERDcmVhdGVzIGEgbmV3IGF1Y3Rpb24gd2l0aCBwcm92aWRlZCBtZXRhZGF0YSBhbmQgYXVjdGlvbiBjb25kaXRpb25zLgAAAA5jcmVhdGVfYXVjdGlvbgAAAAAABAAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAV0b2tlbgAAAAAAABMAAAAAAAAADWl0ZW1fbWV0YWRhdGEAAAAAAAfQAAAADEl0ZW1NZXRhZGF0YQAAAAAAAAASYXVjdGlvbl9jb25kaXRpb25zAAAAAAfQAAAAEUF1Y3Rpb25Db25kaXRpb25zAAAAAAAAAA==",
        "AAAAAAAAACJQbGFjZXMgYSBiaWQgb24gYW4gYWN0aXZlIGF1Y3Rpb24uAAAAAAAIbWFrZV9iaWQAAAADAAAAAAAAAAphdWN0aW9uX2lkAAAAAAAEAAAAAAAAAAZiaWRkZXIAAAAAABMAAAAAAAAACmJpZF9hbW91bnQAAAAAAAsAAAAA",
        "AAAAAAAAADNDYW5jZWxzIGFuIGFjdGl2ZSBhdWN0aW9uIGlmIGl0J3Mgc3RpbGwgY2FuY2VsYWJsZS4AAAAADmNhbmNlbF9hdWN0aW9uAAAAAAABAAAAAAAAAAphdWN0aW9uX2lkAAAAAAAEAAAAAA==",
        "AAAAAAAAAC5FbmRzIGFuIGF1Y3Rpb24gaWYgaXRzIGVuZCBjb25kaXRpb25zIGFyZSBtZXQuAAAAAAALZW5kX2F1Y3Rpb24AAAAAAQAAAAAAAAAKYXVjdGlvbl9pZAAAAAAABAAAAAA=",
        "AAAAAAAAAAAAAAALZ2V0X2F1Y3Rpb24AAAAAAQAAAAAAAAAKYXVjdGlvbl9pZAAAAAAABAAAAAEAAAPoAAAH0AAAAAdBdWN0aW9uAA==",
        "AAAABAAAAAAAAAAAAAAAD1ZhbGlkYXRpb25FcnJvcgAAAAALAAAAAAAAABhBdWN0aW9uTmFtZUNhbm5vdEJlRW1wdHkAAABlAAAAAAAAAB9BdWN0aW9uRGVzY3JpcHRpb25DYW5ub3RCZUVtcHR5AAAAAGYAAAAAAAAAGVN0YXJ0aW5nUHJpY2VDYW5ub3RCZVplcm8AAAAAAABoAAAAAAAAAB1CaWRDb3VudE11c3RCZUdyZWF0ZXJUaGFuWmVybwAAAAAAAGkAAAAAAAAAIFRhcmdldFByaWNlTXVzdEJlR3JlYXRlclRoYW5aZXJvAAAAagAAAAAAAAAmSW5hY3Rpdml0eVNlY29uZHNNdXN0QmVHcmVhdGVyVGhhblplcm8AAAAAAGsAAAAAAAAAI1NlcXVlbmNlTnVtYmVyTXVzdEJlR3JlYXRlclRoYW5aZXJvAAAAAGwAAAAAAAAAKE1pbmltdW1QYXJ0aWNpcGFudHNNdXN0QmVHcmVhdGVyVGhhblplcm8AAABtAAAAAAAAAA1FbmRUaW1lSW5QYXN0AAAAAAAAbwAAAAAAAAArRHV0Y2hBdWN0aW9uRmxvb3JQcmljZU11c3RCZUdyZWF0ZXJUaGFuWmVybwAAAABwAAAAAAAAAChNYXhpbXVtUGFydGljaXBhbnRzTXVzdEJlR3JlYXRlclRoYW5aZXJvAAAAcQ==",
        "AAAABAAAAAAAAAAAAAAADEF1Y3Rpb25FcnJvcgAAAAQAAAAAAAAAD0F1Y3Rpb25Ob3RGb3VuZAAAAADJAAAAAAAAAA9BdWN0aW9uQ2FuY2VsZWQAAAAAygAAAAAAAAAQQXVjdGlvbkNvbXBsZXRlZAAAAMsAAAAAAAAAE0Nhbm5vdENhbmNlbEF1Y3Rpb24AAAAAzA==",
        "AAAABAAAAAAAAAAAAAAADkNvbmRpdGlvbkVycm9yAAAAAAAVAAAAAAAAABJNYXhCaWRDb3VudFJlYWNoZWQAAAAAAS0AAAAAAAAAElRhcmdldFByaWNlUmVhY2hlZAAAAAABLgAAAAAAAAAQQXVjdGlvbkNvbXBsZXRlZAAAAS8AAAAAAAAAHE1heEluYWN0aXZpdHlTZWNvbmRzRXhjZWVkZWQAAAEwAAAAAAAAABtUYXJnZXRTZXF1ZW5jZU51bWJlclJlYWNoZWQAAAABMQAAAAAAAAAZTWF4TnVtUGFydGljaXBhbnRzUmVhY2hlZAAAAAAAATIAAAAAAAAAGUJpZE11c3RCZUhpZ2hlclRoYW5NYXhCaWQAAAAAAAEzAAAAAAAAACBCaWRNdXN0QmVIaWdoZXJUaGFuU3RhcnRpbmdQcmljZQAAATQAAAAAAAAAGEJpZE11c3RCZUxvd2VyVGhhbk1heEJpZAAAATUAAAAAAAAAH0JpZE11c3RCZUxvd2VyVGhhblN0YXJ0aW5nUHJpY2UAAAABNgAAAAAAAAAZRHV0Y2hCaWRBbHJlYWR5UmVnaXN0ZXJlZAAAAAAAATcAAAAAAAAAFkJpZE11c3RNYXRjaER1dGNoUHJpY2UAAAAAATgAAAAAAAAADEF1Y3Rpb25FbmRlZAAAATkAAAAAAAAAD0F1Y3Rpb25Ob3RFbmRlZAAAAAE6AAAAAAAAABVNYXhCaWRDb3VudE5vdFJlYWNoZWQAAAAAAAE7AAAAAAAAABVUYXJnZXRQcmljZU5vdFJlYWNoZWQAAAAAAAE8AAAAAAAAAB5NYXhJbmFjdGl2aXR5U2Vjb25kc05vdFJlYWNoZWQAAAAAAT0AAAAAAAAAHlRhcmdldFNlcXVlbmNlTnVtYmVyTm90UmVhY2hlZAAAAAABPgAAAAAAAAAcTWluTnVtUGFydGljaXBhbnRzTm90UmVhY2hlZAAAAT8AAAAAAAAAHE1heE51bVBhcnRpY2lwYW50c05vdFJlYWNoZWQAAAFAAAAAAAAAABNOb0JpZHNSZWdpc3RlcmVkWWV0AAAAAUE=",
        "AAAAAQAAAAAAAAAAAAAADkF1Y3Rpb25DcmVhdGVkAAAAAAAEAAAAAAAAAAphdWN0aW9uX2lkAAAAAAAEAAAAAAAAAAhlbmRfdGltZQAAAAYAAAAAAAAABW93bmVyAAAAAAAAEwAAAAAAAAAKc3RhcnRfdGltZQAAAAAABg==",
        "AAAAAQAAAAAAAAAAAAAADE5ld0JpZFBsYWNlZAAAAAMAAAAAAAAACmF1Y3Rpb25faWQAAAAAAAQAAAAAAAAACmJpZF9hbW91bnQAAAAAAAsAAAAAAAAABmJpZGRlcgAAAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAAD0F1Y3Rpb25DYW5jZWxlZAAAAAADAAAAAAAAAAphdWN0aW9uX2lkAAAAAAAEAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAACXRpbWVzdGFtcAAAAAAAAAY=",
        "AAAAAQAAAAAAAAAAAAAAEEF1Y3Rpb25Db21wbGV0ZWQAAAAEAAAAAAAAAAphdWN0aW9uX2lkAAAAAAAEAAAAAAAAAAtmaW5hbF9wcmljZQAAAAPoAAAACwAAAAAAAAAJdGltZXN0YW1wAAAAAAAABgAAAAAAAAAGd2lubmVyAAAAAAPoAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAAB0F1Y3Rpb24AAAAADAAAAAAAAAASYXVjdGlvbl9jb25kaXRpb25zAAAAAAfQAAAAEUF1Y3Rpb25Db25kaXRpb25zAAAAAAAAAAAAAA5hdWN0aW9uX3N0YXR1cwAAAAAH0AAAAA1BdWN0aW9uU3RhdHVzAAAAAAAAAAAAAA9jdXJyX2JpZF9hbW91bnQAAAAD6AAAAAsAAAAAAAAAC2N1cnJfYmlkZGVyAAAAA+gAAAATAAAAAAAAAAJpZAAAAAAABAAAAAAAAAANaXRlbV9tZXRhZGF0YQAAAAAAB9AAAAAMSXRlbU1ldGFkYXRhAAAAAAAAAA1sYXN0X2JpZF90aW1lAAAAAAAABgAAAAAAAAAKbm9fb2ZfYmlkcwAAAAAABAAAAAAAAAASbm9fb2ZfcGFydGljaXBhbnRzAAAAAAAEAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAACnN0YXJ0X3RpbWUAAAAAAAYAAAAAAAAABXRva2VuAAAAAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAAA0JpZAAAAAADAAAAAAAAAApiaWRfYW1vdW50AAAAAAALAAAAAAAAAAZiaWRkZXIAAAAAABMAAAAAAAAAAmlkAAAAAAAE",
        "AAAAAQAAAAAAAAAAAAAADEl0ZW1NZXRhZGF0YQAAAAIAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAAAAAAABXRpdGxlAAAAAAAAEA==",
        "AAAAAgAAAAAAAAAAAAAAC0F1Y3Rpb25UeXBlAAAAAAMAAAAAAAAAAAAAAAdSZWd1bGFyAAAAAAAAAAAAAAAAB1JldmVyc2UAAAAAAQAAAAAAAAAFRHV0Y2gAAAAAAAABAAAH0AAAABBEdXRjaEF1Y3Rpb25EYXRh",
        "AAAAAQAAAAAAAAAAAAAAEER1dGNoQXVjdGlvbkRhdGEAAAABAAAAAAAAAAtmbG9vcl9wcmljZQAAAAAL",
        "AAAAAQAAAAAAAAAAAAAAEUF1Y3Rpb25Db25kaXRpb25zAAAAAAAACQAAAAAAAAAMYXVjdGlvbl90eXBlAAAH0AAAAAtBdWN0aW9uVHlwZQAAAAAAAAAACGVuZF90aW1lAAAABgAAAAAAAAAMb25fYmlkX2NvdW50AAAD6AAAAAQAAAAAAAAAGG9uX2ZpeGVkX3NlcXVlbmNlX251bWJlcgAAA+gAAAAEAAAAAAAAABVvbl9pbmFjdGl2aXR5X3NlY29uZHMAAAAAAAPoAAAABgAAAAAAAAAXb25fbWF4aW11bV9wYXJ0aWNpcGFudHMAAAAD6AAAAAQAAAAAAAAAF29uX21pbmltdW1fcGFydGljaXBhbnRzAAAAA+gAAAAEAAAAAAAAAA9vbl90YXJnZXRfcHJpY2UAAAAD6AAAAAsAAAAAAAAADnN0YXJ0aW5nX3ByaWNlAAAAAAAL",
        "AAAAAgAAAAAAAAAAAAAADUF1Y3Rpb25TdGF0dXMAAAAAAAADAAAAAAAAAAAAAAAGQWN0aXZlAAAAAAAAAAAAAAAAAAlDYW5jZWxsZWQAAAAAAAAAAAAAAAAAAAlDb21wbGV0ZWQAAAA=" ]),
      options
    )
  }
  public readonly fromJSON = {
    create_auction: this.txFromJSON<null>,
        make_bid: this.txFromJSON<null>,
        cancel_auction: this.txFromJSON<null>,
        end_auction: this.txFromJSON<null>,
        get_auction: this.txFromJSON<Option<Auction>>
  }
}
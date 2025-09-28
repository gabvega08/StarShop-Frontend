import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CCS3JJZJFSNYOP4X7JSVJBFRFBJHOSPKRWUPQKW5J3I5UZ3L252YOWZW",
    }
};
export var VoteType;
(function (VoteType) {
    VoteType[VoteType["Upvote"] = 1] = "Upvote";
    VoteType[VoteType["Downvote"] = 2] = "Downvote";
})(VoteType || (VoteType = {}));
export const Errors = {
    1: { message: "VotingPeriodEnded" },
    2: { message: "AlreadyVoted" },
    3: { message: "ReversalWindowExpired" },
    4: { message: "DailyLimitReached" },
    5: { message: "AccountTooNew" },
    6: { message: "ProductNotFound" },
    7: { message: "ProductExists" }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAwAAAAAAAAAAAAAACFZvdGVUeXBlAAAAAgAAAAAAAAAGVXB2b3RlAAAAAAABAAAAAAAAAAhEb3dudm90ZQAAAAI=",
            "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABwAAAAAAAAARVm90aW5nUGVyaW9kRW5kZWQAAAAAAAABAAAAAAAAAAxBbHJlYWR5Vm90ZWQAAAACAAAAAAAAABVSZXZlcnNhbFdpbmRvd0V4cGlyZWQAAAAAAAADAAAAAAAAABFEYWlseUxpbWl0UmVhY2hlZAAAAAAAAAQAAAAAAAAADUFjY291bnRUb29OZXcAAAAAAAAFAAAAAAAAAA9Qcm9kdWN0Tm90Rm91bmQAAAAABgAAAAAAAAANUHJvZHVjdEV4aXN0cwAAAAAAAAc=",
            "AAAAAQAAAAAAAAAAAAAAB1Byb2R1Y3QAAAAABAAAAAAAAAAKY3JlYXRlZF9hdAAAAAAABgAAAAAAAAACaWQAAAAAABEAAAAAAAAABG5hbWUAAAARAAAAAAAAAAV2b3RlcwAAAAAAA+wAAAATAAAH0AAAAARWb3Rl",
            "AAAAAQAAAAAAAAAAAAAABFZvdGUAAAADAAAAAAAAAAl0aW1lc3RhbXAAAAAAAAAGAAAAAAAAAAl2b3RlX3R5cGUAAAAAAAfQAAAACFZvdGVUeXBlAAAAAAAAAAV2b3RlcgAAAAAAABM=",
            "AAAAAAAAAAAAAAAEaW5pdAAAAAAAAAAA",
            "AAAAAAAAAAAAAAAOY3JlYXRlX3Byb2R1Y3QAAAAAAAIAAAAAAAAAAmlkAAAAAAARAAAAAAAAAARuYW1lAAAAEQAAAAEAAAPpAAAD7QAAAAAAAAAD",
            "AAAAAAAAAAAAAAAJY2FzdF92b3RlAAAAAAAAAwAAAAAAAAAKcHJvZHVjdF9pZAAAAAAAEQAAAAAAAAAJdm90ZV90eXBlAAAAAAAH0AAAAAhWb3RlVHlwZQAAAAAAAAAFdm90ZXIAAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
            "AAAAAAAAAAAAAAARZ2V0X3Byb2R1Y3Rfc2NvcmUAAAAAAAABAAAAAAAAAApwcm9kdWN0X2lkAAAAAAARAAAAAQAAAAU=",
            "AAAAAAAAAAAAAAAVZ2V0X3RyZW5kaW5nX3Byb2R1Y3RzAAAAAAAAAAAAAAEAAAPqAAAAEQ=="]), options);
        this.options = options;
    }
    fromJSON = {
        init: (this.txFromJSON),
        create_product: (this.txFromJSON),
        cast_vote: (this.txFromJSON),
        get_product_score: (this.txFromJSON),
        get_trending_products: (this.txFromJSON)
    };
}

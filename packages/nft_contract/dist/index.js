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
        contractId: "CC2RU4MBM2NBA5FJXLAAPC2PL35WMT2RJ2SSH4OHUFXTPACJL7W5PH5G",
    }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAAAAAAAMdHJhbnNmZXJfbmZ0AAAAAwAAAAAAAAAEZnJvbQAAABMAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAh0b2tlbl9pZAAAAAQAAAAA",
            "AAAAAAAAAAAAAAAIYnVybl9uZnQAAAACAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAACHRva2VuX2lkAAAABAAAAAA=",
            "AAAAAAAAAAAAAAAJZ2V0X293bmVyAAAAAAAAAQAAAAAAAAAIdG9rZW5faWQAAAAEAAAAAQAAABM=",
            "AAAAAAAAAAAAAAAKbmZ0X2V4aXN0cwAAAAAAAQAAAAAAAAAIdG9rZW5faWQAAAAEAAAAAQAAAAE=",
            "AAAAAAAAAAAAAAAPdXBkYXRlX21ldGFkYXRhAAAAAAUAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAAIdG9rZW5faWQAAAAEAAAAAAAAAARuYW1lAAAAEAAAAAAAAAALZGVzY3JpcHRpb24AAAAAEAAAAAAAAAAKYXR0cmlidXRlcwAAAAAD6gAAABAAAAAA",
            "AAAAAAAAAAAAAAAMZ2V0X21ldGFkYXRhAAAAAQAAAAAAAAAIdG9rZW5faWQAAAAEAAAAAQAAB9AAAAALTkZUTWV0YWRhdGEA",
            "AAAAAAAAAAAAAAAIbWludF9uZnQAAAAEAAAAAAAAAAJ0bwAAAAAAEwAAAAAAAAAEbmFtZQAAABAAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAAAAAAACmF0dHJpYnV0ZXMAAAAAA+oAAAAQAAAAAQAAAAQ=",
            "AAAAAAAAAAAAAAARdmFsaWRhdGVfbWV0YWRhdGEAAAAAAAADAAAAAAAAAARuYW1lAAAAEAAAAAAAAAALZGVzY3JpcHRpb24AAAAAEAAAAAAAAAAKYXR0cmlidXRlcwAAAAAD6gAAABAAAAAA",
            "AAAAAAAAAAAAAAAOc2V0X21heF9zdXBwbHkAAAAAAAIAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAAKbWF4X3N1cHBseQAAAAAABAAAAAA=",
            "AAAAAAAAAAAAAAAOZ2V0X21heF9zdXBwbHkAAAAAAAAAAAABAAAABA==",
            "AAAAAAAAAAAAAAASZ2V0X2N1cnJlbnRfc3VwcGx5AAAAAAAAAAAAAQAAAAQ=",
            "AAAAAQAAAAAAAAAAAAAAC05GVE1ldGFkYXRhAAAAAAMAAAAAAAAACmF0dHJpYnV0ZXMAAAAAA+oAAAAQAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAQAAAAAAAAAARuYW1lAAAAEA==",
            "AAAAAQAAAAAAAAAAAAAACU5GVERldGFpbAAAAAAAAAIAAAAAAAAACG1ldGFkYXRhAAAH0AAAAAtORlRNZXRhZGF0YQAAAAAAAAAABW93bmVyAAAAAAAAEw==",
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAMdmVyaWZ5X2FkbWluAAAAAQAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAJZ2V0X2FkbWluAAAAAAAAAAAAAAEAAAAT",
            "AAAAAAAAAAAAAAAOaXNfaW5pdGlhbGl6ZWQAAAAAAAAAAAABAAAAAQ=="]), options);
        this.options = options;
    }
    fromJSON = {
        transfer_nft: (this.txFromJSON),
        burn_nft: (this.txFromJSON),
        get_owner: (this.txFromJSON),
        nft_exists: (this.txFromJSON),
        update_metadata: (this.txFromJSON),
        get_metadata: (this.txFromJSON),
        mint_nft: (this.txFromJSON),
        validate_metadata: (this.txFromJSON),
        set_max_supply: (this.txFromJSON),
        get_max_supply: (this.txFromJSON),
        get_current_supply: (this.txFromJSON),
        initialize: (this.txFromJSON),
        verify_admin: (this.txFromJSON),
        get_admin: (this.txFromJSON),
        is_initialized: (this.txFromJSON)
    };
}

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
        contractId: "CCS7XKR3UV76MGC2XQ4ABLMTMGOUBTG2AQ4EGAL4L5CD2OQKP4X7A66G",
    }
};
/**
 * Error types for the follow system
 */
export const FollowError = {
    1: { message: "FollowLimitExceeded" },
    2: { message: "AlreadyFollowing" },
    3: { message: "NotFollowing" },
    4: { message: "InvalidCategory" },
    5: { message: "Unauthorized" },
    6: { message: "InvalidProductId" }
};
export const Errors = {
    1: { message: "AlreadyFollowing" },
    2: { message: "NotFollowing" },
    3: { message: "InvalidProduct" },
    4: { message: "NotificationFailed" }
};
export const ProductFollowError = {
    1: { message: "NotInitialized" },
    2: { message: "AlreadyInitialized" },
    3: { message: "UnauthorizedAccess" }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAgAAACFDYXRlZ29yaWVzIGZvciBmb2xsb3cgcHJlZmVyZW5jZXMAAAAAAAAAAAAADkZvbGxvd0NhdGVnb3J5AAAAAAADAAAAAAAAAAAAAAALUHJpY2VDaGFuZ2UAAAAAAAAAAAAAAAAHUmVzdG9jawAAAAAAAAAAAAAAAAxTcGVjaWFsT2ZmZXI=",
            "AAAAAgAAABxOb3RpZmljYXRpb24gcHJpb3JpdHkgbGV2ZWxzAAAAAAAAABROb3RpZmljYXRpb25Qcmlvcml0eQAAAAMAAAAAAAAAAAAAAANMb3cAAAAAAAAAAAAAAAAGTWVkaXVtAAAAAAAAAAAAAAAAAARIaWdo",
            "AAAAAgAAAClTdG9yYWdlIGtleXMgZm9yIG9yZ2FuaXppbmcgY29udHJhY3QgZGF0YQAAAAAAAAAAAAAIRGF0YUtleXMAAAAJAAAAAQAAAAAAAAAKRm9sbG93TGlzdAAAAAAAAQAAABMAAAABAAAAAAAAAA5Gb2xsb3dDYXRlZ29yeQAAAAAAAQAAABMAAAABAAAAAAAAAA1BbGVydFNldHRpbmdzAAAAAAAAAQAAABMAAAABAAAAAAAAABNOb3RpZmljYXRpb25IaXN0b3J5AAAAAAEAAAATAAAAAQAAAAAAAAALRm9sbG93TGltaXQAAAAAAQAAABMAAAABAAAAAAAAABFFeHBpcmF0aW9uVHJhY2tlcgAAAAAAAAEAAAATAAAAAQAAAAAAAAAQTGFzdE5vdGlmaWNhdGlvbgAAAAEAAAATAAAAAAAAAAAAAAAIQWxsVXNlcnMAAAABAAAAAAAAABBQcm9kdWN0Rm9sbG93ZXJzAAAAAQAAAAQ=",
            "AAAABAAAACFFcnJvciB0eXBlcyBmb3IgdGhlIGZvbGxvdyBzeXN0ZW0AAAAAAAAAAAAAC0ZvbGxvd0Vycm9yAAAAAAYAAAAAAAAAE0ZvbGxvd0xpbWl0RXhjZWVkZWQAAAAAAQAAAAAAAAAQQWxyZWFkeUZvbGxvd2luZwAAAAIAAAAAAAAADE5vdEZvbGxvd2luZwAAAAMAAAAAAAAAD0ludmFsaWRDYXRlZ29yeQAAAAAEAAAAAAAAAAxVbmF1dGhvcml6ZWQAAAAFAAAAAAAAABBJbnZhbGlkUHJvZHVjdElkAAAABg==",
            "AAAAAQAAAC5EYXRhIHN0cnVjdHVyZSByZXByZXNlbnRpbmcgYSBmb2xsb3dlZCBwcm9kdWN0AAAAAAAAAAAACkZvbGxvd0RhdGEAAAAAAAUAAAAAAAAACmNhdGVnb3JpZXMAAAAAA+oAAAfQAAAADkZvbGxvd0NhdGVnb3J5AAAAAAAAAAAACmV4cGlyZXNfYXQAAAAAA+gAAAAGAAAAAAAAAApwcm9kdWN0X2lkAAAAAAAEAAAAAAAAAAl0aW1lc3RhbXAAAAAAAAAGAAAAAAAAAAR1c2VyAAAAEw==",
            "AAAAAQAAACZVc2VyJ3MgZm9sbG93IHByZWZlcmVuY2VzIGFuZCBzZXR0aW5ncwAAAAAAAAAAABdOb3RpZmljYXRpb25QcmVmZXJlbmNlcwAAAAAEAAAAAAAAAApjYXRlZ29yaWVzAAAAAAPqAAAH0AAAAA5Gb2xsb3dDYXRlZ29yeQAAAAAAAAAAABJtdXRlX25vdGlmaWNhdGlvbnMAAAAAAAEAAAAAAAAACHByaW9yaXR5AAAH0AAAABROb3RpZmljYXRpb25Qcmlvcml0eQAAAAAAAAAEdXNlcgAAABM=",
            "AAAAAQAAACpUcmFja3MgZXZlbnRzIGJlZm9yZSBzZW5kaW5nIG5vdGlmaWNhdGlvbnMAAAAAAAAAAAAIRXZlbnRMb2cAAAAEAAAAAAAAAApldmVudF90eXBlAAAAAAfQAAAADkZvbGxvd0NhdGVnb3J5AAAAAAAAAAAACHByaW9yaXR5AAAH0AAAABROb3RpZmljYXRpb25Qcmlvcml0eQAAAAAAAAAKcHJvZHVjdF9pZAAAAAAACgAAAAAAAAAMdHJpZ2dlcmVkX2F0AAAABg==",
            "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABAAAAAAAAAAQQWxyZWFkeUZvbGxvd2luZwAAAAEAAAAAAAAADE5vdEZvbGxvd2luZwAAAAIAAAAAAAAADkludmFsaWRQcm9kdWN0AAAAAAADAAAAAAAAABJOb3RpZmljYXRpb25GYWlsZWQAAAAAAAQ=",
            "AAAABAAAAAAAAAAAAAAAElByb2R1Y3RGb2xsb3dFcnJvcgAAAAAAAwAAAAAAAAAOTm90SW5pdGlhbGl6ZWQAAAAAAAEAAAAAAAAAEkFscmVhZHlJbml0aWFsaXplZAAAAAAAAgAAAAAAAAASVW5hdXRob3JpemVkQWNjZXNzAAAAAAAD",
            "AAAAAAAAAC5Jbml0aWFsaXplcyB0aGUgY29udHJhY3Qgd2l0aCBhbiBhZG1pbiBhZGRyZXNzAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAASUHJvZHVjdEZvbGxvd0Vycm9yAAA=",
            "AAAAAAAAACJSZWdpc3RlcnMgYSBuZXcgdXNlciBpbiB0aGUgc3lzdGVtAAAAAAANcmVnaXN0ZXJfdXNlcgAAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
            "AAAAAAAAAAAAAAAHdXBncmFkZQAAAAABAAAAAAAAAA1uZXdfd2FzbV9oYXNoAAAAAAAD7gAAACAAAAABAAAD6QAAA+0AAAAAAAAH0AAAABJQcm9kdWN0Rm9sbG93RXJyb3IAAA==",
            "AAAAAAAAACFSZXR1cm5zIHRoZSBjdXJyZW50IGFkbWluIGFkZHJlc3MAAAAAAAAJZ2V0X2FkbWluAAAAAAAAAAAAAAEAAAPpAAAAEwAAB9AAAAASUHJvZHVjdEZvbGxvd0Vycm9yAAA=",
            "AAAAAAAAACdUcmFuc2ZlcnMgYWRtaW4gcmlnaHRzIHRvIGEgbmV3IGFkZHJlc3MAAAAADnRyYW5zZmVyX2FkbWluAAAAAAABAAAAAAAAAAluZXdfYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAASUHJvZHVjdEZvbGxvd0Vycm9yAAA=",
            "AAAAAAAAAAAAAAAOZm9sbG93X3Byb2R1Y3QAAAAAAAMAAAAAAAAABHVzZXIAAAATAAAAAAAAAApwcm9kdWN0X2lkAAAAAAAEAAAAAAAAAApjYXRlZ29yaWVzAAAAAAPqAAAH0AAAAA5Gb2xsb3dDYXRlZ29yeQAAAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
            "AAAAAAAAAAAAAAAQdW5mb2xsb3dfcHJvZHVjdAAAAAIAAAAAAAAABHVzZXIAAAATAAAAAAAAAApwcm9kdWN0X2lkAAAAAAAEAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
            "AAAAAAAAAAAAAAAMaXNfZm9sbG93aW5nAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAACnByb2R1Y3RfaWQAAAAAAAQAAAABAAAAAQ==",
            "AAAAAAAAAAAAAAATbm90aWZ5X3ByaWNlX2NoYW5nZQAAAAACAAAAAAAAAApwcm9kdWN0X2lkAAAAAAAEAAAAAAAAAAluZXdfcHJpY2UAAAAAAAAGAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
            "AAAAAAAAAAAAAAAObm90aWZ5X3Jlc3RvY2sAAAAAAAEAAAAAAAAACnByb2R1Y3RfaWQAAAAAAAQAAAABAAAD6QAAA+0AAAAAAAAAAw==",
            "AAAAAAAAAAAAAAAUbm90aWZ5X3NwZWNpYWxfb2ZmZXIAAAABAAAAAAAAAApwcm9kdWN0X2lkAAAAAAAEAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
            "AAAAAAAAAAAAAAAcc2V0X25vdGlmaWNhdGlvbl9wcmVmZXJlbmNlcwAAAAIAAAAAAAAABHVzZXIAAAATAAAAAAAAAAtwcmVmZXJlbmNlcwAAAAfQAAAAF05vdGlmaWNhdGlvblByZWZlcmVuY2VzAAAAAAEAAAPpAAAD7QAAAAAAAAAD",
            "AAAAAAAAAAAAAAAcZ2V0X25vdGlmaWNhdGlvbl9wcmVmZXJlbmNlcwAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAfQAAAAF05vdGlmaWNhdGlvblByZWZlcmVuY2VzAAAAAAM=",
            "AAAAAAAAAAAAAAAYZ2V0X25vdGlmaWNhdGlvbl9oaXN0b3J5AAAAAQAAAAAAAAAEdXNlcgAAABMAAAABAAAD6QAAA+oAAAfQAAAACEV2ZW50TG9nAAAAAw==",
            "AAAAAAAAAAAAAAANZ2V0X2ZvbGxvd2VycwAAAAAAAAEAAAAAAAAACnByb2R1Y3RfaWQAAAAAAAQAAAABAAAD6gAAABM="]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        register_user: (this.txFromJSON),
        upgrade: (this.txFromJSON),
        get_admin: (this.txFromJSON),
        transfer_admin: (this.txFromJSON),
        follow_product: (this.txFromJSON),
        unfollow_product: (this.txFromJSON),
        is_following: (this.txFromJSON),
        notify_price_change: (this.txFromJSON),
        notify_restock: (this.txFromJSON),
        notify_special_offer: (this.txFromJSON),
        set_notification_preferences: (this.txFromJSON),
        get_notification_preferences: (this.txFromJSON),
        get_notification_history: (this.txFromJSON),
        get_followers: (this.txFromJSON)
    };
}

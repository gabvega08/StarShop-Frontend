import axios, { AxiosInstance } from "axios";

export class BaseApi {
    protected axios: AxiosInstance;

    constructor(baseURL = process.env.NEXT_BASE_URL) {
        this.axios = axios.create({
            baseURL: baseURL, timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
}
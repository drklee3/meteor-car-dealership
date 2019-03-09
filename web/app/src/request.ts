import axios from "axios";
import * as url from "url";
import constants from "./constants";

export function request(endpoint: string) {
    const queryUrl = build_url(endpoint);
    return axios.get(queryUrl);
}

/**
 * Builds the full URL from a given API endpoint
 * @param endpoint 
 */
function build_url(endpoint: string): string {
    const queryUrl = url.resolve(constants.API_BASE_URL, endpoint);
    return queryUrl.toString();
}

import axios from "axios";
import * as React from "react";
import constants from "./constants";
import {RepairJobListingState} from "./components/RepairJobListing";

type requestType = "get" | "post";

export function request(type: requestType, endpoint: string, data?: FormData) {
    const queryUrl = build_url(endpoint);

    if (type === "get") {
        return axios.get(queryUrl);
    }

    return axios.post(queryUrl, data);
}

/**
 * Builds the full URL from a given API endpoint
 * @param endpoint 
 */
function build_url(endpoint: string): string {
    const queryUrl = constants.API_BASE_URL + endpoint;
    console.log(queryUrl);
    return queryUrl;
}

export function new_repair_job(e: React.RefObject<HTMLFormElement>) {
    if (!e.current) {
        return;
    }
    console.log(e.current);
    const data = new FormData(e.current);

    new Response(data).text().then(console.log);

    return request("post", constants.NEW_REPAIR_JOB, data);
}

export function get_repair_jobs(state: RepairJobListingState) {
    const data = new FormData();
    data.append("binds[start_date]", `${state.start_date} ${state.start_time}`);
    data.append("binds[end_date]", `${state.end_date} ${state.end_time}`);
    new Response(data).text().then(console.log);

    return request("post", constants.GET_REPAIR_JOB, data);
}

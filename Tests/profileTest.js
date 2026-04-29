import { sleep } from "k6";
import { Test_Config } from "../config/constants.js";
import { Payloads } from "../Data/payloads.js";
import { loginRequest } from "../Request/authRequest.js";
import { getprofileRequest } from "../Request/profileRequest.js";
import { validateLoginResponse } from "../checks/authChecks.js";

export const options = {
    vus: Test_Config.vus,
    duration: Test_Config.duration,
};

export default function () {
    const loginResponse = loginRequest(Payloads.login);
    validateLoginResponse(loginResponse);

    const body = loginRequest.json();
    const token = body.data.token;

    const profileResponse = getprofileRequest(token);
    console.log(`Profile response status: ${profileResponse.status}`);
    console.log(`Profile response body: ${profileResponse.body}`);

}
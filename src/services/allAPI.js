import { commonAPI } from "./commonAPI"
import {serverURL} from "./serverURL"

// register request
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST",`${serverURL}/register`,reqBody,"")
}

// login request
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST",`${serverURL}/login`,reqBody,"")
}
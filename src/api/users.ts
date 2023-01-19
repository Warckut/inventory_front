import axios from "axios";
import $api, { API_URL, } from "../http";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/responce/AuthResponse";

// export async function getCurrentUser(): Promise<AuthResponse> {
    // try {
    //     axios.get(`${API_URL}/refresh`)
    //         .then(response => { 
    //         // do stuff 
    //         }) 
    //         .catch(err => { 
    //         // what now? 
    //         console.log(err.response); 
    //         })
    //     axios.get(`${API_URL}/refresh`)
    //     const response = await $api.get("/refresh")
    //     return response.data;
    //     const response =await axios.get(`${API_URL}/refresh`, {withCredentials: true})
    //     return response.data
    // } catch (e: any) {
    //     console.log(e.response)
    //     throw e
    // }

    // axios.get(``)
// }


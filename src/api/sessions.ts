import axios from "axios";
import $api, { API_URL } from "../http";
import { AuthResponse } from "../models/responce/AuthResponse";

export async function login(params: {
    email: string;
    password: string;
}): Promise<AuthResponse> {
    const responce = await $api.post<AuthResponse>(`/login`, { ...params})
    return responce.data
}

export async function registration(params: {
    email: string;
    password: string;
}): Promise<AuthResponse> {
    const responce = await $api.post<AuthResponse>(`/registration`, { ...params})
    return responce.data
}

export async function logout(): Promise<void> {

    return await $api.post('/logout')
}

export async function checkAuth(): Promise<AuthResponse> {
    console.log("checkout")
    const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
    return response.data;
}
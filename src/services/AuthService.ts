import { API_URL } from "../http";
import axios, {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/responce/AuthResponse";
import { IUser } from "../models/IUser";

// export const Authentification = {
//     isAuth: false,
//     async signin(email: string, password: string) {
//         try {
//             return await $api.post<AuthResponse>('/login', { email, password})

//         } catch(error) {
//             return (error);
//         }
//     },
//     async registration(email: string, password: string) {
//         try {
//             return await $api.post<AuthResponse>('/registration', {email, password})
//         } catch(error) {
//             return error;
//         }
//     },
//     async logout() {
//         try {
//             return await $api.post('/logout')
//         } catch(error) {
//             return error;
//         }
//     },
//     async checkAuth() {
//         try {
//             return await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
//         } catch(error) {
//             return error;
//         } 
//     }
// }

// export default class AuthService {
//     static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
//         return $api.post<AuthResponse>('/login', {email, password})
//     }

//     static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
//         return $api.post<AuthResponse>('/registration', {email, password})
//     }

//     static async logout(): Promise<void> {
//         return $api.post('/logout')
//     }

// }


import axios from "axios";

export default class UserService {
    static fetchUsers() {
        return axios.get<[]>('/users')
    }
}
import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (login,email,password,Name,LastName,SurName,phone) => {
    try {
        const response = await $host.post('api/user/registration', { login, email, password, Name, LastName, SurName, phone, role: 'Admin' });
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            return jwtDecode(response.data.token);
        } else {
            throw new Error('Unexpected response format');}
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}

export const logins = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
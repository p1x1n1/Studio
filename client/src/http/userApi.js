import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (login,email,password_,name_,lastname,surname,phone) => {
    try {
        const response = await $host.post('api/registration', { login, email, password_, name_, lastname, surname, phone,order_sum:0});
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

export const logins = async (login, password_) => {
    console.log('logins');
    const {data} = await $host.post('api/login', {login, password_})
    localStorage.setItem('token', data.token)
    return data.user
}

export const check = async () => {
    console.log('check');
    const {data} = await $authHost.get('api/auth' )
    localStorage.setItem('token', data.token)
    return data.user
}

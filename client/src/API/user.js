import axios from 'axios';
import { authUrl, loginUrl, registrationUrl } from '../Config/serverAPI';
import jwt_decode from 'jwt-decode'

export const login = async (email, password) => {
    const { data } = await axios.post(loginUrl, { email, password });
    localStorage.setItem('jwtToken', data.token)
    return jwt_decode(data.token);
}

export const registration = async (email, password, name, phone, role = 'USER') => {
    const { data } = await axios.post(registrationUrl, { email, password, name, phone, role })
    localStorage.setItem('jwtToken', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const token = localStorage.getItem("jwtToken");
    if (token && token !== "undefined") {
        const { data } = await axios.get(authUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        localStorage.setItem('jwtToken', data.token)
        return jwt_decode(data.token)
    }
    return false;
}
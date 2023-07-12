import axios from "axios";
import { createBasketUrl } from "../Config/serverAPI";

export const createBasket = async (dataObj) => {
    const token = localStorage.getItem("jwtToken");
    if (token && token !== "undefined") {
        const { data } = await axios.post(createBasketUrl, dataObj, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data;
    }
    return false;
}


export const getBasket = async (id) => {
    const token = localStorage.getItem("jwtToken");
    if (token && token !== "undefined") {
        const { data } = await axios.get(createBasketUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                userId: id
            }
        });
        return data;
    }
    return false;
}
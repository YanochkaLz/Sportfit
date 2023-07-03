import axios from "axios";
import { createItemUrl, getAllItemsUrl, getOneItemUrl } from "../Config/serverAPI";

export const createItem = async (dataObj) => {
    const token = localStorage.getItem("jwtToken");
    if (token && token !== "undefined") {
        const { data } = await axios.post(createItemUrl, dataObj, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data;
    }
    return false;
}

export const getItems = async (typeId, page = 1, limit = 12) => {
    const { data } = await axios.get(getAllItemsUrl, {
        params: {
            typeId, page, limit
        }
    });
    return data;
}

export const getItem = async (id) => {
    const { data } = await axios.get(`${getOneItemUrl}/${id}`);
    return data;
}
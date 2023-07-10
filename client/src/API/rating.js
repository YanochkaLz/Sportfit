import { createRatingUrl } from "../Config/serverAPI";
import axios from 'axios';

export const createRating = async (dataObj) => {
    const token = localStorage.getItem("jwtToken");

    if (token && token !== "undefined") {
        const { data } = await axios.post(createRatingUrl, dataObj, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data;
    }
    return false;
}

export const getInfoItem = async (userId, itemId) => {
    const { data } = await axios.get(createRatingUrl, {params:{ userId, itemId} })
    return data;
}
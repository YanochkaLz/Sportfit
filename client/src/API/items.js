import axios from "axios";
import { createItemUrl } from "../Config/serverAPI";

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
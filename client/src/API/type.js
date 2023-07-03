import axios from "axios";
import { createTypeUrl, getAllTypesUrl } from "../Config/serverAPI";

export const createType = async (name) => {
    const token = localStorage.getItem("jwtToken");
    if (token && token !== "undefined") {
        const { data } = await axios.post(createTypeUrl, { name }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data;
    }
    return false;
}

export const getTypes = async () => {
    const { data } = await axios.get(getAllTypesUrl);
    return data;
}
import {configureStore} from "@reduxjs/toolkit"
import typesSlice from "../features/typesSlice"
import ordersSlice from "../features/ordersSlice"


export const store = configureStore({
    reducer: {
        types: typesSlice,
        orders: ordersSlice
    }
})
import {configureStore} from "@reduxjs/toolkit"
import typesSlice from "../features/typesSlice"


export const store = configureStore({
    reducer: {
        types: typesSlice
    }
})
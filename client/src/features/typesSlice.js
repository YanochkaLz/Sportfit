import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    types: []
}


export const typesSlice = createSlice({
    name: 'types',
    initialState,  
    reducers: {
        setStoreTypes: (state, action) => {
            state.types = [...action.payload];
        },

    }
})

export const { setStoreTypes } = typesSlice.actions;
export default typesSlice.reducer;
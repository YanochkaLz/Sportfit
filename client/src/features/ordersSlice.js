import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: null
}


export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrdersState: (state, action) => {
            state.order = action.payload;
        },

    }
})

export const { setOrdersState } = ordersSlice.actions;
export default ordersSlice.reducer;
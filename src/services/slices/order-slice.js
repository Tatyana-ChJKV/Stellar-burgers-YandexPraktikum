import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BASE_URL} from "../../utils/api";
import {checkResponse} from "../../utils/check-response";

const initialState = {
    order: null,
    isLoading: false,
    error: null
};

export const makeOrder = createAsyncThunk(
    'order/makeOrder',
    async (ingredients) => {
            const response = await fetch(`${BASE_URL}/orders`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(ingredients),
            })
            return checkResponse(response);
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(makeOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(makeOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(makeOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export default orderSlice.reducer;
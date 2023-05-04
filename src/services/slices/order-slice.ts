import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';
import {checkResponse} from "../../utils/request";
import {TCard} from "../../utils/types";
import {BASE_URL} from "../../utils/url";

interface IOrderSliceState {
    order: TCard | null;
    isLoading: boolean;
    error: SerializedError | null | unknown;
    number: number | null;
}

const initialState: IOrderSliceState = {
    order: null,
    isLoading: false,
    error: null,
    number: null
};

type TIngredientsId = {
    ingredients: string[]
}

export const makeOrder = createAsyncThunk<TCard, TIngredientsId>(
    'order/makeOrder',
    async (ingredients) => {
        const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredients),
        })
        return checkResponse(response);
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(makeOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.number = null;
            })
            .addCase(makeOrder.fulfilled, (state, action) => {
                state.order = action.payload;
                state.isLoading = false;
                state.error = null;
                // state.number =
            })
            .addCase(makeOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export default orderSlice.reducer;
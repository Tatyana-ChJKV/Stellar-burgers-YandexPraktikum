import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';
import {checkResponse} from "../../../utils/request";
import {BASE_URL} from "../../../utils/url";
import {getCookie} from "../../../utils/cookie";

interface IOrderSliceState {
    order: TOrderResponse | null;
    isLoading: boolean;
    error: SerializedError | null | unknown;
}

export const initialState: IOrderSliceState = {
    order: null,
    isLoading: false,
    error: null,
};

type TIngredientsId = {
    ingredients: string[]
};

type TOrderResponse = {
    success: boolean;
    name: string;
    order: {
        number: number;
    };
};

export const makeOrder = createAsyncThunk<TOrderResponse, TIngredientsId>(
    'order/makeOrder',
    async (ingredients) => {
        const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                authorization: getCookie("accessToken"),
            } as HeadersInit,
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
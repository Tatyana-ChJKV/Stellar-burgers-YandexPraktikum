import {createAsyncThunk, createSlice, SerializedError} from "@reduxjs/toolkit";
import {checkResponse,} from "../../utils/request";
import {TCard} from "../../utils/types";
import {ThunkApi} from "../store";
import {BASE_URL} from "../../utils/url";

interface IIngredientSliceState {
    data: TCard[];
    isLoading: boolean;
    error: SerializedError | null | unknown;
}

const initialState: IIngredientSliceState = {
    data: [],
    isLoading: false,
    error: null,
};

export const receiveIngredients = createAsyncThunk<TCard[], void, ThunkApi>(
    'ingredients/receiveIngredients',
    async (_) => {
        return await fetch(`${BASE_URL}/ingredients`)
            .then(checkResponse)
            .then(data => {
                if (data.success) {
                    return data.data;
                }
            })
    }
);

export const ingredientSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(receiveIngredients.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(receiveIngredients.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = true;
            })
            .addCase(receiveIngredients.rejected, (state, action) => {
                state.isLoading = true;
                state.error = action.payload;
            })
    }
});

export default ingredientSlice.reducer;
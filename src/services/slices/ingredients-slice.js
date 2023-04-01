import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getIngredients} from "../../utils/get-ingredients";

const initialState = {
    data: [],
    isLoading: false,
    error: null
};

export const receiveIngredients = createAsyncThunk(
    'ingredients/receiveIngredients',
    async (_, {rejectWithValue}) => {
        try {
            const data = await getIngredients();
            if (!Array.isArray(data)) {
                return rejectWithValue({message: 'Ошибка в получении данных', statusCode: 404})
            }
            return data;
        } catch (error) {
            if (error.statusCode) {
                return rejectWithValue(error)
            }
            return rejectWithValue({message: 'Ошибка на стороне сервера'})
        }
    }
);

export const ingredientSlice = createSlice({
    name: 'ingredients',
    initialState,
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
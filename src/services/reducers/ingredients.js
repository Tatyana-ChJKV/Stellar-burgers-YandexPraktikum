// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
//
// const initialState = {
//     data: [],
//     isLoading: false,
//     error: null
// }
//
// const API = 'https://norma.nomoreparties.space/api/ingredients';
//
// function getIngredients() {
//     fetch(API)
//         .then(res => {
//             if (res.ok) {
//                 return res.json();
//             }
//             return Promise.reject(res.status);
//         })
//         .then(res => {
//             setIngredients(res.data)
//         })
//         .catch(err => {
//             console.log(err)
//         })
//         .finally(() => {
//             setIsLoading(true)
//         })
// }
//
// const fetchUserById = createAsyncThunk(
//     'ingredients/fetchIngredients',
//     async (userId, thunkAPI) => {
//         const response = await getIngredients()
//         return response.data
//     }
// )
//
// export const counterSlice = createSlice({
//     name: 'ingredients',
//     initialState,
//     reducers: {
//         addIngredient: () => {
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase()
//     },
// })
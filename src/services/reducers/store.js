import {configureStore} from "@reduxjs/toolkit";
import ingredients from "./ingredients";

export const store = configureStore({
    reducer: {
        ingredientsStore: ingredients
    },
})

export default store;
import {configureStore} from "@reduxjs/toolkit";
import ingredients from "./ingredients";
import constructor from "./constructor";

export const store = configureStore({
    reducer: {
        ingredientsStore: ingredients,
        constructorStore: constructor
    },
})

export default store;
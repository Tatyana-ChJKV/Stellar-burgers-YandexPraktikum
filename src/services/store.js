import {configureStore} from "@reduxjs/toolkit";
import ingredients from "./slices/ingredientsSlice";
import constructor from "./slices/constructorSlice";
import order from "./slices/orderSlice"

export const store = configureStore({
    reducer: {
        ingredientsStore: ingredients,
        constructorStore: constructor,
        orderStore: order
    },
})

export default store;
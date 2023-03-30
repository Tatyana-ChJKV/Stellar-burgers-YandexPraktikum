import {configureStore} from "@reduxjs/toolkit";
import ingredients from "./ingredients";
import constructor from "./constructor";
import order from "./order"

export const store = configureStore({
    reducer: {
        ingredientsStore: ingredients,
        constructorStore: constructor,
        orderStore: order
    },
})

export default store;
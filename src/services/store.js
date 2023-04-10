import {configureStore} from "@reduxjs/toolkit";
import ingredients from "./slices/ingredients-slice";
import constructor from "./slices/constructor-slice";
import order from "./slices/order-slice"

export const store = configureStore({
    reducer: {
        ingredientsStore: ingredients,
        constructorStore: constructor,
        orderStore: order
    },
})

export default store;
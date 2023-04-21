import {configureStore} from "@reduxjs/toolkit";
import ingredients from "./slices/ingredients-slice";
import constructor from "./slices/constructor-slice";
import order from "./slices/order-slice";
import authorization from "./slices/authorization-slice";
import burgerApi from "../utils/api"

export const store = configureStore({
    reducer: {
        ingredientsStore: ingredients,
        constructorStore: constructor,
        orderStore: order,
        authorizationStore: authorization
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: burgerApi,
            },
        }),
});

export default store;
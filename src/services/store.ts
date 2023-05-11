import {configureStore} from "@reduxjs/toolkit";
import ingredients from "./slices/ingredients/ingredients-slice";
import constructor from "./slices/constructor/constructor-slice";
import order from "./slices/order/order-slice";
import authorization from "./slices/authorization/authorization-slice";
import {ordersReducer} from "./slices/orders/reducer";
import {feedReducer} from "./slices/feed/reducer"
import burgerApi, {BurgerApi} from "../utils/burger-api";
import {socketMiddleware} from "./middleware/socket-middleware";
import {
    wsCloseOrder,
    wsConnectingOrder,
    wsConnectOrder,
    wsDisconnectOrder,
    wsErrorOrder,
    wsMessageOrder,
    wsOpenOrder
} from "./slices/orders/actions";
import {
    wsCloseFeed,
    wsConnectFeed,
    wsConnectingFeed,
    wsDisconnectFeed, wsErrorFeed,
    wsMessageFeed,
    wsOpenFeed
} from "./slices/feed/actions";

const wsActionsFeed = {
    wsConnect: wsConnectFeed,
    wsDisconnect: wsDisconnectFeed,
    wsConnecting: wsConnectingFeed,
    wsOpen: wsOpenFeed,
    wsClose: wsCloseFeed,
    wsError: wsErrorFeed,
    wsMessage: wsMessageFeed
};

const wsActionsOrder = {
    wsConnect: wsConnectOrder,
    wsDisconnect: wsDisconnectOrder,
    wsConnecting: wsConnectingOrder,
    wsOpen: wsOpenOrder,
    wsClose: wsCloseOrder,
    wsError: wsErrorOrder,
    wsMessage: wsMessageOrder,
}

const websocketMiddleware = socketMiddleware(wsActionsOrder)
const websocketFeedMiddleware = socketMiddleware(wsActionsFeed);

export const store = configureStore({
    reducer: {
        ingredientsStore: ingredients,
        constructorStore: constructor,
        orderStore: order,
        authorizationStore: authorization,
        feedStore: feedReducer,
        ordersStore: ordersReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: burgerApi,
            },
        }).concat(websocketMiddleware, websocketFeedMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkApi = {
    extra: BurgerApi;
    dispatch: AppDispatch;
};
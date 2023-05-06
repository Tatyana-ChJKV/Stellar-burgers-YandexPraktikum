import { createReducer } from '@reduxjs/toolkit'
import { wsCloseOrder, wsConnectingOrder, wsErrorOrder, wsMessageOrder, wsOpenOrder } from './actions';
import {TOrderList} from "../../../utils/types";

interface TOrderState {
    data: TOrderList | null;
}

const initialState: TOrderState = {
    data: null
};

export const ordersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnectingOrder, (state) => {
        })
        .addCase(wsOpenOrder, (state) => {
            console.log('OPEN WEBSOCKET');
        })
        .addCase(wsCloseOrder, (state) => {
            console.log('CLOSE WEBSOCKET');
        })
        .addCase(wsErrorOrder, (state, action) => {
        })
        .addCase(wsMessageOrder, (state, action) => {
            console.log('wsMessageOrder', action.payload);
            state.data = action.payload
        })
});
import { createReducer } from '@reduxjs/toolkit'
import { wsCloseFeed, wsConnectingFeed, wsErrorFeed, wsMessageFeed, wsOpenFeed } from './actions';
import {TOrderList} from "../../../utils/types";

interface TOrderState {
    data: TOrderList | null
}

const initialState: TOrderState = {
    data: null
}

export const feedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnectingFeed, (state) => {
        })
        .addCase(wsOpenFeed, (state) => {
            console.log('OPEN WEBSOCKET');
        })
        .addCase(wsCloseFeed, (state) => {
            console.log('CLOSE WEBSOCKET');
        })
        .addCase(wsErrorFeed, (state, action) => {
        })
        .addCase(wsMessageFeed, (state, action) => {
            console.log('wsMessageFeed_feed', action.payload);
            state.data = action.payload;
        })
});

import {createReducer} from '@reduxjs/toolkit'
import {wsMessageFeed} from './actions';
import {TOrderList} from "../../../utils/types";

interface TOrderState {
    data: TOrderList | null
}

export const initialState: TOrderState = {
    data: null
}

export const feedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsMessageFeed, (state, action) => {
            console.log('wsMessageFeed_feed', action.payload);
            state.data = action.payload;
        })
});
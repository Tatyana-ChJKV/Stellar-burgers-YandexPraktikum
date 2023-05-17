import {createReducer} from '@reduxjs/toolkit'
import {wsMessageOrder} from './actions';
import {TOrderList} from "../../../utils/types";

interface TOrderState {
    data: TOrderList | null;
}

export const initialState: TOrderState = {
    data: null
};

export const ordersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsMessageOrder, (state, action) => {
            state.data = action.payload;
        })
});
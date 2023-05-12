import orderSlice, {initialState, makeOrder} from "./order-slice";
import {testIngredientMain, testError} from "../../../utils/test-constants";

describe("order reducer", () => {
    it('should return initial state', () => {
        expect(orderSlice(undefined, {type: ''})).toEqual(initialState)
    })
    it('should handle makeOrder.pending', () => {
        expect(orderSlice(initialState, {type: makeOrder.pending.type}))
            .toEqual({...initialState, isLoading: true, error: null, number: null})
    })
    it('should handle makeOrder.fulfilled', () => {
        expect(orderSlice(initialState, {type: makeOrder.fulfilled.type, payload: testIngredientMain}))
            .toEqual({...initialState, order: testIngredientMain, isLoading: false, error: null})
    })
    it('should handle makeOrder.rejected', () => {
        expect(orderSlice(initialState, {type: makeOrder.rejected.type, payload: testError}))
            .toEqual({...initialState, isLoading: false, error: testError})
    })
})
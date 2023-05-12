import ingredientSlice, {receiveIngredients} from "./ingredients-slice";
import {initialState} from "./ingredients-slice"
import {testError, testIngredientsArray} from "../../../utils/test-constants";

describe("ingredient reducer", () => {
    it('should return initial state', () => {
        expect(ingredientSlice(undefined, {type: ''})).toEqual(initialState)
    })
    it('should handle makeOrder.pending', () => {
        expect(ingredientSlice(initialState, {type: receiveIngredients.pending.type}))
            .toEqual({...initialState, isLoading: true, error: null})
    })
    it('should handle makeOrder.fulfilled', () => {
        expect(ingredientSlice(initialState, {
            type: receiveIngredients.fulfilled.type,
            payload: [testIngredientsArray]
        }))
            .toEqual({...initialState, data: [testIngredientsArray], isLoading: true})
    })
    it('should handle makeOrder.rejected', () => {
        expect(ingredientSlice(initialState, {type: receiveIngredients.rejected.type, payload: testError}))
            .toEqual({...initialState, isLoading: true, error: testError})
    })
})
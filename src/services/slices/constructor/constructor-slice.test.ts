import constructorReducer, {addIngredient, clearConstructor, orderIngredients} from './constructor-slice'
import {initialState} from "./constructor-slice";
import {testIngredientBun, testIngredientMain, testIngredientsArray} from "../../../utils/test-constants";
import {v4 as uuidv4} from "uuid";

describe("constructor reducer", () => {
    it('should return initial state', () => {
        expect(constructorReducer(undefined, {type: ''}))
            .toEqual(initialState)
    })
    it('should handle clearConstructor action', () => {
        const state = {
            bun: null,
            ingredients: [],
            counters: {}
        };
        expect(constructorReducer(initialState, {type: clearConstructor.type, payload: state}))
            .toEqual({...initialState})
    })
    // it('should handle addIngredient action', () => {
    //     expect(constructorReducer(initialState, {type: addIngredient.type, payload: testIngredientMain}))
    //         .toEqual({
    //             ...initialState,
    //             bun: null,
    //             ingredients: [testIngredientMain],
    //             counters: {[testIngredientMain._id]: 1},
    //             uuid: uuidv4()
    //         })
    // })
    // it('should handle addIngredientBun action', () => {
    //     expect(constructorReducer(initialState, {type: addIngredient.type, payload: testIngredientBun}))
    //         .toEqual({
    //             ...initialState,
    //             bun: testIngredientBun,
    //             ingredients: [],
    //             counters: {[testIngredientBun.uuid]: 2},
    //             // uuid: uuidv4()
    //         })
    // })
    // it('should handle addIngredient action', () => {
    //     expect(constructorReducer(initialState, {type: addIngredient.type, payload: testIngredientMain}))
    //         .toEqual({
    //             ...initialState,
    //             bun: null,
    //             ingredients: [testIngredientMain],
    //             counters: {[testIngredientMain._id]: 1}
    //         })
    // })
    // it('should handle orderIngredients action', () => {
    //     const state = {
    //         bun: null,
    //         ingredients: [],
    //         counters: {}
    //     };
    //     expect(constructorReducer(initialState, {type: orderIngredients.type, payload: state}))
    //         .toEqual({...initialState})
    // })
})
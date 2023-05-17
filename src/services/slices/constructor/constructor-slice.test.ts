import constructorReducer, {
    addIngredient,
    clearConstructor,
} from './constructor-slice'
import {initialState} from "./constructor-slice";
import {testIngredientBun, testIngredientMain, testIngredientsArray} from "../../../utils/test-constants";

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
    it('should handle addMainIngredient action', () => {
        const ingredientWithUuid = {
            calories: 420,
            carbohydrates: 33,
            fat: 244,
            image: "https://code.s3.yandex.net/react/code/meat-02.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            name: "Мясо бессмертных моллюсков Protostomia",
            price: 1337,
            proteins: 433,
            type: "main",
            __v: 0,
            _id: "643d69a5c3f7b9001cfa093f",
            uuid: expect.stringMatching("")
        };
        expect(constructorReducer(initialState, {type: addIngredient.type, payload: testIngredientMain}))
            .toEqual({
                ...initialState,
                bun: null,
                ingredients: [ingredientWithUuid],
                counters: {[testIngredientMain._id]: 1}
            })
    })
    it('should handle addBunIngredient action', () => {
        const bunWithUuid = {
            calories: 643,
            carbohydrates: 85,
            fat: 26,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            name: "Флюоресцентная булка R2-D3",
            price: 988,
            proteins: 44,
            type: "bun",
            __v: 0,
            _id: "60d3b41abdacab0026a733c7",
            uuid: expect.stringMatching("")
        };
        expect(constructorReducer(initialState, {type: addIngredient.type, payload: testIngredientBun}))
            .toEqual({
                ...initialState,
                bun: bunWithUuid,
                ingredients: [],
                counters: {[testIngredientBun._id]: 2}
            })
    })
})
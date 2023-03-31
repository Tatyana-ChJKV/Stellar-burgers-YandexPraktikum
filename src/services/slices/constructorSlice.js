import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";

const initialState = {
    bun: null,
    ingredients: [],
    counters: {}
}

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        addIngredient: (state, action) => {
            if (action.payload.type === 'bun') {
                if (state.bun) {
                    state.counters[state.bun._id] = 0
                }
                state.bun = {...action.payload, uuid: uuidv4()}
                 state.counters[action.payload._id] = 2
            }
            if (action.payload.type !== 'bun') {
            state.ingredients.push({...action.payload, uuid: uuidv4()})
            state.counters[action.payload._id] = state.counters[action.payload._id] ? state.counters[action.payload._id] + 1 : 1
            }
        },
        deleteIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(ingredients => (
                ingredients.uuid !== action.payload.uuid
            ))
            state.counters[action.payload._id] = state.counters[action.payload._id] - 1
        },
        orderIngredients: (state, action) => {
            const {dragIndex, hoverIndex} = action.payload;
            const dragIngredients = state.ingredients[dragIndex];

            state.ingredients.splice(dragIndex, 1);
            state.ingredients.splice(hoverIndex, 0, dragIngredients);
        },
        clearConstructor: (state) => {
            state.bun = initialState.bun
            state.ingredients = initialState.ingredients
            state.counters = initialState.counters
        }
    }
});

export const {
    addIngredient,
    deleteIngredient,
    orderIngredients,
    clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;


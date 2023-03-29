import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";
// import ingredients from "./ingredients";
// import ingredients from "./ingredients";

const initialState = {
    bun: null,
    ingredients: [],
    counters: {},
    // price: 0
}

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        addIngredient: (state, action) => {
            if (action.payload.type === 'bun') {
                state.bun = {...action.payload, uuid: uuidv4()}
                // state.counters[state.bun.uuid] = 0
            }
            // state.counters[action.payload.uuid] = 2

            // if (action.payload.type !== 'bun') {
            state.ingredients.push({...action.payload, uuid: uuidv4()})
            state.counters[action.payload.uuid] = state.counters[action.payload.uuid] ? state.counters[action.payload.uuid] + 1 : 1
            // }
        },
        deleteIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(ingredients => (
                ingredients.uuid !== action.payload.uuid
            ))
        },
        orderIngredients: (state, action) => {
            const {dragIndex, hoverIndex} = action.payload;
            const dragIngredients = state.ingredients[dragIndex];

            state.ingredients.splice(dragIndex, 1);
            state.ingredients.splice(hoverIndex, 0, dragIngredients);
        }
    }
})

export const {addIngredient, deleteIngredient, orderIngredients} = constructorSlice.actions;
export default constructorSlice.reducer;


import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";
// import ingredients from "./ingredients";

const initialState = {
    bun: null,
    ingredients: [],
    counters: {}
}

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        addConstructor: (state, action) => {
            // console.log(action);
            console.log(action.payload.type)

            if (action.payload.type === 'bun') {
                state.bun = { ...action.payload, uuid:uuidv4() }
                // state.counters[state.bun.uuid] = 0
            }
            state.ingredients.push({ ...action.payload, uuid:uuidv4() })
            state.counters[action.payload.uuid] = state.counters[action.payload.uuid] ? state.counters[action.payload.uuid] + 1 : 1
        }
    }
})

export const {addConstructor} = constructorSlice.actions;
export default constructorSlice.reducer;


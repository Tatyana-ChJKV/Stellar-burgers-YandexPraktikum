import {initialState, ordersReducer} from "./reducer";
import {wsMessageOrder} from "./actions";

describe("orders reducer", () => {
    it('should return initial state', () => {
        expect(ordersReducer(undefined, {type: ''}))
            .toEqual(initialState)
    })
    it('should handle ordersReducer', () => {
        const data = {
            success: true,
            orders: [1, 2, 3],
            total: 3,
            totalToday: 4,
        }
        expect(ordersReducer(initialState, {type: wsMessageOrder.type, payload: data }))
            .toEqual({...initialState, data: data})
    })
})
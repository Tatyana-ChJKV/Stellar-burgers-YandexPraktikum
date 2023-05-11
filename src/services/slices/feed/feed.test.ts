import {initialState, feedReducer} from "./reducer";
import {wsMessageFeed} from "./actions";

describe("orders reducer", () => {
    it('should return initial state', () => {
        expect(feedReducer(undefined, {type: ''}))
            .toEqual(initialState)
    })
    it('should handle ordersReducer', () => {
        const data = {
            success: true,
            orders: [1, 2, 3],
            total: 3,
            totalToday: 4,
        }
        expect(feedReducer(initialState, {type: wsMessageFeed.type, payload: data }))
            .toEqual({...initialState, data: data})
    })
})
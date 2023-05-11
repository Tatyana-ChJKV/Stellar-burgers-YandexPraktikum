import userReducer, {
    authCheck,
    checkUserAuth,
    forgotPassword,
    loginUser, logoutUser,
    registerUser,
    resetPassword, updateUserInformation
} from './authorization-slice'
import {initialState} from "./authorization-slice";

const data = {
    email: "email@mail.ru",
    name: "Tanya",
    password: "password"
}

describe("user reducer", () => {
    it('should return initial state', () => {
        expect(userReducer(undefined, {type: ''}))
            .toEqual(initialState)
    })
    it('should handle authCheck action', () => {
        expect(userReducer(initialState, {type: authCheck.type}))
            .toEqual({...initialState, isAuthChecked: true})
    })
    it('should handle checkUserAuth action', () => {
        expect(userReducer(initialState, {type: checkUserAuth.fulfilled.type, payload: data}))
            .toEqual({...initialState, data: data, getUserRequest: false})
    })
    it('should handle registerUser action', () => {
        expect(userReducer(initialState, {type: registerUser.fulfilled.type, payload: data}))
            .toEqual({...initialState, data: data, registerUserRequest: false})
    })
    it('should handle loginUser action', () => {
        expect(userReducer(initialState, {type: loginUser.fulfilled.type, payload: data}))
            .toEqual({...initialState, data: data, loginUserRequest: false})
    })
    it('should handle logoutUser action', () => {
        expect(userReducer(initialState, {type: logoutUser.fulfilled.type, payload: data}))
            .toEqual({...initialState, data: data, logoutUserRequest: false})
    })
    it('should handle updatePassword action', () => {
        expect(userReducer(initialState, {type: updateUserInformation.fulfilled.type, payload: data}))
            .toEqual({...initialState, data: data, updateUserInformationRequest: false})
    })
    it('should handle forgotPassword action', () => {
        expect(userReducer(initialState, {type: forgotPassword.fulfilled.type, payload: data}))
            .toEqual({...initialState, data: data, forgotPasswordRequest: false})
    })
    it('should handle resetPassword action', () => {
        expect(userReducer(initialState, {type: resetPassword.fulfilled.type, payload: data}))
            .toEqual({...initialState, data: data, resetPasswordRequest: false})
    })
})
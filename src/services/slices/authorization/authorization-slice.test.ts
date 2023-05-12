import userReducer, {
    authCheck,
    checkUserAuth,
    forgotPassword,
    loginUser, logoutUser,
    registerUser,
    resetPassword, updateUserInformation
} from './authorization-slice'
import {initialState} from "./authorization-slice";
import {testUserData} from "../../../utils/test-constants";

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
        expect(userReducer(initialState, {type: checkUserAuth.fulfilled.type, payload: testUserData}))
            .toEqual({...initialState, data: testUserData, getUserRequest: false})
    })
    it('should handle registerUser action', () => {
        expect(userReducer(initialState, {type: registerUser.fulfilled.type, payload: testUserData}))
            .toEqual({...initialState, data: testUserData, registerUserRequest: false})
    })
    it('should handle loginUser action', () => {
        expect(userReducer(initialState, {type: loginUser.fulfilled.type, payload: testUserData}))
            .toEqual({...initialState, data: testUserData, loginUserRequest: false})
    })
    it('should handle logoutUser action', () => {
        expect(userReducer(initialState, {type: logoutUser.fulfilled.type, payload: testUserData}))
            .toEqual({...initialState, data: testUserData, logoutUserRequest: false})
    })
    it('should handle updatePassword action', () => {
        expect(userReducer(initialState, {type: updateUserInformation.fulfilled.type, payload: testUserData}))
            .toEqual({...initialState, data: testUserData, updateUserInformationRequest: false})
    })
    it('should handle forgotPassword action', () => {
        expect(userReducer(initialState, {type: forgotPassword.fulfilled.type, payload: testUserData}))
            .toEqual({...initialState, data: testUserData, forgotPasswordRequest: false})
    })
    it('should handle resetPassword action', () => {
        expect(userReducer(initialState, {type: resetPassword.fulfilled.type, payload: testUserData}))
            .toEqual({...initialState, data: testUserData, resetPasswordRequest: false})
    })
})
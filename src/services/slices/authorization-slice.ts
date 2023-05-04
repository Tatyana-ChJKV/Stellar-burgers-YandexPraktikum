import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';
import {setCookie} from "../../utils/cookie";
import api from "../../utils/burger-api"
import {ThunkApi} from "../store";
import {
    TUser,
    TUserForgotPassword,
    TUserLoginInfo,
    TUserRegisterInfo,
    TUserResetPassword
} from "../../utils/types";

export const sliceName = 'user';

interface TAuthorisationSliceState {
    isAuthChecked: boolean,
    data: TUser | TUserRegisterInfo | null,
    // либо собственный тип ошибки, который в action.payload
    registerUserError: SerializedError | null,
    registerUserRequest: boolean,

    loginUserError: SerializedError | null,
    loginUserRequest: boolean,

    getUserError: SerializedError | null,
    getUserRequest: boolean,

    forgotPasswordError: SerializedError | null,
    forgotPasswordRequest: boolean,

    resetPasswordError: SerializedError | null,
    resetPasswordRequest: boolean,

    updateUserInformationError: SerializedError | null,
    updateUserInformationRequest: boolean
}

const initialState: TAuthorisationSliceState = {
    isAuthChecked: false,
    data: null,

    registerUserError: null,
    registerUserRequest: false,

    loginUserError: null,
    loginUserRequest: false,

    getUserError: null,
    getUserRequest: false,

    forgotPasswordError: null,
    forgotPasswordRequest: false,

    resetPasswordError: null,
    resetPasswordRequest: false,

    updateUserInformationError: null,
    updateUserInformationRequest: false
};

export const checkUserAuth = createAsyncThunk<TUser, void, ThunkApi>(`${sliceName}/checkUserAuth`,
    async (_, {extra: api, rejectWithValue, dispatch}) => {
        try {
            const data = await api.getUser();
            // if (!data?.success) {
            //     return rejectWithValue(data)
            // }
            console.log(data.user)
            return data.user;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(authCheck())
        }
    }
);

export const registerUser = createAsyncThunk<TUser, TUserRegisterInfo, ThunkApi>(`${sliceName}/registerUser`,
    async (dataUser) => {
        const data = await api.registerUser(dataUser);
        console.log('register', data);
        // if (!data?.success) {
        //     return rejectWithValue(data)
        // }
        setCookie('accessToken', data.accessToken, {'max-age': 1000});
        setCookie('refreshToken', data.refreshToken)
        return data.user;
    }
);

export const loginUser = createAsyncThunk<TUser, TUserLoginInfo, ThunkApi>(`${sliceName}/loginUser`,
    async (dataUser) => {
        const data = await api.loginUser(dataUser);
        console.log('login', data);
        // if (!data?.success) {
        //     return rejectWithValue(data)
        // }
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken)
        return data.user;
    }
);

export const logoutUser = createAsyncThunk<TUser, TUserRegisterInfo, ThunkApi>(`${sliceName}/logoutUser`,
    async () => {
        const data = await api.logoutUser();
        console.log('logout', data);
        // if (!data?.success) {
        //     return rejectWithValue(data)
        // }
        setCookie('refreshToken', data.refreshToken)
        return data.user;
    }
);

export const updateUserInformation = createAsyncThunk<TUser, TUserRegisterInfo, ThunkApi>(`${sliceName}/updateUserInformation`,
    async (dataUser) => {
        const data = await api.updateUserInformation(dataUser);
        console.log('update_user_information', data);
        // if (!data?.success) {
        //     return rejectWithValue(data)
        // }
        return data.user;
    });

export const forgotPassword = createAsyncThunk<TUser, TUserForgotPassword, ThunkApi>(`${sliceName}/forgotPassword`,
    async (dataUser) => {
        const data = await api.forgotPassword(dataUser);
        console.log('forgot_pass', data);
        // if (!data?.success) {
        //     return rejectWithValue(data)
        // }
        return data.user;
    }
);

export const resetPassword = createAsyncThunk<TUser, TUserResetPassword, ThunkApi>(`${sliceName}/resetPassword`,
    async (dataUser) => {
        const data = await api.resetPassword(dataUser);
        console.log('reset_pass', data);
        // if (!data?.success) {
        //     return rejectWithValue(data)
        // }
        return data.user;
    }
);

interface actionType {
    type: string;
    payload: any;
}

export function isActionPending(action: actionType) {
    return action.type.endsWith('pending')
}

export function isActionRejected(action: actionType) {
    return action.type.endsWith('rejected')
}

export function getActionName(actionType: string) {
    return actionType.split('/')[1];
}

const user = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        authCheck: (state) => {
            state.isAuthChecked = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkUserAuth.fulfilled, (state, action) => {
                state.data = action.payload;
                state.getUserRequest = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.registerUserRequest = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loginUserRequest = false;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.data = action.payload;
                state.forgotPasswordRequest = false;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.data = action.payload;
                state.resetPasswordRequest = false;
            })
            .addCase(updateUserInformation.fulfilled, (state, action) => {
                state.data = action.payload;
                state.updateUserInformationRequest = false;
            })
            .addMatcher(isActionPending, (state, action) => {
                state = {...state, [`${getActionName(action.type)}Request`]: true};
                state = {...state, [`${getActionName(action.type)}Error`]: null};
            })
            .addMatcher(isActionRejected, (state, action) => {
                state = {...state, [`${getActionName(action.type)}Request`]: false};
                state = {...state, [`${getActionName(action.type)}Error`]: action.payload};
            })
    }
});

export const {authCheck} = user.actions;
export default user.reducer;

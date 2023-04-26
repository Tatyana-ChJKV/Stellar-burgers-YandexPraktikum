import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setCookie} from "../../utils/cookie";
import api from "../../utils/api"

export const sliceName = 'user';

const initialState = {
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

export const checkUserAuth = createAsyncThunk(`${sliceName}/checkUserAuth`,
    async (_, {extra: rejectWithValue, dispatch}) => {
        try {
            const data = await api.getUser();
            if (!data?.success) {
                return rejectWithValue(data)
            }
            // console.log(data.user)
            return data.user;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(authCheck())
        }
    }
);

export const registerUser = createAsyncThunk(`${sliceName}/registerUser`,
    async (dataUser, {extra: rejectWithValue}) => {
        const data = await api.registerUser(dataUser);
        console.log('register', data);
        if (!data?.success) {
            return rejectWithValue(data)
        }
        setCookie('accessToken', data.accessToken, {'max-age': 1000});
        setCookie('refreshToken', data.refreshToken)
        return data.user;
    }
);

export const loginUser = createAsyncThunk(`${sliceName}/loginUser`,
    async (dataUser, {extra: rejectWithValue}) => {
        const data = await api.loginUser(dataUser);
        console.log('login', data);
        if (!data?.success) {
            return rejectWithValue(data)
        }
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken)
        return data;
    }
);

export const logoutUser = createAsyncThunk(`${sliceName}/logoutUser`,
    async (dataUser, {extra: rejectWithValue}) => {
        const data = await api.logoutUser(dataUser);
        console.log('logout', data);
        if (!data?.success) {
            return rejectWithValue(data)
        }
        setCookie('refreshToken', data.refreshToken)
        return data;
    }
);

export const updateUserInformation = createAsyncThunk(`${sliceName}/updateUserInformation`,
    async (dataUser, {extra: rejectWithValue}) => {
        const data = await api.updateUserInformation(dataUser);
        console.log('update_user_information', data);
        if (!data?.success) {
            return rejectWithValue(data)
        }
        return data;
    });

export const forgotPassword = createAsyncThunk(`${sliceName}/forgotPassword`,
    async (email, {extra: rejectWithValue}) => {
        const data = await api.forgotPassword(email);
        if (!data?.success) {
            return rejectWithValue(data)
        }
        return data;
    }
);

export const resetPassword = createAsyncThunk(`${sliceName}/resetPassword`,
    async ({password, token}, {extra: rejectWithValue}) => {
        const data = await api.resetPassword({password, token});
        console.log('reset_pass', data);
        if (!data?.success) {
            return rejectWithValue(data)
        }
        return data;
    }
);

export function isActionPending(action) {
    return action.type.endsWith('pending')
}

export function isActionRejected(action) {
    return action.type.endsWith('rejected')
}

export function getActionName(actionType) {
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
                state[`${getActionName(action.type)}Request`] = true;
                state[`${getActionName(action.type)}Error`] = null;
            })
            .addMatcher(isActionRejected, (state, action) => {
                state[`${getActionName(action.type)}Error`] = action.payload;
                state[`${getActionName(action.type)}Request`] = false;
            })
    }
});

export const {authCheck} = user.actions;
export default user.reducer;

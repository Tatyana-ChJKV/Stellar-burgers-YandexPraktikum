import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setCookie} from "../../utils/cookie";
import api from "../../utils/api"
import {useNavigate} from "react-router-dom";

export const sliceName = 'user';

const initialState = {
    // preloader
    isAuthChecked: false,
    data: null,

    registerUserError: null,
    registerUserRequest: false,

    loginUserError: null,
    loginUserRequest: false,

    getUserError: null,
    getUserRequest: false,

    forgotPasswordError: null,
    forgotPasswordRequest: false
};

export const checkUserAuth = createAsyncThunk(`${sliceName}/checkUserAuth`,
    async (_, {extra: rejectWithValue, dispatch}) => {
        try {
            const data = await api.getUser();
            if (!data?.success) {
                return rejectWithValue(data)
            }
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
        console.log('response', data);
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
        console.log('response', data);
        if (!data?.success) {
            return rejectWithValue(data)
        }
        setCookie('accessToken', data.accessToken);
        setCookie('refreshToken', data.refreshToken)
        return data.user;
    }
);

// console.dir(loginUser);

export const forgotPassword = createAsyncThunk(`${sliceName}/forgotPassword`,
    async (email, {extra: rejectWithValue}) => {
        const data = await api.resetPassword(email);
        console.log(data);
        const navigate = useNavigate()
        if (data?.success) {
            navigate("/reset-password")
        }
    // async (email) => {
    //     return api.resetPassword(email);
    }
);
// console.dir(forgotPassword)

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

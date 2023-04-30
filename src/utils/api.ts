import {getCookie, setCookie} from './cookie';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export type User = {
    email: string;
    name: string;
};

export type UserRegisterInfo = {
    password: string;
} & User;

export type UserLoginInfo = {
    email: string;
    password: string;
};

export type ServerSuccessfulResponse<T> = {
    success: boolean;
} & T;

export type UserResponse = ServerSuccessfulResponse<{
    user: User;
}>;

export type UserResponseWithToken = ServerSuccessfulResponse<{
    user: User;
    accessToken: string;
    refreshToken: string;
}>;

export type RefreshResponseWithToken = ServerSuccessfulResponse<{
    accessToken: string;
    refreshToken: string;
}>;

export type UserResetPassword = {
    password: string;
    token: string;
};

export type UserForgotPassword = {
    email: string;
};

export class BurgerApi {
    checkResponse = <T>(res: Response): Promise<T> => {
        return res.ok
            ? res.json()
            : res.json()
                .then((err) => Promise.reject({...err, statusCode: res.status}));
    };

    fetchWithRefresh = async <T>(url: RequestInfo, options: RequestInit) => {
        try {
            const res = await fetch(url, options);
            return await this.checkResponse<T>(res);
        } catch (error: any) {
            // console.log('fetchWithRefresh', error);
            if (error.statusCode === 401 || error.statusCode === 403) {
                const refreshData = await this.refreshToken();
                if (!refreshData.success) {
                    await Promise.reject(refreshData)
                }
                setCookie('accessToken', refreshData.accessToken);
                setCookie('refreshToken', refreshData.refreshToken);
                if (options.headers) {
                    (options.headers as { [key: string]: string }).authorization = refreshData.accessToken;
                }
                const res = await fetch(url, options);
                return await this.checkResponse<T>(res);
            } else {
                await Promise.reject(error)
            }
        }
    };

    refreshToken = () => {
        return fetch(`${BASE_URL}/auth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                token: getCookie("refreshToken"),
            }),
        }).then((res) => this.checkResponse<RefreshResponseWithToken>(res));
    };

    getUser = () => {
        return this.fetchWithRefresh<UserResponse>(`${BASE_URL}/auth/user`, {
            headers: {
                authorization: getCookie("accessToken"),
            } as HeadersInit,
        })
            .then((data) => {
                if (data?.success) return data;
                return Promise.reject(data);
            });
    };

    registerUser = ({email, password, name}: UserRegisterInfo): Promise<UserResponseWithToken> => {
        return fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                email,
                password,
                name
            }),
        })
            .then((res) => this.checkResponse<UserResponseWithToken>(res))
            .then((data) => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    loginUser = ({email, password}: UserLoginInfo) => {
        return fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                email,
                password
            }),
        })
            .then((res) => this.checkResponse<UserResponseWithToken>(res))
            .then((data) => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    logoutUser() {
        return fetch(`${BASE_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: getCookie("refreshToken"),
            }),
        })
            .then((res) => this.checkResponse<UserResponseWithToken>(res))
            .then((data) => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    updateUserInformation({name, email, password}: UserRegisterInfo) {
        return this.fetchWithRefresh<UserResponse>(`${BASE_URL}/auth/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("accessToken"),
            } as HeadersInit,
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })
            .then((data) => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    forgotPassword = ({email}: UserForgotPassword) => {
        return fetch(`${BASE_URL}/password-reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                email
            }),
        })
            .then((res) => this.checkResponse<UserResponseWithToken>(res))
            .then((data) => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    resetPassword = ({password, token}: UserResetPassword) => {
        return fetch(`${BASE_URL}/password-reset/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                password,
                token
            }),
        })
            .then((res) => this.checkResponse<UserResponseWithToken>(res))
            .then((data) => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BurgerApi()
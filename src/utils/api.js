import {getCookie, setCookie} from './cookie';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

class BurgerApi {
    checkResponse = (res) => {
        return res.ok ? res.json() : res.json().then((err) =>
            Promise.reject({...err, statusCode: res.status}));
    };

    fetchWithRefresh = async (url, options) => {
        try {
            const res = await fetch(url, options);
            return await this.checkResponse(res);
        } catch (error) {
            // console.log('fetchWithRefresh', error);
            if (error.statusCode === 401 || error.statusCode === 403) {
                const refreshData = await this.refreshToken();
                if (!refreshData.success) {
                    await Promise.reject(refreshData)
                }
                setCookie('accessToken', refreshData.accessToken);
                setCookie('refreshToken', refreshData.refreshToken);
                options.headers.authorization = refreshData.accessToken;
                const res = await fetch(url, options);
                return await this.checkResponse(res);

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
        }).then(this.checkResponse);
    };

    getUser = () => {
        return this.fetchWithRefresh(`${BASE_URL}/auth/user`, {
            headers: {
                authorization: getCookie("accessToken"),
            },
        }).then(data => {
            if (data?.success) return data;
            return Promise.reject(data)
        });
    };

    registerUser = ({email, password, name}) => {
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
        }).then(this.checkResponse)
            .then(data => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    loginUser = ({email, password}) => {
        return fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                email,
                password
            }),
        }).then(this.checkResponse)
            .then(data => {
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
        }).then(this.checkResponse)
            .then(data => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    updateUserInformation({name, email, password}) {
        return this.fetchWithRefresh(`${BASE_URL}/auth/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("accessToken"),
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        }).then(data => {
            if (data?.success) return data;
            return Promise.reject(data)
        });
    };

    forgotPassword = ({email}) => {
        return fetch(`${BASE_URL}/password-reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                email
            }),
        }).then(this.checkResponse)
            .then(data => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    resetPassword = ({password, token}) => {
        return fetch(`${BASE_URL}/password-reset/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                password,
                token
            }),
        }).then(this.checkResponse)
            .then(data => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BurgerApi()
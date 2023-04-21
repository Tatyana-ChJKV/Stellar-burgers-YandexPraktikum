import { getCookie, setCookie } from './cookie';
export const BASE_URL = 'https://norma.nomoreparties.space/api';

class BurgerApi {
    checkResponse = (res) => {
        return res.ok ? res.json() : res.json().then((err) => Promise.reject({ ...err, statusCode: res.status }));
    };

    fetchWithRefresh = async (url, options) => {
        try {
            const res = await fetch(url, options);
            return await this.checkResponse(res);
        } catch (error) {
            console.log('fetchWithRefresh', error);
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

    registerUser = (data) => {
        return fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        }).then(this.checkResponse)
            .then(data => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    loginUser = (data) => {
        return fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        }).then(this.checkResponse)
            .then(data => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
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

    resetPassword = (email) => {
        return fetch(`${BASE_URL}/password-reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                email
            }),
        }).then(this.checkResponse);
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new BurgerApi()
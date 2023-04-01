import {checkResponse} from "./check-response";
import {BASE_URL} from "./api";

export const getIngredients = () => {
    return fetch(`${BASE_URL}/ingredients`)
        .then(checkResponse)
        .then(data => {
            if (data.success) {
                return data.data;
            }
        })
}

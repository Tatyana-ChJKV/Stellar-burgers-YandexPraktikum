const API = 'https://norma.nomoreparties.space/api/ingredients';

const getIngredients = () => {
    return fetch(API)

        .then(res => {
            if (res.ok) {
                return res.json();
            }
            // console.log('data')
            return Promise.reject(res.status);
        })
        .then(data => {
            if (data.success) {
                return data.data;
            }
        })
        .catch(err => {
            console.log(err)
        })
}

export default getIngredients;
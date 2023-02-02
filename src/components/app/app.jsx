import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import styles from "./app.module.css"

// export function getIngredients() {
//     const API = 'https://norma.nomoreparties.space/api/ingredients';
//     return fetch(API)
//         .then(res => {
//         if (res.ok) {
//             return res.json();
//         }
//         return Promise.reject(res.status);
//     })
//         .catch(error => console.log(error))
// }
//
// getIngredients()

function App() {
    return (
        <div className={styles.app}>
            <AppHeader/>
            <div className={styles.ingredients_constructor}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </div>
        </div>
    );
}

export default App;
import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import styles from "./app.module.css"
import {useEffect, useState} from "react";

export const App = () => {
    const API = 'https://norma.nomoreparties.space/api/ingredients';
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function getIngredients() {
        fetch(API)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then(res => {
                setIngredients(res.data)
            })
            .then(() => {
                setIsLoading(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(getIngredients, [])

    return (
        <div className={styles.app}>
            <AppHeader/>
            <div className={styles.ingredients_constructor}>
                {isLoading && <BurgerIngredients cards={ingredients}/>}
                {isLoading && <BurgerConstructor cards={ingredients}/>}
            </div>
        </div>
    )
}
import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import styles from "./app.module.css"
import {useDispatch} from "react-redux";
import {fetchIngredients} from "../../services/reducers/ingredients";
import {useEffect} from "react";

export const App = () => {
    // const API = 'https://norma.nomoreparties.space/api/ingredients';
    // const [ingredients, setIngredients] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    //
    // function getIngredients() {
    //     fetch(API)
    //         .then(res => {
    //             if (res.ok) {
    //                 return res.json();
    //             }
    //             return Promise.reject(res.status);
    //         })
    //         .then(res => {
    //             setIngredients(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    //         .finally(() => {
    //             setIsLoading(true)
    //         })
    // }
    //
    // useEffect(getIngredients, [])

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])

    return (
        <main className={styles.app}>
            <AppHeader/>
            <div className={styles.ingredients_constructor}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </div>
        </main>)
}
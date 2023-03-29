import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import styles from "./app.module.css"
import {useDispatch} from "react-redux";
import {receiveIngredients} from "../../services/reducers/ingredients";
import {useEffect} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveIngredients())
    }, [dispatch])

    return (
        <main className={styles.app}>
            <AppHeader/>
            <div className={styles.ingredients_constructor}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </div>
        </main>
    )
}
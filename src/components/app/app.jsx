import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import styles from "./app.module.css"
import {useDispatch} from "react-redux";
import {receiveIngredients} from "../../services/slices/ingredients-slice";
import {useEffect} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RegisterPage} from "../../pages/register/register-page";
import {LoginPage} from "../../pages/login/login-page";
import {ResetPasswordPage} from "../../pages/reset-password/reset-password-page";
import {ForgotPasswordPage} from "../../pages/forgot-password/forgot-password-page";
import {ProfilePage} from "../../pages/profile/profile-page";

export const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveIngredients())
    }, [dispatch])

    return (
        <>
        <div className={styles.app}>
            <AppHeader/>
            <main className={styles.ingredients_constructor}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </main>
        </div>
        <BrowserRouter>
             <Routes>
                 {/*<Route path="/" element={<ProfilePage/>} />*/}
                 {/*<Route path="/" element={<RegisterPage/>} />*/}
                 {/*<Route path="/" element={<LoginPage/>} />*/}
                 {/*<Route path="/" element={<ForgotPasswordPage/>} />*/}
                 <Route path="/" element={<ResetPasswordPage/>} />


             </Routes>
         </BrowserRouter>
        </>
    )
};
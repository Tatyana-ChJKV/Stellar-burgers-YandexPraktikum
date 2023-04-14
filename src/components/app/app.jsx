import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import styles from "./app.module.css"
import {useDispatch} from "react-redux";
import {receiveIngredients} from "../../services/slices/ingredients-slice";
import {useEffect} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Routes} from "react-router-dom";
import {RegisterPage} from "../../pages/register/register-page";
import {LoginPage} from "../../pages/login/login-page";
import {ResetPasswordPage} from "../../pages/reset-password/reset-password-page";
import {ForgotPasswordPage} from "../../pages/forgot-password/forgot-password-page";
import {ProfilePage} from "../../pages/profile/profile-page";
import {AppHeaderFrame} from "../app-header-frame/app-header-frame";
import {MainPage} from "../main-page/main-page";

export const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveIngredients())
    }, [dispatch])

    return (
        <>
            <Routes>
                <Route path="/" element={<AppHeaderFrame/>}>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>
                </Route>
            </Routes>
        </>
    )
};
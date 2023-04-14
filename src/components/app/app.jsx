import {AppHeader} from "../app-header/app-header";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import styles from "./app.module.css"
import {useDispatch} from "react-redux";
import {receiveIngredients} from "../../services/slices/ingredients-slice";
import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {RegisterPage} from "../../pages/register/register-page";
import {LoginPage} from "../../pages/login/login-page";
import {ResetPasswordPage} from "../../pages/reset-password/reset-password-page";
import {ForgotPasswordPage} from "../../pages/forgot-password/forgot-password-page";
import {ProfilePage} from "../../pages/profile/profile-page";
import {AppHeaderFrame} from "../app-header-frame/app-header-frame";
import {MainPage} from "../main-page/main-page";
import {ProtectedRoute} from "../protected-route/protected-route";

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
                    <Route path="/profile" element={
                        <ProtectedRoute onlyUnAuth>
                            <ProfilePage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/register" element={
                        <ProtectedRoute onlyUnAuth>
                            <RegisterPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/forgot-password" element={
                        <ProtectedRoute onlyUnAuth>
                            <ForgotPasswordPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/reset-password" element={
                        <ProtectedRoute onlyUnAuth>
                            <ResetPasswordPage/>
                        </ProtectedRoute>
                    }/>
                </Route>
                {/*стилизовать 404*/}
                <Route path='*' element={<div> 404 </div>}/>
            </Routes>
        </>
    )
};
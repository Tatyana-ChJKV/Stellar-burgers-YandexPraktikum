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
import {Page404} from "../../pages/page-404/page-404";
import {checkUserAuth, forgotPassword, loginUser, registerUser} from "../../services/slices/authorization-slice";

export const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(receiveIngredients())
    }, [dispatch])

    useEffect(() => {
        dispatch(checkUserAuth())
    }, [dispatch])

    const onRegister = (userData) => {
        dispatch(registerUser(userData))
    };

    const onLogin = (userData) => {
        dispatch(loginUser(userData))
    };

    const onForgotPassword = (userData) => {
        dispatch(forgotPassword(userData))
    };

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
                            <RegisterPage onRegister={onRegister}/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/login" element={
                        <LoginPage onLogin={onLogin}/>}/>
                    <Route path="/forgot-password" element={
                        <ProtectedRoute onlyUnAuth>
                            <ForgotPasswordPage onForgotPassword={onForgotPassword}/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/reset-password" element={
                        <ProtectedRoute onlyUnAuth>
                            <ResetPasswordPage/>
                        </ProtectedRoute>
                    }/>
                </Route>
                <Route path='*' element={<Page404 />}/>
            </Routes>
        </>
    )
};
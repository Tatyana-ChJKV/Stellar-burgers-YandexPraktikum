import {useDispatch, useSelector} from "react-redux";
import {receiveIngredients} from "../../services/slices/ingredients-slice";
import {useEffect, useState} from "react";
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
import {checkUserAuth} from "../../services/slices/authorization-slice";
import {IngredientDetails} from "../ingredient-details/ingredient-details";

export const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authorizationStore.data);


    useEffect(() => {
        dispatch(receiveIngredients())
    }, [dispatch])

    useEffect(() => {
        dispatch(checkUserAuth())
    }, [dispatch])

    return (
        <>
            <Routes>
                <Route path="/" element={<AppHeaderFrame/>}>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/profile" element={
                        <ProtectedRoute user={user}>
                            <ProfilePage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/register" element={
                        <ProtectedRoute onlyUnAuth>
                            <RegisterPage onlyUnAuth/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/login" element={
                        <LoginPage/>}/>
                    <Route path="/forgot-password" element={
                        <ProtectedRoute user={user}>
                            <ForgotPasswordPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/reset-password" element={
                        <ProtectedRoute user={user}>
                            <ResetPasswordPage/>
                        </ProtectedRoute>
                    }/>
                </Route>
                <Route path='*' element={<Page404/>}/>
                {/*<Route path="/ingredients/:id" element={*/}
                {/*    <IngredientDetails card={"card"}/>*/}
                {/*}/>*/}
            </Routes>
        </>
    )
};
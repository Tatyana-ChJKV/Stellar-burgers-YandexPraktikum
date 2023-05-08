import {receiveIngredients} from "../../services/slices/ingredients-slice";
import {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
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
import {Modal} from "../modal/modal";
import {useLocation} from "react-router";
import {useDispatch} from "../../services/hooks";
import {FeedPage} from "../../pages/feed/feed-page";
import {FeedIdPageMain} from "../../pages/feed-id/feed-id-page-main";
import {ProfileOrdersPage} from "../../pages/profile-orders/profile-orders-page";
import {ProfileNavigationFrame} from "../../pages/profile/profile-navigation/profile-navigation-frame";
// import {ProfileOrdersIdPage} from "../../pages/profile/profile-orders-id/profile-orders-id-page";

export const App = () => {
    const dispatch = useDispatch();
    // const user = useSelector(state => state.authorizationStore.data);
    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state?.background as Location;

    useEffect(() => {
        dispatch(receiveIngredients())
    }, [dispatch])

    useEffect(() => {
        dispatch(checkUserAuth())
    }, [dispatch])

    const handleCloseModal = () => {
        navigate(-1)
    };

    return (
        <>
            <Routes location={background || location}>
                <Route path="/"
                       element={<AppHeaderFrame/>}>
                    <Route path="/"
                           element={<MainPage/>
                           }/>
                    <Route path='*'
                           element={<Page404/>
                           }/>
                    <Route path="/profile"
                           element={
                               <ProtectedRoute>
                                   <ProfileNavigationFrame/>
                               </ProtectedRoute>
                           }>
                        <Route path="/profile"
                               element={
                                   <ProtectedRoute>
                                       <ProfilePage/>
                                   </ProtectedRoute>
                               }/>
                        <Route path="/profile/orders"
                               element={
                                   <ProtectedRoute>
                                       <ProfileOrdersPage/>
                                   </ProtectedRoute>
                               }/>
                    </Route>
                    <Route path="/profile/orders/:id"
                           element={
                               <ProtectedRoute>
                                   <FeedIdPageMain/>
                               </ProtectedRoute>
                           }/>
                    <Route path="/register"
                           element={
                               <ProtectedRoute onlyUnAuth>
                                   <RegisterPage/>
                               </ProtectedRoute>
                           }/>
                    <Route path="/login"
                           element={
                               <ProtectedRoute onlyUnAuth>
                                   <LoginPage/>
                               </ProtectedRoute>
                           }/>
                    <Route path="/forgot-password"
                           element={
                               <ProtectedRoute onlyUnAuth>
                                   <ForgotPasswordPage/>
                               </ProtectedRoute>
                           }/>
                    <Route path="/reset-password"
                           element={
                               <ProtectedRoute onlyUnAuth>
                                   <ResetPasswordPage/>
                               </ProtectedRoute>
                           }/>
                    <Route path="/ingredients/:idIngredient"
                           element={
                               <IngredientDetails headerForIngredientDetails/>
                           }/>
                    <Route path="/feed"
                           element={<FeedPage/>
                           }/>
                    <Route path="/feed/:id"
                           element={<FeedIdPageMain/>
                           }/>
                </Route>
            </Routes>
            {background && (
                <Routes>
                    <Route path="/ingredients/:idIngredient"
                           element={
                               <Modal onClick={handleCloseModal}
                                      modalHeader={"Детали ингредиента"}>
                                   <IngredientDetails headerForIngredientDetails={false}/>
                               </Modal>
                           }/>
                    <Route path="/feed/:id"
                           element={
                               <Modal onClick={handleCloseModal}
                                      modalHeader={"Информация о заказе"}>
                                   <FeedIdPageMain/>
                               </Modal>
                           }/>
                    <Route path="/profile/orders/:id"
                           element={
                               <Modal onClick={handleCloseModal}
                                      modalHeader={"Информация о заказе"}>
                                   <FeedIdPageMain/>
                               </Modal>
                           }/>
                </Routes>)
            }
        </>
    )
};
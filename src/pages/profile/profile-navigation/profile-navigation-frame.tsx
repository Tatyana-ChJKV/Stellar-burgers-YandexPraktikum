import {Outlet} from "react-router";
import {NavLink, useNavigate} from "react-router-dom";
import styles from "../profile-page.module.css";
import React, {useEffect, useState} from "react";
import {logoutUser} from "../../../services/slices/authorization-slice";
import {useDispatch} from "../../../services/hooks";
import clsx from "clsx";

export const ProfileNavigationFrame = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(logoutUser(userData))
            .then(({payload}: {payload:any}) => {
                if (payload?.success) {
                    navigate("/login")
                    console.log('logout_to_/login')
                }
            })
    };

    return (
        <div className={clsx(styles.profile_main, "mt-30")}>
            <div className="mr-15">
                <NavLink to={'/profile'}
                         className={styles.delete_underline_text}>
                    {({isActive}) => (
                        <p className={
                            isActive
                            ? `${styles.menu_text} text text_type_main-medium text text_color_primary`
                            : `${styles.menu_text} text text_type_main-medium text text_color_inactive`
                        }>
                            Профиль
                        </p>
                    )}
                </NavLink>
                <NavLink to={'/profile/orders'}
                         className={styles.delete_underline_text}>
                    {({isActive}) => (
                        <p className={
                            isActive
                                ? `${styles.menu_text} text text_type_main-medium text text_color_primary`
                                : `${styles.menu_text} text text_type_main-medium text text_color_inactive`
                        }>
                            История заказов
                        </p>
                    )}
                </NavLink>
                <NavLink to={'/login'}
                         className={styles.delete_underline_text}>
                    <p className={`${styles.menu_text} text text_type_main-medium text_color_inactive`}
                       onClick={handleLogout}>
                        Выход
                    </p>
                </NavLink>
                <p className={`${styles.menu_text} mt-20 text text_type_main-default text_color_inactive`}>В этом
                    разделе вы можете изменить свои персональные данные</p>
            </div>
            <Outlet/>
        </div>
    )
}
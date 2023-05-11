import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import styles from "./login-page.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import {loginUser} from "../../services/slices/authorization/authorization-slice";
import {useDispatch} from "../../services/hooks";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(loginUser(userData))
    };

    return (
        <div className={styles.login_modal}>
            <p className="text text_type_main-medium mb-6">Вход</p>
            <form onSubmit={handleSubmit}
                  className={styles.form}>
                <EmailInput
                    autoFocus
                    onChange={handleChange}
                    value={userData.email}
                    name={'email'}
                    isIcon={false}
                    extraClass="mb-6"
                />
                <PasswordInput
                    onChange={handleChange}
                    value={userData.password}
                    name={'password'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit"
                        type="primary"
                        size="medium"
                        extraClass="ml-2">
                    Войти
                </Button>
            </form>
            <p className="mt-20 pb-1 text text_type_main-default text_color_inactive">Вы - новый пользователь?
                <NavLink to={'/register'}>
                    <Button htmlType="button"
                            type="secondary"
                            size="medium"
                            extraClass="pl-2 pt-1 pb-1">
                        Зарегистрироваться
                    </Button>
                </NavLink>
            </p>
            <p className="mt-1 text text_type_main-default text_color_inactive">Забыли пароль?
                <NavLink to={'/forgot-password'}>
                    <Button htmlType="button"
                            type="secondary"
                            size="medium"
                            extraClass="pl-2 pt-1 pb-1">
                        Восстановить пароль
                    </Button>
                </NavLink>
            </p>
        </div>
    )
};
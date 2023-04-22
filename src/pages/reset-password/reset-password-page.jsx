import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import styles from "../login/login-page.module.css"
import {NavLink, useNavigate} from "react-router-dom";

export const ResetPasswordPage = ({onResetPassword}) => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: '',
        password: ''
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault()
        onResetPassword(userData)
        // navigate('/login')
    };

    return (
        <div className={styles.login_modal}>
            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
            <form onSubmit={handleSubmit}
                  className={styles.form}>
                <PasswordInput
                    autoFocus
                    onChange={handleChange}
                    value={userData.password}
                    name={'password'}
                    extraClass="mb-6"
                    placeholder="Введите новый пароль"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={handleChange}
                    value={userData.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1 mb-6"
                />
                <Button htmlType="submit"
                        type="primary"
                        size="medium"
                        extraClass="ml-2">
                    Сохранить
                </Button>
            </form>
            <p className="mt-20 pb-1 text text_type_main-default text_color_inactive">Вспомнили пароль?
                <NavLink to={'/login'}>
                    <Button htmlType="button"
                            type="secondary"
                            size="medium"
                            extraClass="pl-2 pt-1 pb-1">
                        Войти
                    </Button>
                </NavLink>
            </p>
        </div>
    )
}
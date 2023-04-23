import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRef, useState} from "react";
import styles from "./register-page.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import {loginUser, registerUser} from "../../services/slices/authorization-slice";
import {useDispatch} from "react-redux";

export const RegisterPage = ({onRegister}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
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
        dispatch(registerUser(userData))
            .then(({payload}) => {
                if (payload.success) {
                    navigate("/")
                }
            })
    };

    return (
        <div className={styles.registration_modal}>
            <p className="text text_type_main-medium">Регистрация</p>
            <form onSubmit={handleSubmit}
                  className={styles.form}>
                <Input
                    autoFocus
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    value={userData.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <EmailInput
                    onChange={handleChange}
                    value={userData.email}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    onChange={handleChange}
                    value={userData.password}
                    name={'password'}
                    extraClass="mb-2"
                />
                <Button htmlType="submit"
                        type="primary"
                        size="medium"
                        extraClass="ml-2">
                    Зарегистрироваться
                </Button>
            </form>
            <p className="mt-15 text text_type_main-default text_color_inactive">Уже зарегистрированы?
                <NavLink to={'/login'}>
                    <Button htmlType="button"
                            type="secondary"
                            size="medium"
                            extraClass="pl-2">
                        Войти
                    </Button>
                </NavLink>
            </p>
        </div>
    )
}
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import styles from "./login-page.module.css"
import {NavLink} from "react-router-dom";

export const LoginPage = () => {
    const [value, setValue] = useState('')
    const onChange = e => {
        setValue(e.target.value)
    }

    return (
        <div className={styles.login_modal}>
            {/*<form>*/}
            <p className="text text_type_main-medium mb-6">Вход</p>
            <EmailInput
                onChange={onChange}
                value={value}
                name={'email'}
                isIcon={false}
                extraClass="mb-6"
            />
            <PasswordInput
                onChange={onChange}
                value={value}
                name={'password'}
                extraClass="mb-6"
            />
            <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
                Войти
            </Button>
            {/*</form>*/}
            <p className="mt-20 pb-1 text text_type_main-default text_color_inactive">Вы - новый пользователь?
                <NavLink to={'/register'}>
                    <Button htmlType="button" type="secondary" size="medium" extraClass="pl-2 pt-1 pb-1">
                        Зарегистрироваться
                    </Button>
                </NavLink>
            </p>
            <p className="mt-1 text text_type_main-default text_color_inactive">Забыли пароль?
                <NavLink to={'/forgot-password'}>
                    <Button htmlType="button" type="secondary" size="medium" extraClass="pl-2 pt-1 pb-1">
                        Восстановить пароль
                    </Button>
                </NavLink>
            </p>
        </div>
    )
}
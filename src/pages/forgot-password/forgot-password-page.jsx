import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import styles from "../login/login-page.module.css"

export const ForgotPasswordPage = () => {
    const [value, setValue] = useState('')
    const onChange = e => {
        setValue(e.target.value)
    }

    return (
        <div className={styles.login_modal}>
            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
            <EmailInput
                onChange={onChange}
                value={value}
                name={'email'}
                isIcon={false}
                extraClass="mb-6"
                placeholder="Укажите e-mail"
            />
            <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
                Восстановить
            </Button>
            <p className="mt-20 pb-1 text text_type_main-default text_color_inactive">Вспомнили пароль?
                <Button htmlType="button" type="secondary" size="medium" extraClass="pl-2 pt-1 pb-1">
                    Войти
                </Button>
            </p>
        </div>
    )
}
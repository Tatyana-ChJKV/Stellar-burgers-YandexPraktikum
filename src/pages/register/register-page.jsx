import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRef, useState} from "react";
import styles from "./register-page.module.css"

export const RegisterPage = () => {
    const [value, setValue] = useState('')
    const onChange = e => {
        setValue(e.target.value)
    }

    const inputRef = useRef(null)
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }
    return (
            <div className={styles.registration_modal}>
                <p className="text text_type_main-medium">Регистрация</p>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setValue(e.target.value)}
                    // icon={'CurrencyIcon'}
                    value={value}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <EmailInput
                    onChange={onChange}
                    value={value}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    onChange={onChange}
                    value={value}
                    name={'password'}
                    extraClass="mb-2"
                />
                <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
                    Зарегистрироваться
                </Button>
                <p className="mt-15 text text_type_main-default text_color_inactive">Уже зарегистрированы?
                    <Button htmlType="button" type="secondary" size="medium" extraClass="pl-2">
                        Войти
                    </Button>
                </p>
            </div>
    )
}
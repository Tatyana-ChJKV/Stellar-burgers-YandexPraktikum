import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRef, useState} from "react";
import styles from "./profile-page.module.css"

export const ProfilePage = () => {
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
        <div className={styles.profile_main}>
        <div className="mr-15">
            <p className={`${styles.menu_text} text text_type_main-medium`}>Профиль</p>
            <p className={`${styles.menu_text} text text_type_main-medium text_color_inactive`}>История заказов</p>
            <p className={`${styles.menu_text} text text_type_main-medium text_color_inactive`}>Выход</p>
            <p className={`${styles.menu_text} mt-20 text text_type_main-default text_color_inactive`}>В этом разделе вы можете
                изменить свои персональные данные
            </p>
        </div>
        <div className={styles.registration_modal}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setValue(e.target.value)}
                icon={'EditIcon'}
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
                icon={'EditIcon'}
                placeholder={'Логин'}
            />
            <PasswordInput
                onChange={onChange}
                value={value}
                name={'password'}
                extraClass="mb-2"
                placeholder={'Пароль'}
                icon={'EditIcon'}
            />
            <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
                Сохранить
            </Button>
        </div>
        </div>
    )
}
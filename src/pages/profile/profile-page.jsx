import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useRef, useState} from "react";
import styles from "./profile-page.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import {forgotPassword, updateUserInformation} from "../../services/slices/authorization-slice";
import {useDispatch} from "react-redux";

export const ProfilePage = ({onLogout}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

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
        dispatch(updateUserInformation(userData))
    };

    const handleLogout = e => {
        e.preventDefault()
        onLogout(userData)
        // navigate('/profile')
    };
    const handleReset = e => {
        e.preventDefault()
        setUserData(userData)
        // navigate('/profile')
    };

    const inputRef = useRef(null);
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    return (
        <div className={styles.profile_main}>
            <div className="mr-15">
                <NavLink to={'/profile'}
                         className={styles.delete_underline_text}>
                    <p className={`${styles.menu_text} text text_color_primary text_type_main-medium`}>Профиль</p>
                </NavLink>
                <NavLink to={'/orders'}
                         className={styles.delete_underline_text}>
                    <p className={`${styles.menu_text} text text_type_main-medium text_color_inactive`}>История
                        заказов</p>
                </NavLink>
                <NavLink to={'*'}
                         className={styles.delete_underline_text}>
                    <p className={`${styles.menu_text} text text_type_main-medium text_color_inactive`}
                       onClick={handleLogout}>
                        Выход
                    </p>
                </NavLink>
                <p className={`${styles.menu_text} mt-20 text text_type_main-default text_color_inactive`}>В этом
                    разделе вы можете изменить свои персональные данные</p>
            </div>
            <form onSubmit={handleSubmit}
                  className={styles.registration_modal}>
                <Input
                    autoFocus
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    icon={'EditIcon'}
                    value={userData.name}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <EmailInput
                    onChange={handleChange}
                    value={userData.email}
                    name={'email'}
                    isIcon={false}
                    icon={'EditIcon'}
                    placeholder={'Логин'}
                />
                <PasswordInput
                    onChange={handleChange}
                    value={userData.password}
                    name={'password'}
                    extraClass="mb-2"
                    placeholder={'Пароль'}
                    icon={'EditIcon'}
                />
                <div className={styles.buttons}>
                    <Button htmlType="submit"
                            type="primary"
                            size="medium"
                            extraClass="ml-2">
                        Сохранить
                    </Button>
                    <Button htmlType="reset"
                            type="secondary"
                            size="medium"
                            extraClass="ml-2"
                            onClick={handleReset}>
                        Отмена
                    </Button>
                </div>
            </form>
        </div>
    )
}
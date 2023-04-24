import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import styles from "../login/login-page.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import {forgotPassword} from "../../services/slices/authorization-slice";
import {useDispatch, useSelector} from "react-redux";

export const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: ''
    });
    // const userInfo = useSelector(state => state.authorizationStore.data);
    //
    // useEffect(()=>{
    //     if(userInfo){
    //         setUserData({
    //             ...userData,
    //             email: userInfo.user.email,
    //         })
    //     }
    // }, [userInfo, setUserData])

    const handleChange = e => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(forgotPassword(userData))
            .then(({payload}) => {
                if (payload.success) {
                    navigate("/reset-password")
                }
            })
    };

    return (
        <div className={styles.login_modal}>
            <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
            <form onSubmit={handleSubmit}
                  className={styles.form}>
                <EmailInput
                    autoFocus
                    onChange={handleChange}
                    value={userData.email}
                    name={'email'}
                    isIcon={false}
                    extraClass="mb-6"
                    placeholder="Укажите e-mail"
                />
                <Button htmlType="submit"
                        type="primary"
                        size="medium"
                        extraClass="ml-2">
                    Восстановить
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
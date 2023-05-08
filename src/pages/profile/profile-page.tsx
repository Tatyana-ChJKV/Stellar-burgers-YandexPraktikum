import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, useState} from "react";
import styles from "./profile-page.module.css"
import {updateUserInformation} from "../../services/slices/authorization-slice";
import {
    useDispatch,
    useSelector
} from "../../services/hooks";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: any) => state.authorizationStore.data);
    // console.log("userInfo", userInfo)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const buttonsAppearance = userInfo?.name !== userData.name || userInfo?.email !== userData.email || userData.password;

    useEffect(() => {
        if (userInfo) {
            setUserData({
                ...userData,
                name: userInfo.name,
                email: userInfo.email,
                password: ''
            })
        }
    }, [userInfo, setUserData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(updateUserInformation(userData))
        console.log('handleSubmitUpdate')
    };

    const handleCancellation = (e: React.FormEvent) => {
        e.preventDefault()
        setUserData(userInfo)
        console.log('handleCancellation')
    };

    return (
        <div className={styles.profile_main}>
            <form onSubmit={handleSubmit}
                  className={styles.registration_modal}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    icon={'EditIcon'}
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
                    isIcon={true}
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
                {buttonsAppearance &&
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
                                onClick={handleCancellation}
                        >
                            Отмена
                        </Button>
                    </div>
                }
            </form>
        </div>
    )
};
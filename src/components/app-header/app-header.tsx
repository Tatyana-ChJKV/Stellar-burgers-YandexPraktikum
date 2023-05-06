import {Logo, BurgerIcon, ListIcon, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css"
import {NavLink} from "react-router-dom";

export const AppHeader = () => {
    return (
        <header className={styles.header_bar}>
            <div className={styles.header}>
                <nav className={styles.header_elements}>
                    <NavLink to={'/'} className={styles.delete_underline_text}>
                        {({isActive}) => (
                            <button type="button"
                                    className={`${styles.header_element} ${styles.header_element_constructor}  pl-5 mt-4 mb-4`}>
                                <BurgerIcon type={isActive ? "primary" : "secondary"}/>
                                <p className={
                                    isActive
                                        ? "text text_color_primary text_type_main-default ml-2"
                                        : "text text_color_inactive text_type_main-default ml-2"
                                }>
                                    Конструктор
                                </p>
                            </button>
                        )}
                    </NavLink>
                    <NavLink to={'/feed'} className={styles.delete_underline_text}>
                        {({isActive}) => (
                            <button type="button"
                                    className={`${styles.header_element} ${styles.header_element_orders} pl-5 ml-2 mt-4 mb-4`}>
                                <ListIcon type={isActive ? "primary" : "secondary"}/>
                                <p className={
                                    isActive
                                        ? `${styles.delete_underline_text} text text_color_primary text_type_main-default ml-2`
                                        : `${styles.delete_underline_text} text text_color_inactive text_type_main-default ml-2`
                                }>
                                    Лента заказов
                                </p>
                            </button>
                        )}
                    </NavLink>
                </nav>
                <NavLink to={'/'}>
                    <Logo/>
                </NavLink>
                <nav>
                    <NavLink to={'/profile'} className={styles.delete_underline_text}>
                        {({isActive}) => (
                            <button type="button"
                                    className={`${styles.header_element} ${styles.header_element_profile_icon} pl-5 mt-4 mb-4`}>
                                <ProfileIcon type={isActive ? "primary" : "secondary"}/>
                                <p className={
                                    isActive
                                        ? `${styles.delete_underline_text} text text_color_primary text_type_main-default ml-2`
                                        : `${styles.delete_underline_text} text text_color_inactive text_type_main-default ml-2`
                                }>
                                    Личный кабинет
                                </p>
                            </button>
                        )}
                    </NavLink>
                </nav>
            </div>
        </header>
    )
};
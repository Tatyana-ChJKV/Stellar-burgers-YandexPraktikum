import styles from './page-404.module.css';
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";

export const Page404 = () => {
    return (
        <div className={styles.error_page}>
            <p className={styles.number}>404</p>
            <p className={styles.description}>Извините, страница не найдена</p>
            <NavLink to={'/'}>
                <Button htmlType="button"
                        type="primary"
                        size="medium"
                        extraClass="ml-2">
                    Вернуться на главную
                </Button>
            </NavLink>
        </div>
    )
};
import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./tab-ingredients.module.css";

export const TabIngredients = ({current, scrollToTab}) => {
    return (
        <div className={styles.flex}>
            <Tab value="bun"
                 active={current === 'bun'}
                 onClick={() => scrollToTab('bun')}>
                Булки
            </Tab>
            <Tab value="sauce"
                 active={current === 'sauce'}
                 onClick={() => scrollToTab('sauce')}>
                Соусы
            </Tab>
            <Tab value="main"
                 active={current === 'main'}
                 onClick={() => scrollToTab('main')}>
                Начинки
            </Tab>
        </div>
    )
}
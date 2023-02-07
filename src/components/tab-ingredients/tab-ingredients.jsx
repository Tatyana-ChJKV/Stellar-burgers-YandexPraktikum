import React, {useState} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./tab-ingredients.module.css";

export const TabIngredients = () => {
    const [current, setCurrent] = useState('one');

    const scrollToTab = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start'})
        }
    };

    return (
        <div className={styles.flex}>
            <Tab value="buns" active={current === 'buns'} onClick={scrollToTab}>
                Булки
            </Tab>
            <Tab value="sauces" active={current === 'sauces'} onClick={scrollToTab}>
                Соусы
            </Tab>
            <Tab value="mains" active={current === 'mains'} onClick={scrollToTab}>
                Начинки
            </Tab>
        </div>
    )
}
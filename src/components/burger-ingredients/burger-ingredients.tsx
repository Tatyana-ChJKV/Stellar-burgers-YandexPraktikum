import React, {useState} from "react";
import {TabIngredients} from "../tab-ingredients/tab-ingredients";
import {IngredientsCard} from "../ingredients-card/ingredients-card";
import styles from "./burger-ingredients.module.css";
import {useSelector} from "../../services/hooks";
import {useInView} from 'react-intersection-observer';
import {TCard} from "../../utils/types";

export const BurgerIngredients = () => {
    const cards: TCard[] = useSelector((state) => state.ingredientsStore.data);

    const buns = cards.filter(ingredient => ingredient.type === 'bun').map(ingredient => {
        return <IngredientsCard card={ingredient} key={ingredient._id}/>
    });
    const mains = cards.filter(ingredient => ingredient.type === 'main').map(ingredient => {
        return <IngredientsCard card={ingredient} key={ingredient._id}/>
    });
    const sauces = cards.filter(ingredient => ingredient.type === 'sauce').map(ingredient => {
        return <IngredientsCard card={ingredient} key={ingredient._id}/>
    });

    const [current, setCurrent] = useState('bun');

    const scrollToTab = (tab: string) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) {
            element.scrollIntoView({behavior: 'smooth'})
        }
    };

    const [bunsInView] = useInView({
        threshold: 1, onChange: (inView) => inView && setCurrent('bun')
    });
    const [sauceInView] = useInView({
        threshold: 0.5, onChange: (inView) => inView && setCurrent('sauce')
    });
    const [mainsInView] = useInView({
        threshold: 1, onChange: (inView) => inView && setCurrent('main')
    });

    return (
        <section className={`${styles.main} mr-10`}>
            <p className="text text-position text_type_main-large mt-10 mb-5">
                Соберите бургер
            </p>
            <TabIngredients current={current} scrollToTab={scrollToTab}/>
            <div className={styles.ingredients_scroll}>
                <div
                    className={`${styles.ingredients_menu} mt-10 mb-10`}>
                    <h3 ref={bunsInView} className={`${styles.text_position} text text_type_main-medium`}>
                        Булки
                    </h3>
                    <div
                        className={`${styles.buns} mt-6 ml-4 mr-4`}>{buns}</div>
                    <h3 ref={sauceInView} className={`${styles.text_position} text text_type_main-medium mt-10`}>
                        Соусы
                    </h3>
                    <div
                        className={`${styles.buns} mt-6 ml-4 mr-4`}>{sauces}</div>
                    <h3 ref={mainsInView} className={`${styles.text_position} text text_type_main-medium mt-10`}>
                        Начинки
                    </h3>
                    <div className={`${styles.buns} mt-6 ml-4 mr-4`}>{mains}</div>
                </div>
            </div>
        </section>
    )
};
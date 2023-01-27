import React from "react";
import {CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {data} from "../api";

function TabIngredients() {
    const [current, setCurrent] = React.useState('one')
    return (
        <div style={{display: 'flex'}}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}

function createIngredientsCard(card) {
    return (
        <div className="mb-8" key={card._id}>
            <img src={card.image} className="ingredient-image" alt={card.name}/>
            <div className="mt-1 mb-1 price-flex">
                <p className="text text_type_digits-medium mr-2">{card.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default">{card.name}</p>
        </div>
    )
}

export const BurgerIngredients = () => {
    const buns = data.filter(item => item.type === 'bun').map(item => {
        return createIngredientsCard(item)
    });
    const mains = data.filter(item => item.type === 'main').map(item => {
        return createIngredientsCard(item)
    });
    const sauces = data.filter(item => item.type === 'sauce').map(item => {
        return createIngredientsCard(item)
    });

    return <section className="main mr-10">
        <p className="text text-position text_type_main-large mt-10 mb-5">
            Соберите бургер
        </p>
        <TabIngredients/>
        <div className="ingredients-scroll">
            <div className="ingredients-menu mt-10 mb-10">
                <p className="text text-position text_type_main-medium" id="buns">
                    Булки
                </p>
                <div className="buns mt-6 ml-4 mr-4">{buns}</div>
                <p className="text text-position text_type_main-medium mt-10" id="sauces">
                    Соусы
                </p>
                <div className="buns mt-6 ml-4 mr-4">{sauces}</div>
                <p className="text text-position text_type_main-medium mt-10" id="mains">
                    Начинки
                </p>
                <div className="buns mt-6 ml-4 mr-4">{mains}</div>
            </div>
        </div>

    </section>
}
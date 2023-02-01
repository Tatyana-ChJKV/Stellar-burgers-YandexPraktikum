import React, {useState} from "react";
import {Counter, CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {data} from "../api";
import {Modal} from "../modal/Modal";
import {IngredientDetails} from "../ingredient-details/IngredientDetails";

function TabIngredients() {

    const [current, setCurrent] = useState('one')

    const scrollToTab = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start'})
        }
    }

    return (
        <div style={{display: 'flex'}}>
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

function CreateIngredientsCard(card) {

    const [modalOpened, setModalOpened] = useState(false);

    const closeModal = () => setModalOpened(false);

    const openModal = () => setModalOpened(true);

    return (
        <div className="mb-8" key={card._id} id="open-modal" onClick={() => {openModal(card)}}>
            <img src={card.image} className="ingredient-image" alt={card.name} />
            <div className="mt-1 mb-1 price-flex">
                <p className="text text_type_digits-medium mr-2">{card.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default">{card.name}</p>
            <div className="ingredient-counter">
                <Counter count={0} size="default" extraClass="m-1" />
            </div>
            {modalOpened && (
                <Modal onClick={closeModal}>
                 <IngredientDetails />
                </Modal>)}
        </div>
    )
}

export const BurgerIngredients = () => {
    const buns = data.filter(item => item.type === 'bun').map(item => {
        return CreateIngredientsCard(item)
    });
    const mains = data.filter(item => item.type === 'main').map(item => {
        return CreateIngredientsCard(item)
    });
    const sauces = data.filter(item => item.type === 'sauce').map(item => {
        return CreateIngredientsCard(item)
    });

    return (
        <section className="main mr-10">
        <p className="text text-position text_type_main-large mt-10 mb-5">
            Соберите бургер
        </p>
        <TabIngredients/>
        <div className="ingredients-scroll">
            <div className="ingredients-menu mt-10 mb-10">
                <h3 className="text text-position text_type_main-medium" id="buns">
                    Булки
                </h3>
                <div className="buns mt-6 ml-4 mr-4">{buns}</div>
                <h3 className="text text-position text_type_main-medium mt-10" id="sauces">
                    Соусы
                </h3>
                <div className="buns mt-6 ml-4 mr-4">{sauces}</div>
                <h3 className="text text-position text_type_main-medium mt-10" id="mains">
                    Начинки
                </h3>
                <div className="buns mt-6 ml-4 mr-4">{mains}</div>
            </div>
        </div>
    </section>
    )
}
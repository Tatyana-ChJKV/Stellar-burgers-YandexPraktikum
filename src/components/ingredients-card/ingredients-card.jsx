import React, {useState} from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Modal} from "../modal/modal";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import styles from "./ingredients-card.module.css";
import PropTypes from "prop-types";

export const IngredientsCard = ({card}) => {
    const [modalOpened, setModalOpened] = useState(false);

    function openModal() {
        setModalOpened(true)
    }

    function closeModal() {
        setModalOpened(false)
    }

    return (
        <div className="mb-8"
             key={card._id}
             id="open-modal"
             onClick={openModal}>
            <img src={card.image} className={styles.ingredient_image}
                 alt={card.name}/>
            <div className={`${styles.price_flex} mt-1 mb-1`}>
                <p className="text text_type_digits-medium mr-2">{card.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default">{card.name}</p>
            <div className={styles.ingredient_counter}>
                <Counter count={0}
                         size="default"
                         extraClass="m-1"/>
            </div>
            {modalOpened && (
                <Modal onClick={closeModal}
                       modalHeader="Детали ингредиента">
                    <IngredientDetails card={card}/>
                </Modal>)}
        </div>
    )
}

IngredientsCard.propTypes = {
    card: PropTypes.object.isRequired
}
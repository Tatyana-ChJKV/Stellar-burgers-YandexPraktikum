import React, {useState} from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Modal} from "../modal/modal";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import styles from "./ingredients-card.module.css";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {addIngredient} from "../../services/reducers/constructor";

export const IngredientsCard = ({card}) => {
    // console.log(card)
    const count = useSelector(state => state.constructorStore.counters[card.uuid]);
    const [modalOpened, setModalOpened] = useState(false);
    const dispatch = useDispatch();

    function openModal() {
        setModalOpened(true);
        dispatch(addIngredient(card));
    }

    function closeModal() {
        setModalOpened(false)
    }

    return (
        <div className="mb-8"
             key={card.uuid}
             id="open-modal"
             onClick={openModal}>
            {/*counter*/}
            <img src={card.image} className={styles.ingredient_image}
                 alt={card.name}/>
            <div className={`${styles.price_flex} mt-1 mb-1`}>
                <p className="text text_type_digits-medium mr-2">{card.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default">{card.name}</p>
            <div className={styles.ingredient_counter}>
                {count && <Counter count={count}
                         size="default"
                         extraClass="m-1"/>}
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
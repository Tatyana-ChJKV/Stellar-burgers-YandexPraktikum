import styles from "../burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteIngredient} from "../../../services/reducers/constructor";

export const ConstructorCard = ({card}) => {
    // const card = useSelector( state => state.constructorStore.ingredients)
    // console.log(card.price)
const dispatch = useDispatch()
    const deleteCard = (card) => {
        dispatch(deleteIngredient(card))
    }

    return (
        <div className={styles.constructor_card}>
            <DragIcon type="primary"/>
            {card && <ConstructorElement
                key={card.uuid}
                type={card.type}
                text={card.name}
                price={card.price}
                thumbnail={card.image_mobile}
                handleClose={() => deleteCard(card)}
            />}
        </div>
    )
}

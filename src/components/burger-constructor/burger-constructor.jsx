import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import {OrderDetails} from "../order-details/order-details";
import {Modal} from "../modal/modal";
import styles from "./burger-constructor.module.css"
import {useDispatch, useSelector} from "react-redux";
import {ConstructorCard} from "./ingredient-card-in-burger-constructor/ingredient-card-in-burger-constructor";
import {useDrop} from "react-dnd";
import {addIngredient} from "../../services/reducers/constructor";

export const BurgerConstructor = () => {
    const bun = useSelector(state => state.constructorStore.bun);
    const card = useSelector(state => state.constructorStore.ingredients);
    const [modalOpened, setModalOpened] = useState(false);
    const openModal = () => setModalOpened(true)
    const closeModal = () => setModalOpened(false)
    const getPrice = (card) => {
        let initialPrice = 0
        if (card.length > 0) {
            initialPrice = initialPrice + card.reduce((sum, ingredient) => {
                return sum + ingredient.price
            }, 0)
        }
        return initialPrice
    }
    const dispatch = useDispatch()
    const [, dropTarget] = useDrop({
        accept: "card",
        drop(card) {
            dispatch(addIngredient(card));
        },
    });

    return (
        <section ref={dropTarget}
                 className={styles.section_constructor}
        >
            <div className={`${styles.constructor_element} mt-25`}>
                {bun && <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />}
                {/*<div className={`${styles.ingredients_scroll} ${styles.constructor_scroll}`}>*/}
                <div className={styles.ingredients_scroll}>
                    {card.filter(item => item.type !== 'bun').map((card, index) =>
                        (<div key={card.uuid}><ConstructorCard card={card} index={index}/></div>)
                    )}
                </div>
                {bun && <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />}
                <div className={`${styles.price_button_constructor} mt-10 mr-4`}>
                    <div className={`${styles.price_button_elements} mr-10`}>
                        <p className="text text_type_digits-medium mr-2">
                            {getPrice(card)}
                        </p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary"
                            onClick={openModal}
                            htmlType="button"
                            size="medium"
                            disabled={!bun}
                    >
                        Оформить заказ
                    </Button>
                    {modalOpened && (
                        <Modal onClick={closeModal}
                               modalHeader=" ">
                            <OrderDetails/>
                        </Modal>)
                    }
                </div>
            </div>
        </section>
    )
}
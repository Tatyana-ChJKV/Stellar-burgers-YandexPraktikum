import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import {OrderDetails} from "../order-details/order-details";
import {Modal} from "../modal/modal";
import styles from "./burger-constructor.module.css"
import PropTypes from "prop-types";

export const BurgerConstructor = ({cards}) => {
    function createConstructorCard(card) {
        return (
            <div className={styles.constructor_card} key={card._id}>
                <DragIcon type="primary"/>
                <ConstructorElement
                    key={card._id}
                    type={card.type}
                    isLocked={true}
                    text={card.name}
                    price={card.price}
                    thumbnail={card.image_mobile}
                />
            </div>
        )
    }

    const list = cards.filter(item => item.type !== 'bun').map(item => createConstructorCard(item));

    const [modalOpened, setModalOpened] = useState(false);

    function openModal() {
        setModalOpened(true)
    }

    function closeModal() {
        setModalOpened(false)
    }

    return (
        <section className={styles.section_constructor}>
            <div className={`${styles.constructor_element} mt-25`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i"
                    price={200}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
                />
                <div className={`${styles.ingredients_scroll} ${styles.constructor_scroll}`}>
                    {list}
                </div>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i"
                    price={200}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
                />
                <div className={`${styles.price_button_constructor} mt-10 mr-4`}>
                    <div className={`${styles.price_button_elements} mr-10`}>
                        <p className="text text_type_digits-medium mr-2">610</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary"
                            onClick={openModal}
                            htmlType="button"
                            size="medium">
                        Оформить заказ
                    </Button>
                    {modalOpened && (
                        <Modal onClick={closeModal}
                               modalHeader=" ">
                            <OrderDetails/>
                        </Modal>)}
                </div>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    cards: PropTypes.array.isRequired
}
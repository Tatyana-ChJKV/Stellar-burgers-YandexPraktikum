import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import {OrderDetails} from "../order-details/order-details";
import {Modal} from "../modal/modal";
import styles from "./burger-constructor.module.css"
import {useDispatch, useSelector} from "react-redux";
import {addConstructor} from "../../services/reducers/constructor";

export const BurgerConstructor = () => {

    const bun = useSelector( state => state.constructorStore.bun)
    // console.log(bun)
    const card = useSelector( state => state.constructorStore.ingredients)
    // const price = useSelector()
    function createConstructorCard() {
        return (
            <div className={styles.constructor_card} key={card.uuid}>
                <DragIcon type="primary"/>
                <ConstructorElement
                    key={card.uuid}
                    type={card.type}
                    text={card.name}
                    price={card.price}
                    thumbnail={card.image_mobile}
                />
            </div>
        )
    }

    const list = card.filter(item => item.type !== 'bun').map(item => createConstructorCard(item));

    const [modalOpened, setModalOpened] = useState(false);
    // const dispatch = useDispatch();
    function openModal() {
        setModalOpened(true)
        // dispatch(addConstructor())
    }

    function closeModal() {
        setModalOpened(false)
    }

    return (
        <section className={styles.section_constructor}>
            <div className={`${styles.constructor_element} mt-25`}>
                <ConstructorElement
                    {...bun}
                    type="top"
                    isLocked={true}
                    // text={`${bun.name} (верх)`}
                    // price={bun.price}
                    // thumbnail={bun.image_mobile}
                />
                <div className={`${styles.ingredients_scroll} ${styles.constructor_scroll}`}>


                    {list}


                </div>
                <ConstructorElement
                    {...bun}
                    type="bottom"
                    isLocked={true}
                    // text={`${bun.name} (низ)`}
                    // price={bun.price}
                    // thumbnail={bun.image}
                />
                <div className={`${styles.price_button_constructor} mt-10 mr-4`}>
                    <div className={`${styles.price_button_elements} mr-10`}>
                        <p className="text text_type_digits-medium mr-2">price</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary"
                            onClick={openModal}
                            htmlType="button"
                            size="medium"
                    // disabled={!bun || !ingredients.length}
                    >
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
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {data} from "../api";
import React, {useState} from "react";
import {OrderDetails} from "../order-details/OrderDetails";
import {Modal} from "../modal/Modal";

export const BurgerConstructor = () => {
    function createConstructorCard(card) {
        return (
            <div className="constructor-card">
                <DragIcon type="primary"/>
                <ConstructorElement
                    type={card.type}
                    isLocked={true}
                    text={card.name}
                    price={card.price}
                    thumbnail={card.image_mobile}
                />
            </div>
        )
    }

    const list = data.filter(item => item.type !== 'bun').map(item => createConstructorCard(item));

    const [modalOpened, setModalOpened] = useState(false);

    function openModal() {
        setModalOpened(true)
    }

    function closeModal() {
        setModalOpened(false)
    }

    return (
        <section className="section-constructor">
            <div className="mt-25"
                 style={{display: 'flex', flexDirection: 'column', alignItems: "center", gap: '16px'}}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i"
                    price={200}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
                />
                <div className="ingredients-scroll constructor-scroll">
                    {list}
                </div>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i"
                    price={200}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
                />
                <div className="price-button-constructor mt-10 mr-4"
                     style={{display: "flex", alignItems: "center", alignSelf: "flex-end"}}>
                    <div className="mr-10" style={{display: "flex", alignItems: "center"}}>
                        <p className="text text_type_digits-medium mr-2">610</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button onClick={openModal} htmlType="button" type="primary"
                            size="medium">Оформить
                        заказ</Button>
                    {modalOpened && (
                        <Modal onClick={closeModal}>
                            <OrderDetails/>
                        </Modal>)}
                </div>
            </div>
        </section>
    );
};
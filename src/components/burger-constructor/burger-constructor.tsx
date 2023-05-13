import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import {OrderDetails} from "../order-details/order-details";
import {Modal} from "../modal/modal";
import styles from "./burger-constructor.module.css";
import {useDispatch, useSelector} from "../../services/hooks";
import {ConstructorCard} from "./ingredient-card-in-burger-constructor/ingredient-card-in-burger-constructor";
import {useDrop} from "react-dnd";
import {addIngredient, clearConstructor} from "../../services/slices/constructor/constructor-slice";
import {useNavigate} from "react-router-dom";
import {makeOrder} from "../../services/slices/order/order-slice";

export const BurgerConstructor = () => {
    const bun = useSelector((state) => state.constructorStore.bun);
    const card = useSelector((state) => state.constructorStore.ingredients);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const order = useSelector((state: any) => state.orderStore.order);
    const number = order?.order.number;
    const [modalOpened, setModalOpened] = useState(false);
    const user = useSelector(state => state.authorizationStore.data);
    // console.log('info', user)

    const orderNumber = () => {
        const ingredientsId = {
            ingredients: card.map((ingredient) => ingredient._id)
        };
        dispatch(makeOrder(ingredientsId))
    };

    const openModal = () => {
        if (card.length || bun) {
            if (!user) {
                navigate('/login', {replace: true})
            }
            setModalOpened(true);
            orderNumber();
        }
    };

    const closeModal = () => {
        setModalOpened(false);
        dispatch(clearConstructor());
    };

    const [, dropTarget] = useDrop({
        accept: "card",
        drop(card) {
            dispatch(addIngredient(card));
        }
    });

    const getPrice = () => {
        let initialPrice = 0;
        if (card.length > 0) {
            card.filter((card) => card.type !== "bun")
                .forEach((ingredient) => {
                    initialPrice += ingredient.price;
                })
        }
        if (bun) {
            initialPrice += bun.price * 2;
        }
        return initialPrice;
    };

    return (
        <section ref={dropTarget}
                 className={styles.section_constructor}
                 data-cy="constructor"
        >
            <div className={`${styles.constructor_element} mt-25`}>
                {bun && <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />}
                <div className={`${styles.ingredients_scroll} ${styles.constructor_scroll}`}>
                    {card.filter((card) => card.type !== 'bun')
                        .map((card, index) => (
                            <ConstructorCard key={card.uuid} card={card} index={index}/>
                        ))}
                </div>
                {bun && <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}/>
                }
                <div className={`${styles.price_button_constructor} mt-10 mr-4`}>
                    <div className={`${styles.price_button_elements} mr-10`}>
                        <p className="text text_type_digits-medium mr-2">
                            {getPrice()}
                        </p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary"
                            onClick={openModal}
                            htmlType="button"
                            size="medium"
                            disabled={!card.length || !bun}>
                        Оформить заказ
                    </Button>
                    {modalOpened && number && (
                        <Modal onClick={closeModal}
                               modalHeader=" ">
                            <OrderDetails orderNumber={number}/>
                        </Modal>)
                    }
                </div>
            </div>
        </section>
    )
};
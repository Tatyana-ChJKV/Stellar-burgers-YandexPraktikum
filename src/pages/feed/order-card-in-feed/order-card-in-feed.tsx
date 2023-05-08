import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./order-card-in-feed.module.css";
import clsx from "clsx";
import {useSelector} from "../../../services/hooks";
import React from "react";
import {TOrder} from "../../../utils/types";
import {IngredientsInFeed} from "../ingredients-in-feed/ingredients-in-feed";
import {NavLink} from "react-router-dom";
import {useLocation} from "react-router";
import {totalPrice} from "../../feed-id/feed-id-page/feed-id-page";

type TOrderCardInFeed = {
    order: TOrder;
    urlToCardId: string;
};

export const OrderCardInFeed: React.FC<TOrderCardInFeed> = ({order, urlToCardId}) => {
    // const ordersData = useSelector((state) => state.ordersStore.data?.orders)
    const card = useSelector(state => state.ingredientsStore.data)
    const location = useLocation();

    return (
        <div className={styles.card}>
            <NavLink to={`${urlToCardId}/${order._id}`}
                     state={{backgroundLocation: location}}
                     className={styles.delete_underline_text}>
                <div className={clsx(styles.order_number_and_date, "pb-6")}>
                    <h2 className="text text_type_digits-default">
                        {`#${order.number}`}
                    </h2>
                    <p className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(order.createdAt)}/> i-GMT+3
                    </p>
                </div>
                <h2 className="text text_type_main-medium pb-6">
                    {order.name}
                </h2>
                <div className={styles.ingredients_and_price_details}>
                    <div className={styles.ingredients}>
                        <IngredientsInFeed cards={card} card={order.ingredients}/>
                    </div>
                    <div className={styles.price}>
                        <div className="text text_type_digits-default">
                            {totalPrice(card, order.ingredients)}
                        </div>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </NavLink>
        </div>
    );
};
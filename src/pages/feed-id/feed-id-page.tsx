import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./feed-id-page.module.css"
import clsx from "clsx";
import {TCard, TOrder} from "../../utils/types";
import React, {useEffect} from "react";
import {wsConnectOrder, wsDisconnectOrder} from "../../services/slices/orders-reduces/actions";
import {BURGER_API_WSS_FEED} from "../../utils/url";
import {useDispatch, useSelector} from "../../services/hooks";
import {IngredientsInFeedIdPage} from "./ingredients-in-feed-id-page/ingredients-in-feed-id-page";

type TFeedPageProps = {
    order: TOrder;
};

export function totalPrice(cards: TCard[], card: string[]) {
    let totalPrice = 0;

    card.forEach((idIngredient) => {
        const ingredientInOrder = cards?.find((ingredient) => ingredient._id === idIngredient);
        return totalPrice = ingredientInOrder?.price
            ? ingredientInOrder.price + totalPrice
            : totalPrice;
    });
    return totalPrice;
}

export const FeedIdPage: React.FC<TFeedPageProps> = ({order}) => {
    const dispatch = useDispatch();
    const orderIngredient = order.ingredients;
    console.log('orderIngredient', orderIngredient)
    const card = useSelector(state => state.ingredientsStore.data)

    useEffect(() => {
        // const accessToken = getCookie("accessToken");
        dispatch(wsConnectOrder({
            // wsUrl: `${BURGER_API_WSS_FEED}?token=${accessToken?.replace("Bearer ", "")}`,
            wsUrl: BURGER_API_WSS_FEED,
            withTokenRefresh: true
        }))
        return () => {
            dispatch(wsDisconnectOrder())
        }
    }, [dispatch]);

    return (
        <div className={styles.order_detail}>
            <p className={clsx(styles.order_number, "text text_type_digits-default")}>
                {`#${order.number}`}
            </p>
            <p className="text text_type_main-medium mt-10">
                {order.name}
            </p>
            <p className={clsx(styles.status, "text text_type_main-small mt-3")}>
                {order.status === "done" && "Выполнен"}
                {order.status !== "done" && "В работе"}
            </p>
            <div>
                <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
                <div className={styles.scroll_ingredients}>
                    <IngredientsInFeedIdPage cards={card} card={order.ingredients}/>
                </div>
            </div>
            <div className={clsx(styles.order_info, "mt-10 mb-10")}>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(order.createdAt)}/>
                </p>
                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">
                        {totalPrice(card, order.ingredients)}
                    </p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    );
};
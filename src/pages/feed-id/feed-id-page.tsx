import {useDispatch, useSelector} from "../../services/hooks";
import {useLocation, useParams} from "react-router";
import {wsConnectOrder, wsDisconnectOrder} from "../../services/slices/orders-reduces/actions";
import React, {useEffect} from "react";
import {BURGER_API_WSS_FEED} from "../../utils/url";
import {TOrder} from "../../utils/types";
import styles from "./feed-id-page.module.css";
import clsx from "clsx";
import {IngredientsInFeedIdPage} from "./ingredients-in-feed-id-page/ingredients-in-feed-id-page";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {totalPrice} from "../../utils/constants";


export const FeedIdPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {id} = useParams();
    const background = location.state?.background;
    const orders = useSelector((state) => state.ordersStore.data?.orders);
    const card = useSelector(state => state.ingredientsStore.data)
    const order = orders?.find((order: TOrder) => order._id === id);
    // console.log('order', order)

    useEffect(() => {
        if (location.pathname.startsWith('/profile') && !background) {
            dispatch(wsConnectOrder({
                wsUrl: BURGER_API_WSS_FEED,
                withTokenRefresh: true
            }))
        } else if ((location.pathname.startsWith('/feed')) && !background) {
            dispatch(wsConnectOrder({
                wsUrl: BURGER_API_WSS_FEED,
                withTokenRefresh: true
            }))
        } else {
            return () => {
                dispatch(wsDisconnectOrder())
            }
            // dispatch(wsDisconnectOrder())
        }
    }, [location.pathname]);

    return (
        <>
            {order &&
                // <FeedIdPage order={order}/>
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
            }
        </>
    );
};
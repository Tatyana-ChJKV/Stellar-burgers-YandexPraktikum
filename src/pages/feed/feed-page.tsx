import styles from "./feed-page.module.css"
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "../../services/hooks";
import {BURGER_API_WSS_FEED} from "../../utils/url";
// import {getCookie} from "../../utils/cookie";
import {wsConnectOrder, wsDisconnectOrder} from "../../services/slices/orders-reduces/actions";
import {OrderCardInFeed} from "./order-card-in-feed/order-card-in-feed";
import clsx from "clsx";

export const FeedPage = () => {
    const dispatch = useDispatch();
    const ordersData = useSelector((state) => state.ordersStore.data);
    // console.log('ordersFeed', ordersData)
    const totalOrdersToday = ordersData?.totalToday;
    // console.log(totalOrdersToday)
    const totalOrders = ordersData?.total;
    const ordersArray = ordersData?.orders;
    // console.log('array', ordersArray)
    const readyOrders = ordersArray?.filter((order) => order.status === 'done');
    // console.log('ready', readyOrders)
    const unreadyOrders = ordersArray?.filter((order) => order.status !== 'done');


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
        <div className={styles.feed_page}>
            <h1 className={clsx(styles.feed_grid, "text text_type_main-large mt-10 mb-5")}>
                Лента заказов
            </h1>
            <div className={styles.feed_cards}>
                {ordersArray?.map((order) => (
                    <OrderCardInFeed
                        order={order}
                        urlToCardId={"/feed"}
                        key={order._id}
                    />
                ))}
            </div>
            <div className={styles.stats}>
                <div className={styles.statuses}>
                    <div className={styles.status}>
                        <h2 className="text text_type_main-medium mb-6">
                            Готовы:
                        </h2>
                        <div className={styles.numbers}>
                            {readyOrders?.map((order) => (
                                <div
                                    className="text text_type_digits-default text_color_success"
                                    key={order._id}>
                                    {order.number}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.status}>
                        <h2 className="text text_type_main-medium mb-6 mt-1">
                            В работе:
                        </h2>
                        <div className={styles.numbers}>
                            {unreadyOrders?.map((order) => (
                                <div className="text text_type_digits-default"
                                     key={order._id}>
                                    {order.number}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="text text_type_main-medium">
                        Выполнено за все время:
                    </h4>
                    <p className="text text_type_digits-large">
                        {totalOrders}
                    </p>
                </div>
                <div>
                    <h4 className="text text_type_main-medium">
                        Выполнено за сегодня:
                    </h4>
                    <p className="text text_type_digits-large">
                        {totalOrdersToday}
                    </p>
                </div>
            </div>
        </div>
    );
};
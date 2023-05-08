import React, {useEffect} from "react";
import {wsConnectOrder, wsDisconnectOrder} from "../../services/slices/orders-reduces/actions";
import {BURGER_API_WSS_FEED} from "../../utils/url";
import {useDispatch, useSelector} from "../../services/hooks";
import styles from "../feed/feed-page.module.css";
import {OrderCardInFeed} from "../feed/order-card-in-feed/order-card-in-feed";
import clsx from "clsx";

export const ProfileOrdersPage = () => {
    const dispatch = useDispatch();
    const ordersData = useSelector((state) => state.ordersStore.data);
    const ordersArray = ordersData?.orders;


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
    <>
        <div className={clsx(styles.feed_cards)}>
            {ordersArray?.map((order) => (
                <OrderCardInFeed
                    order={order}
                    urlToCardId={"/feed"}
                    key={order._id}
                />
            ))}
        </div>
    </>
)
}
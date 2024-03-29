import React, {useEffect} from "react";
import {wsConnectOrder, wsDisconnectOrder} from "../../services/slices/orders/actions";
import {BURGER_API_WSS_FEED} from "../../utils/url";
import {useDispatch, useSelector} from "../../services/hooks";
import styles from "../feed/feed-page.module.css";
import {OrderCardInFeed} from "../feed/order-card-in-feed/order-card-in-feed";
import clsx from "clsx";
import {getCookie} from "../../utils/cookie";

export const ProfileOrdersPage = () => {
    const dispatch = useDispatch();
    const ordersData = useSelector((state) => state.ordersStore.data);
    const ordersArray = ordersData?.orders;

    useEffect(() => {
        const accessToken = getCookie("accessToken");
        dispatch(wsConnectOrder({
            wsUrl: `${BURGER_API_WSS_FEED}?token=${accessToken?.replace("Bearer ", "")}`,
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
                    urlToCardId={"/profile/orders"}
                    key={order._id}
                />
            ))}
        </div>
    </>
)
}
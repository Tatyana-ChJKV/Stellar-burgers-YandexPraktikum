
import {FeedIdPage} from "./feed-id-page/feed-id-page";
import {useDispatch, useSelector} from "../../services/hooks";
import {useLocation, useParams} from "react-router";
import {wsConnectOrder, wsDisconnectOrder} from "../../services/slices/orders-reduces/actions";
import {useEffect, useMemo} from "react";
import {BURGER_API_WSS_FEED} from "../../utils/url";
import {TOrder} from "../../utils/types";

export const FeedIdPageMain = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const background = location.state?.background;
    const orders = useSelector((state: any) => state.ordersStore.data?.orders);
    const {id} = useParams();
    const order = useMemo(() => orders?.find((order: TOrder) => order._id === id), [id, orders]);
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
                dispatch(wsDisconnectOrder())
            }
    }, [location.pathname]);

    return (
        <>
            {order &&
                <FeedIdPage order={order}/>
            }

        </>
    );
};
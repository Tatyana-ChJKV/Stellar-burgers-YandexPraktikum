import DonePicture from "../../images/done.svg"
import styles from "./order-details.module.css"
import React, {useEffect} from "react";
import {getCookie} from "../../utils/cookie";
import {wsConnectOrder, wsDisconnectOrder} from "../../services/slices/orders/actions";
import {useDispatch} from "../../services/hooks";
const BURGER_API_WSS_FEED = "wss://norma.nomoreparties.space/orders/all";

type TOrderDetailsProps = {
    orderNumber: number;
};

export const OrderDetails:React.FC<TOrderDetailsProps> = ({orderNumber}) => {
    // const dispatch = useDispatch()
    //
    // useEffect(() => {
    //     const accessToken = getCookie("accessToken");
    //     dispatch(wsConnectOrder({wsUrl:`${BURGER_API_WSS_FEED}?token=${accessToken?.replace("Bearer ", "")}` ,
    //         withTokenRefresh: true}))
    //     return () => {
    //         dispatch(wsDisconnectOrder())
    //     }
    // }, []);

    return (
        <div className={`${styles.elements_display_flex} mt-4 mb-30`}>
            <h2 className="text text_type_digits-large">{orderNumber}</h2>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={DonePicture}
                 alt="Done"
                 className="mt-15 mb-15"/>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                станции</p>
        </div>
    )
};

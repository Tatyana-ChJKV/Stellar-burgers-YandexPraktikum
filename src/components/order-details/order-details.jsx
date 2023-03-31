import DonePicture from "../../images/done.svg"
import styles from "./order-details.module.css"
import PropTypes from "prop-types";

export const OrderDetails = ({orderNumber}) => {
    return (
        <div className={`${styles.elements_display_flex} mt-4 mb-30`}>
            <h2 className="text text_type_digits-large">{orderNumber}</h2>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={DonePicture}
                 alt="Done"
                 className="mt-15 mb-15"/>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired
}
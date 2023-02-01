import DonePicture from "../../images/done.svg"

export const OrderDetails = () => {
    return (
        <div className="mt-4 mb-30">
            <h2 className="text text_type_digits-large">034536</h2>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={DonePicture} alt="Done" className="mt-15 mb-15"/>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной
                станции</p>
        </div>
    )
}
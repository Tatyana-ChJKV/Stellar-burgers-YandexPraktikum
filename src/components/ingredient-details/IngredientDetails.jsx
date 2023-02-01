import MeatPicture from "../../images/meat-01.svg"

export const IngredientDetails = () => {
    return (
            <div className="">
                <img src={MeatPicture} alt="Meat"/>
                <h3 className="text text_type_main-medium mt-4 mb-8">Биокотлета из марсианской Магнолии</h3>
                <ul className="ingredient-details-nutrition mb-15">
                    <li>
                        <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">244,4</p>
                    </li>
                    <li>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">12,2</p>
                    </li>
                    <li>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive">17,2</p>
                    </li>
                    <li>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">10,2</p>
                    </li>
                </ul>
            </div>
    )
}
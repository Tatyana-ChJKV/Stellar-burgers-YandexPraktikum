import styles from "./ingredient-details.module.css"
export const IngredientDetails = ({card}) => {
    return (
            <div className={styles.elements_display_flex}>
                <img src={card.image_large}
                     alt={card.name} />
                <h3 className="text text_type_main-medium mt-4 mb-8">{card.name}</h3>
                <ul className={`${styles.ingredient_details_nutrition} mb-15`}>
                    <li className={styles.elements_display_flex}>
                        <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                        <p className="text text_type_digits-default text_color_inactive">{card.calories}</p>
                    </li>
                    <li className={styles.elements_display_flex}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{card.proteins}</p>
                    </li>
                    <li className={styles.elements_display_flex}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{card.fat}</p>
                    </li>
                    <li className={styles.elements_display_flex}>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default text_color_inactive">{card.carbohydrates}</p>
                    </li>
                </ul>
            </div>
    )
}
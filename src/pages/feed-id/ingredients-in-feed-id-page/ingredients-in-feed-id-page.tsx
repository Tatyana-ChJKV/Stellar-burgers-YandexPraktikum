import clsx from "clsx";
import styles from "./ingredients-in-feed-id-page.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {TIngredientsInFeedProps} from "../../feed/ingredients-in-feed/ingredients-in-feed";

export const IngredientsInFeedIdPage:React.FC<TIngredientsInFeedProps> = ({cards, card}) => {
    const ingredientInOrder = cards.filter((item) => card.includes(item._id));

    return (
        <>
            {ingredientInOrder.map((ingredient) => {
                const ingredientsQuantity = card.filter(ingredients => ingredients === ingredient._id).length;
                return (
                <div className={clsx(styles.order_ingredient, "mt-6")} key={ingredient._id}>
                    <div className={styles.ingredient_details_in_order}>
                        <img
                            src={ingredient.image}
                            alt={ingredient.name}
                            className={styles.order_ingredient_image}
                        />
                        <p className="text text_type_main-small ml-4">
                            {ingredient.name}
                        </p>
                    </div>
                    <div className={clsx(styles.ingredient_details_in_order, "mr-6")}>
                        <p className="text text_type_digits-default mr-2">
                            {ingredientsQuantity} x {ingredient.price}
                        </p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
                )
            })}
        </>
    );
};
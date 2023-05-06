import styles from "./ingredients-in-feed.module.css"
import clsx from "clsx";
import {TCard} from "../../../utils/types";
import React from "react";

export type TIngredientsInFeed = {
    ingredients: TCard[];
    orderIngredients: string[];
};

export const IngredientsInFeed: React.FC<TIngredientsInFeed> = ({ingredients, orderIngredients}) => {
    const ingredientInOrder = ingredients.filter((item) => orderIngredients.includes(item._id));

    return (
        <div className={styles.orderIngredients}>
            {ingredientInOrder.map((item, i) => (
                <div
                    className={styles.orderIngredientImg}
                    style={{zIndex: ingredientInOrder.length - i}}
                    key={i}>
                    <img src={item.image_large} alt={item.name}/>
                    {ingredientInOrder.length > 5 && (
                        <p className={clsx(styles.ingredientsCount, "text text_type_digits-default")}>
                            {`+${ingredientInOrder.length - 4}`}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};
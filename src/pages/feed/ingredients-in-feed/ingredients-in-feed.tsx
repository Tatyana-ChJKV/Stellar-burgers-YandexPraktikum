import styles from "./ingredients-in-feed.module.css"
import clsx from "clsx";
import {TCard} from "../../../utils/types";
import React from "react";

export type TIngredientsInFeedProps = {
    cards: TCard[];
    card: string[];
};

export const IngredientsInFeed: React.FC<TIngredientsInFeedProps> = ({cards, card}) => {
    const ingredientInOrder = cards.filter((ingredient) => card.includes(ingredient._id));

    return (
        <div className={styles.order_ingredients}>
            {ingredientInOrder.map((ingredient, i) => (
                <div
                    className={styles.ingredient_image}
                    style={{zIndex: ingredientInOrder.length - i}}
                    key={i}>
                    <img src={ingredient.image_large} alt={ingredient.name}/>
                    {ingredientInOrder.length > 5 && (
                        <p className={clsx(styles.ingredients_count, "text text_type_digits-default")}>
                            {`+${ingredientInOrder.length - 4}`}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};
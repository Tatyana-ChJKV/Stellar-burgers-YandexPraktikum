import {TCard} from "./types";

export function totalPrice(cards: TCard[], card: string[]) {
    let totalPrice = 0;

    card.forEach((idIngredient) => {
        const ingredientInOrder = cards?.find((ingredient) => ingredient._id === idIngredient);
        return totalPrice = ingredientInOrder?.price
            ? ingredientInOrder.price + totalPrice
            : totalPrice;
    });
    return totalPrice;
}
export type TCard = {
    _id: string;
    name: string;
    type: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    uuid: string;
}

export type TCardBunType = {
    _id: string;
    name: string;
    type: "top" | "bottom" | undefined;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    uuid: string;
}
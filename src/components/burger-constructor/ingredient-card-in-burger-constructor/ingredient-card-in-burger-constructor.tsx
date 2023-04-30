import styles from "../burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import {useDispatch} from "../../../services/hooks";
import {deleteIngredient, orderIngredients} from "../../../services/slices/constructor-slice";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {TCardBunType} from "../../../utils/types";

type TConstructorCardProps = {
    card: TCardBunType;
    index: number;
}

export const ConstructorCard: React.FC<TConstructorCardProps> = ({card, index}) => {
    const dispatch = useDispatch()
    const deleteCard = (card: TCardBunType) => dispatch(deleteIngredient(card));

    const ref = useRef<HTMLInputElement>(null)

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        hover(item: {index: number}, monitor) {
            if (!ref.current) {
                return
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch(orderIngredients({dragIndex, hoverIndex}));
            item.index = hoverIndex
        }
    });

    const [{isDragging}, dragTarget] = useDrag({
        type: "ingredient",
        item: {index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    const opacity = isDragging ? 0.3 : 2;

    dragTarget(dropTarget(ref));

    return (
        <div ref={ref}
             style={{opacity}}
             className={styles.constructor_card}>
            <DragIcon type="primary"/>
            <ConstructorElement
                key={card.uuid}
                type={card.type}
                text={card.name}
                price={card.price}
                thumbnail={card.image_mobile}
                handleClose={() => deleteCard(card)}
            />
        </div>
    )
};
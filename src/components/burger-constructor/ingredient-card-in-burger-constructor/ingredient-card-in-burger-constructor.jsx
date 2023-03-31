import styles from "../burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef} from "react";
import {useDispatch} from "react-redux";
import {deleteIngredient, orderIngredients} from "../../../services/slices/constructorSlice";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from "prop-types";

export const ConstructorCard = ({card, index}) => {
    const dispatch = useDispatch()
    const deleteCard = (card) => dispatch(deleteIngredient(card));

    const ref = useRef()

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        hover(item, monitor) {
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
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

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

ConstructorCard.propTypes = {
    card: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
};
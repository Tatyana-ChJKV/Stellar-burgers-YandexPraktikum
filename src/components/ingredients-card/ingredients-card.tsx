import React from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredients-card.module.css";
import {useSelector} from "../../services/hooks";
import {useDrag} from "react-dnd";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {TCard} from "../../utils/types";

type TIngredientsCardProps = {
    card: TCard;
}

export const IngredientsCard: React.FC<TIngredientsCardProps> = ({card}) => {
    // console.log(card)
    const count = useSelector((state) => state.constructorStore.counters[card._id]);
    const location = useLocation();

    const [{opacity}, dragTarget] = useDrag({
        type: "card",
        item: card,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <Link to={`ingredients/${card._id}`}
              state={{background: location}}
              className={`${styles.delete_underline_text} mb-8`}
              key={card.uuid}
              id="open-modal"
              ref={dragTarget}
              style={{opacity}}
              data-cy="ingredients">
            <img src={card.image}
                 className={styles.ingredient_image}
                 alt={card.name}/>
            <div className={`${styles.price_flex} mt-1 mb-1`}>
                <p className="text text_type_digits-medium mr-2">{card.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default">{card.name}</p>
            <div className={styles.ingredient_counter}>
                {count > 0 &&
                    <Counter count={count}
                             size="default"
                             extraClass="m-1"/>
                }
            </div>
        </Link>
    )
};
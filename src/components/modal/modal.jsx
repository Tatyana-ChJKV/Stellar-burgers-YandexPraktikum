import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import {useEffect} from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";

export const Modal = ({onClick, children}) => {
    const closeByEscape = (e) => {
        if (e.key === "Escape") {
            onClick();
        }
    };

    const closeByOverlay = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClick();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', closeByEscape)
        document.addEventListener('click', closeByOverlay)
        return () => {
            document.removeEventListener('keydown', closeByEscape)
            document.removeEventListener('click', closeByOverlay)
        }
    }, []);

    return createPortal(
        <>
            <div className={styles.modal_header}>
                <div className={`${styles.ingredient_details_header} mt-10 ml-10 mr-10`}>
                    <h2 className="text text_type_main-large">Детали ингредиента</h2>
                    <CloseIcon type="primary"
                               onClick={onClick}/>
                </div>
                {children}
            </div>
            <ModalOverlay/>
        </>, document.getElementById('modal-windows'))
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
}
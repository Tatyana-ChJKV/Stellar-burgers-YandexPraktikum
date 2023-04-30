import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import React, {ReactElement, useEffect} from "react";
import {createPortal} from "react-dom";
import styles from "./modal.module.css";

type TModalProps = {
    onClick: () => void,
    children: ReactElement;
    modalHeader: string;
};

export const Modal:React.FC<TModalProps> = ({onClick, children, modalHeader}) => {
    const closeByEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onClick();
        }
    };

    const closeByOverlay = (e: any) => {
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
            <div className={styles.modal}>
                <div className={`${styles.ingredient_details_header} mt-10 ml-10 mr-10`}>
                    <h2 className="text text_type_main-large">{modalHeader || ''}</h2>
                    <CloseIcon type="primary"
                               onClick={onClick}/>
                </div>
                {children}
            </div>
            <ModalOverlay/>
        </>, document.getElementById('modal-windows') as HTMLDivElement)
};
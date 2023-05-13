import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import React, {ReactElement, useEffect} from "react";
import {createPortal} from "react-dom";
import styles from "./modal.module.css";

type TModalProps = {
    onClick: () => void;
    children: ReactElement;
    modalHeader: string;
};

export const Modal: React.FC<TModalProps> = ({onClick, children, modalHeader}) => {
    const closeByEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onClick();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', closeByEscape)
        return () => {
            document.removeEventListener('keydown', closeByEscape)
        }
    }, [onClick]);

    return createPortal(
        <>
            <div className={styles.modal}>
                <div className={`${styles.ingredient_details_header} mt-10 ml-10 mr-10`}>
                    <h2 className="text text_type_main-large">{modalHeader || ''}</h2>
                    <button className={styles.modal_close} data-cy="modalClose">
                        <CloseIcon type="primary"
                                   onClick={onClick}/>
                    </button>
                </div>
                {children}
            </div>
            <ModalOverlay onClose={onClick}/>
        </>, document.getElementById('modal-windows') as HTMLDivElement)
};
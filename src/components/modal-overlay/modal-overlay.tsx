import styles from "./modal-overlay.module.css"
import React from "react";

type TModalOverlayProps = {
    onClose: () => void;
};

export const ModalOverlay: React.FC<TModalOverlayProps> = ({onClose}) => {
    return (
        <div className={`${styles.modal_overlay} modal-overlay`}
             onClick={onClose}>
        </div>
    )
};
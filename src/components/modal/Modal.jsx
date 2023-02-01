import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../modal-overlay/ModalOverlay";
import "../../App.css";
import {useEffect} from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
// import {OrderDetails} from "../order-details/OrderDetails";


export const Modal = ({onClick, children}) => {

    const closeByEsc = (e) => {
        if (e.key === "Escape") {
            onClick();
        }
    }

    const closeByOverlay = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            onClick();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', closeByEsc)
        document.addEventListener('click', closeByOverlay)
        return () => {
            document.removeEventListener('keydown', closeByEsc)
            document.removeEventListener('click', closeByOverlay)
        }
    }, [])

    return createPortal(
        <>
        {/*// <ModalOverlay onClick={onClick}>*/}
        <div className="modal" id="modal" onClick={onClick}>
            <div className="modal-header modal-closed">
                <div className="ingredient-details-header mt-10 ml-10 mr-10">
                    <h2 className="text text_type_main-large">Детали ингредиента</h2>
                    <CloseIcon onClick={onClick} type="primary"/>
                </div>
                    {children}
            </div>
        </div>
            <ModalOverlay />
        </>, document.getElementById('modal-windows'))

};

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired,
}
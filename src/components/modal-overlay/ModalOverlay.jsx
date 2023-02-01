import PropTypes from "prop-types";

export const ModalOverlay = (children) => {
    return (
        <div className="modal-overlay">
            {children}
        </div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
}
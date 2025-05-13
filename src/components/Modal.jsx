import { createPortal } from "react-dom";
import '../css/Modal.css'

function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {

    return show && createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Header */}
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        x
                    </button>
                </div>
                {/* Body */}
                <div className="modal-body">
                    {content}
                </div>
                {/* Footer */}
                <div className="modal-footer">
                    <button
                        className="cancel-button"
                        onClick={onClose}
                    >
                        Annulla
                    </button>
                    <button
                        className="confirm-button"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default Modal;
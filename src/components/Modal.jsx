import { createPortal } from "react-dom";
import styles from '../css/Modal.module.css';

function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {
    if (!show) return null;

    return createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>{title}</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className={styles.modalBody}>
                    {content}
                </div>

                <div className={styles.modalFooter}>
                    <button
                        className={styles.cancelButton}
                        onClick={onClose}
                    >
                        Annulla
                    </button>
                    <button
                        className={styles.confirmButton}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default Modal;
import { useRef, useState } from "react";
import Modal from "./Modal";
import styles from '../css/Modal.module.css';  // Using the same Modal styles

function EditTaskModal({ task, show, onClose, onSave }) {
    const formRef = useRef();
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || 'To do'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...task, ...formData })
    }

    const formContent = (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
            </div>
        </form>
    )

    return (
        <Modal
            title="Modifica task"
            content={formContent}
            show={show}
            onClose={onClose}
            onConfirm={() => formRef.current?.requestSubmit()}
            confirmText="Salva"
        />
    )
}

export default EditTaskModal;
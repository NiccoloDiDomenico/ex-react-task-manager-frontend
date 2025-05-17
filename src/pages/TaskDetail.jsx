import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import Nav from "../components/Nav";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";
import styles from '../css/TaskDetail.module.css';

function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Context
    const { tasks, removeTask, updateTask } = useContext(GlobalContext);

    // States
    const [alert, setAlert] = useState({ show: false, type: "", message: "" });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    // Find the respective task
    const task = tasks.find((t) => t.id === parseInt(id));

    const handleRemoveTask = async () => {
        try {
            await removeTask(task);
            navigate('/');
        } catch (error) {
            setAlert({
                show: true,
                type: "error",
                message: error.message
            });
            setTimeout(() => setAlert({ show: false }), 3000)
        }
    }

    const handleUpdateTask = async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            setShowUpdateModal(false);
            setAlert({
                show: true,
                type: "success",
                message: "Task aggiornata con successo"
            });
            setTimeout(() => setAlert({ show: false }), 3000)
        } catch (error) {
            setAlert({
                show: true,
                type: "error",
                message: error.message
            });
            setTimeout(() => setAlert({ show: false }), 3000)
        }
    }

    return (
        <>
            <Nav />

            {/* Task Detail */}
            {task ? (
                <div className={styles.taskDetailContainer}>
                    <h1>Task Details</h1>
                    <div className={styles.taskInfo}>
                        <h2>{task.title}</h2>
                        <p className={styles.description}>{task.description}</p>
                        <div className={styles.metaInfo}>
                            <span className={`${styles.status} ${styles[task.status.toLowerCase().replace(/\s/g, '')]}`}>
                                {task.status}
                            </span>
                            <span className={styles.date}>
                                Created: {new Date(task.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className={styles.btnGroup}>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className={styles.deleteBtn}
                            >
                                Elimina Task
                            </button>
                            <button
                                onClick={() => setShowUpdateModal(true)}
                                className={styles.updateBtn}
                            >
                                Modifica Task
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.notFoundContainer}>
                    <h2>Task non trovata</h2>
                    <p>La task che stai cercando non esiste.</p>
                    <button
                        className={styles.backBtn}
                        onClick={() => navigate('/')}
                    >
                        Torna alla lista
                    </button>
                </div>
            )}

            {/* Modals */}
            <Modal
                title="Conferma eliminazione"
                content="Sei sicuro di voler eliminare questa task?"
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleRemoveTask}
                confirmText="Elimina"
            />
            <EditTaskModal
                task={task}
                show={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                onSave={handleUpdateTask}
            />

            {/* Alert */}
            {alert.show && (
                <div className={`custom-alert ${alert.type}`}>
                    {alert.message}
                </div>
            )}
        </>
    );
} export default TaskDetail;
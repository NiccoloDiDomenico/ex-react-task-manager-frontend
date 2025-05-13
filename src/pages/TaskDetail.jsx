import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import Nav from "../components/Nav";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";
import "../css/TaskDetail.css"

function TaskDetails() {
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
            setAlert({
                show: true,
                type: "success",
                message: "Task eliminata con successo"
            });

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
                <div className="task-detail-container">
                    <h1>Task Details</h1>
                    <div className="task-info">
                        <h2>{task.title}</h2>
                        <p className="description">{task.description}</p>
                        <div className="meta-info">
                            <span className={`status ${task.status.toLowerCase()}`}>
                                {task.status}
                            </span>
                            <span className="date">
                                Created: {new Date(task.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="btn-group">
                            {/* Delete button */}
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="delete-btn"
                            >
                                Elimina Task
                            </button>
                            <Modal
                                title={"Conferma eliminazione"}
                                content={"Sei sicuro di voler eliminare questa task?"}
                                show={showDeleteModal}
                                onClose={() => setShowDeleteModal(false)}
                                onConfirm={handleRemoveTask}
                                confirmText="Elimina"
                            />
                            {/* Update button */}
                            <button
                                onClick={() => setShowUpdateModal(true)}
                                className="update-btn"
                            >
                                Modifica Task
                            </button>
                            <EditTaskModal
                                task={task}
                                show={showUpdateModal}
                                onClose={() => setShowUpdateModal(false)}
                                onSave={handleUpdateTask}
                            />
                        </div>
                    </div>
                </div >
            ) : (
                <div className="not-found-container">
                    <h2>Task non trovata</h2>
                    <p>La task che stai cercando non esiste.</p>
                    <button
                        className="back-btn"
                        onClick={() => navigate('/')}
                    >
                        Torna alla lista
                    </button>
                </div>
            )}
            {/* Alert */}
            {alert.show && (
                <div className={`custom-alert ${alert.type}`}>
                    {alert.message}
                </div>
            )}
        </>
    )
}

export default TaskDetails;
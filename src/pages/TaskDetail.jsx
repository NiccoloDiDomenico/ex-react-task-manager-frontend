import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import Nav from "../components/Nav";
import "../css/TaskDetail.css"
import Modal from "../components/Modal";

function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tasks, removeTask } = useContext(GlobalContext);
    const [alert, setAlert] = useState({ show: false, type: "", message: "" });
    const [showModal, setShowModal] = useState(false);

    // Find the respective task
    const task = tasks.find((t) => t.id === parseInt(id));

    const handleRemoveTask = async () => {
        try {
            await removeTask(task.id);
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
            setTimeout(() => setAlert({ show: false }), 2000)
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
                        <button
                            onClick={() => setShowModal(true)}
                            className="delete-btn"
                        >
                            Elimina Task
                        </button>
                        <Modal
                            title={"Conferma eliminazione"}
                            content={"Sei sicuro di voler eliminare questa task?"}
                            show={showModal}
                            onClose={() => setShowModal(false)}
                            onConfirm={handleRemoveTask}
                            confirmText="Elimina"
                        />
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
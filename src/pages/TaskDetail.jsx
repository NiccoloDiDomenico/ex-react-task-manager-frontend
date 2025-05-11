import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import Nav from "../components/Nav";
import "../css/TaskDetail.css"

function TaskDetails() {
    const { id } = useParams();
    const { tasks } = useContext(GlobalContext);

    // Find the respective task
    const task = tasks.find((t) => t.id === parseInt(id));

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
                            onClick={() => console.log("Elimino task:", id)}
                            className="delete-btn"
                        >
                            Elimina Task
                        </button>
                    </div>
                </div >
            ) : (
                <h2>Task non trovata</h2>
            )
            }
        </>
    )
}

export default TaskDetails;
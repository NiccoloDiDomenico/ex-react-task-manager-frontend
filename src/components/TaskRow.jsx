import { memo } from "react";
import { Link } from "react-router-dom";

function TaskRow({ task }) {
    const statusColors = {
        "To do": "red",
        "Doing": "yellow",
        "Done": "green"
    };

    return (
        <tr key={task.id}>
            <td><Link to={`/task/${task.id}`}>{task.title}</Link></td>
            <td className="status-cell" style={{ backgroundColor: statusColors[task.status] }}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr >
    )
}

export default memo(TaskRow);
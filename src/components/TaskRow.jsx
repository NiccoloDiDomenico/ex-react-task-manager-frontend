import { memo } from "react";

function TaskRow({ task }) {
    const statusColors = {
        "To do": "red",
        "Doing": "yellow",
        "Done": "green"
    };

    return (
        <tr key={task.id}>
            <td>{task.title}</td>
            <td style={{ backgroundColor: statusColors[task.status] }}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
}

export default memo(TaskRow);
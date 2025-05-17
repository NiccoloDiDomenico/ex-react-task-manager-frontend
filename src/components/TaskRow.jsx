import { memo } from "react";
import { Link } from "react-router-dom";
import styles from '../css/TaskList.module.css';

function TaskRow({ task, checked, handleSelectedChange }) {
    const statusColors = {
        "To do": "#e64219",
        "Doing": "#dbde18",
        "Done": "#4dd922"
    };

    return (
        <tr key={task.id}>
            <td>
                <Link to={`/task/${task.id}`}>{task.title}</Link>
            </td>
            <td className={styles.statusCell} style={{ backgroundColor: statusColors[task.status] }}>
                {task.status.toUpperCase()}
            </td>
            <td className={styles.dataCell}>
                {new Date(task.createdAt).toLocaleDateString()}
            </td>
            <td>
                <input type="checkbox" checked={checked} onChange={handleSelectedChange} />
            </td>
        </tr >
    )
}

export default memo(TaskRow);
import Nav from "../components/Nav";
import { useContext, useMemo, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";
import styles from '../css/TaskList.module.css';

function TaskList() {
    const { tasks } = useContext(GlobalContext);

    // States
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    // Handle Table Sort
    const handleTableSort = (columnToSort) => {
        if (sortBy === columnToSort) {
            setSortOrder((prev) => prev * -1);
        } else {
            setSortBy(columnToSort);
            setSortOrder(1);
        }
    }

    // Sorted Task Array
    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return a.title.localeCompare(b.title) * sortOrder;
                case 'status':
                    const statusOrder = {
                        'To do': 1,
                        'Doing': 2,
                        'Done': 3,
                    }
                    return (statusOrder[a.status] - statusOrder[b.status]) * sortOrder;
                case 'createdAt':
                    return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * sortOrder;
                default:
                    break;
            }
        })
    }, [tasks, sortBy, sortOrder])

    return (
        <>
            <Nav />
            <div className={styles.tableContainer}>
                <h1>Task Manager</h1>
                {/* Search Bar */}
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                        placeholder="Cerca tasks..."
                    />
                </div>
                {/* Table */}
                <table className={styles.tasksTable}>
                    <thead>
                        <tr>
                            <th onClick={() => handleTableSort('title')} className={styles.sortable}>
                                Title <span>{sortBy === 'title' && (sortOrder === 1 ? '↑' : '↓')}</span>
                            </th>
                            <th onClick={() => handleTableSort('status')} className={styles.sortable}>
                                Status <span>{sortBy === 'status' && (sortOrder === 1 ? '↑' : '↓')}</span>
                            </th>
                            <th onClick={() => handleTableSort('createdAt')} className={styles.sortable}>
                                Created At <span>{sortBy === 'createdAt' && (sortOrder === 1 ? '↑' : '↓')}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.map((task) => (
                            <TaskRow key={task.id} task={task} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TaskList;
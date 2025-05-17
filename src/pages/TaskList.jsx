import Nav from "../components/Nav";
import { useCallback, useContext, useMemo, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";
import { debounce } from '../utility/debaunce';
import styles from '../css/TaskList.module.css';

function TaskList() {
    // Context
    const { tasks, removeMultipleTasks } = useContext(GlobalContext);

    // States
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTaskIds, setSelectedTaskIds] = useState([]);
    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

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
    const filteredAndSortedTasks = useMemo(() => {

        // Filtered the initial tasks 
        const filteredTasks = tasks.filter((task) => {
            if (!searchQuery) return true

            const searchLower = searchQuery.toLowerCase()
            const titleMatch = task.title.toLowerCase().includes(searchLower)

            return titleMatch
        })

        // Sort the filtered task
        return [...filteredTasks].sort((a, b) => {
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
    }, [tasks, sortBy, sortOrder, searchQuery])

    const handleSearchQuery = useCallback(
        debounce((value) => {       // value comes from e.target.value
            setSearchQuery(value);
        }, 500), []);

    // EX: user write 'hello'
    //         Time    | User Action    | What Happens
    // --------|---------------|-------------
    // 0ms     | Types 'h'     | onChange triggers → handleSearchQuery('h')
    // 100ms   | Types 'e'     | onChange triggers → clearTimeout(previous), handleSearchQuery('he')
    // 150ms   | Types 'l'     | onChange triggers → clearTimeout(previous), handleSearchQuery('hel')
    // 200ms   | Types 'l'     | onChange triggers → clearTimeout(previous), handleSearchQuery('hell')
    // 250ms   | Types 'o'     | onChange triggers → clearTimeout(previous), handleSearchQuery('hello')
    // 750ms   | (waiting)     | Finally setSearchQuery('hello') executes

    // Handle multiple delete
    const toggleSelection = (taskId) => {
        setSelectedTaskIds((prev) => {
            const isSelected = prev.includes(taskId);

            if (isSelected) {
                // remove taskId if already selected
                return prev.filter((id) => id !== taskId);
            } else {
                // add taskId if not selected
                return [...prev, taskId];
            }
        })
    }

    const handleSelectedTasks = async () => {
        try {
            await removeMultipleTasks(selectedTaskIds);
            setAlert({
                show: true,
                type: "success",
                message: "Tasks eliminate con successo"
            });
            setTimeout(() => setAlert({ show: false }), 3000)
            setSelectedTaskIds([]);
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
            <div className={styles.tableContainer}>
                <h1>Task Manager</h1>
                {/* Search Bar */}
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        // value={searchQuery}
                        onChange={(e) => handleSearchQuery(e.target.value)}
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedTasks.map((task) => (
                            <TaskRow
                                key={task.id}
                                task={task}
                                checked={selectedTaskIds.includes(task.id)}
                                handleSelectedChange={() => toggleSelection(task.id)}
                            />
                        ))}
                    </tbody>
                </table>

                {/* Button Delete Selected Tasks */}
                {selectedTaskIds.length > 0 && (
                    <button className={styles.deleteBtn} onClick={handleSelectedTasks}>
                        Elimina tasks selezionate
                    </button>
                )}

                {/* Alert */}
                {alert.show && (
                    <div className={`custom-alert ${alert.type}`}>
                        {alert.message}
                    </div>
                )}
            </div >
        </>
    );
}

export default TaskList;
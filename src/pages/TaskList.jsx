import Nav from "../components/Nav";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";
import '../css/TaskList.css';

function TaskList() {
    const { tasks } = useContext(GlobalContext);

    return (
        <>
            <Nav />
            <div className="table-container">
                <h1>Task Manager</h1>
                <table className="tasks-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <TaskRow key={task.id} task={task} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TaskList;
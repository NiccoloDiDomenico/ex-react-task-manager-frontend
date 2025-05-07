import Nav from "../components/Nav";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";


function TaskList() {
    // GlobalContext datas
    const { tasks } = useContext(GlobalContext);

    return (
        <>
            <Nav />
            {/* Table section */}
            <section>
                <h3>Tasks table</h3>
                <table>
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
            </section>
        </>
    )
}

export default TaskList;
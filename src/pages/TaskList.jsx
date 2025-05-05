import Nav from "../components/Nav";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

function TaskList() {
    const { task } = useContext(GlobalContext);
    console.log(task);

    return (
        <>
            <Nav />
            <h1>TaskList Page</h1>
        </>
    )
}

export default TaskList;
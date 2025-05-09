import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL

function useTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/tasks`)
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error(err))
    }, [])

    const addTask = () => {
        // codice da eseguire
    }

    const removeTask = () => {
        // codice da eseguire
    }

    const updateTask = () => {
        // codice da eseguire
    }

    return { tasks, addTask, removeTask, updateTask }
}

export default useTasks;
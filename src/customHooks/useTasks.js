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

    const addTask = async (taskToAdd) => {
        try {
            const res = await fetch(`${apiUrl}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskToAdd)
            });
            const data = await res.json();

            if (data.success) {
                setTasks([...tasks, data.task]);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    }

    const removeTask = async (taskToRemoveId) => {
        try {
            const res = await fetch(`${apiUrl}/tasks/${taskToRemoveId}`, {
                method: 'DELETE'
            });
            const data = await res.json();

            if (data.success) {
                setTasks(tasks.filter((t) => t.id !== taskToRemoveId));
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    }

    const updateTask = () => {
        // codice da eseguire
    }

    return { tasks, addTask, removeTask, updateTask }
}

export default useTasks;
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

    const removeTask = async (taskToRemove) => {
        try {
            const res = await fetch(`${apiUrl}/tasks/${taskToRemove.id}`, {
                method: 'DELETE'
            });
            const data = await res.json();

            if (data.success) {
                setTasks(tasks.filter((t) => t.id !== taskToRemove.id));
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    }

    const updateTask = async (taskToUpdate) => {
        try {
            const res = await fetch(`${apiUrl}/tasks/${taskToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskToUpdate)
            });
            const data = await res.json();

            if (data.success) {
                setTasks(tasks.map((t) => t.id === taskToUpdate.id ? data.task : t))
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    }

    const removeMultipleTasks = async (tasksToRemove) => {
        // Create an array of delete promises
        const deletePromises = tasksToRemove.map((id) => {
            return fetch(`${apiUrl}/tasks/${id}`, {
                method: 'DELETE'
            }).then((res) => res.json());
        });

        // Run all promises in parallel
        const results = await Promise.allSettled(deletePromises);

        // Track failed deletions
        const rejectedPromises = results.reduce((acc, result, index) => {
            if (result.status === 'rejected' || !result.value.success) {
                acc.push(tasksToRemove[index]);
            }
            return acc;
        }, []);

        // Update state for successful deletions
        const fullfilledPromises = tasksToRemove.filter(id => !rejectedPromises.includes(id));

        // Update tasks state
        setTasks(prev => prev.filter(task => !fullfilledPromises.includes(task.id)));

        // If any deletions failed, throw error
        if (rejectedPromises.length > 0) {
            throw new Error(`Failed to delete tasks with IDs: ${rejectedPromises.join(', ')}`);
        }
    }

    return { tasks, addTask, removeTask, updateTask, removeMultipleTasks }
}

export default useTasks;
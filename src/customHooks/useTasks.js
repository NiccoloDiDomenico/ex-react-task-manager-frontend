import { useEffect, useReducer } from "react";
import tasksReducer from "../reducers/tasksReducer";
const apiUrl = import.meta.env.VITE_API_URL

function useTasks() {
    const [tasks, dispatchTasks] = useReducer(tasksReducer, []);

    useEffect(() => {
        fetch(`${apiUrl}/tasks`)
            .then((res) => res.json())
            .then((data) => dispatchTasks({ type: 'LOAD_TASKS', payload: data }))
            .catch((err) => console.error(err))
    }, [])

    const addTask = async (taskToAdd) => {
        // Check if taskToAdd.title already exist
        const titleExists = tasks.some((task) =>
            task.title.toLowerCase() === taskToAdd.title.toLowerCase()
        );
        if (titleExists) {
            throw new Error('Una task con questo titolo esiste già');
        };

        // Continue with POST method
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
                dispatchTasks({ type: 'ADD_TASK', payload: data.task });
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    }

    const updateTask = async (taskToUpdate) => {
        // Check if taskToUpdate.title already exist && !== to himself
        const titleExists = tasks.some((task) => task.id !== taskToUpdate.id && task.title.toLowerCase() === taskToUpdate.title.toLowerCase());
        if (titleExists) {
            throw new Error('Una task con questo titolo esiste già');
        }

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
                dispatchTasks({ type: 'UPDATE_TASK', payload: data.task });
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
                dispatchTasks({ type: 'REMOVE_TASK', payload: taskToRemove });
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
        dispatchTasks({ type: 'REMOVE_MULTIPLE_TASKS', payload: fullfilledPromises });

        // If any deletions failed, throw error
        if (rejectedPromises.length > 0) {
            throw new Error(`Failed to delete tasks with IDs: ${rejectedPromises.join(', ')}`);
        }
    }

    return { tasks, addTask, removeTask, updateTask, removeMultipleTasks }
}

export default useTasks;
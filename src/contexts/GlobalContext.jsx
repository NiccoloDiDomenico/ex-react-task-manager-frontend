import { createContext, useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL

// create context
export const GlobalContext = createContext();

// create provider 
export function GlobalProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/tasks`)
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error(err))
    }, [])

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    )
}
import { createContext, useEffect, useState } from "react";
import useTasks from "../customHooks/useTasks";

// context
export const GlobalContext = createContext();

// provider 
export function GlobalProvider({ children }) {
    const { tasks, setTasks } = useTasks();

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children}
        </GlobalContext.Provider>
    )
}
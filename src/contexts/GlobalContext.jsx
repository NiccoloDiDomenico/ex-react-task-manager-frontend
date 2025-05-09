import { createContext } from "react";
import useTasks from "../customHooks/useTasks";

// context
export const GlobalContext = createContext();

// provider 
export function GlobalProvider({ children }) {
    const taskData = useTasks();

    return (
        <GlobalContext.Provider value={{ ...taskData }}>
            {children}
        </GlobalContext.Provider>
    )
}
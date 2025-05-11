import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './contexts/GlobalContext';
import TaskList from './pages/TaskList';
import AddTasks from './pages/AddTasks';
import TaskDetail from './pages/TaskDetail';
import './App.css';

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TaskList />}></Route>
            <Route path="/AddTask" element={<AddTasks />}></Route>
            <Route path="/Task/:id" element={<TaskDetail />}></Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App

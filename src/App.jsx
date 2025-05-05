import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddList from './pages/AddTask';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskList />}></Route>
          <Route path="/AddTask" element={<AddList />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Notes from './pages/Notes/Notes'
import Sidebar from './components/Sidebar/Sidebar'
import Goal from './pages/Goals/Goal';
import Pomodor from './pages/Pomodoro/Pomodoro';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css'

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <Router>
      <div className="app-layout">
        {!visible && <Sidebar/>}
        <Routes>
          <Route path="/" element={<Navigate to="/Dashboard" />} />
          <Route path='/Dashboard' element={<Dashboard/>} />
          <Route path='/Notes' element={<Notes />} />
          <Route path='/Goal' element={<Goal/>} />
          <Route path='/Pomodoro' element={<Pomodor visible={visible} setVisible={setVisible}/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

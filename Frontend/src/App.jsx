import { useState } from 'react'
import Home from './pages/Home'
import Leaderboard from './pages/Leaderboard'
import History from './pages/History'
import { Routes,Route } from 'react-router'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
<Route path="/" element={<Home/>}/>
<Route path="/Leaderboard" element={<Leaderboard/>}/>
<Route path="/History" element={<History/>}/>

      </Routes>
    </>
  )
}

export default App

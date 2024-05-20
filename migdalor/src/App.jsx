import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home';


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
   

   

    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} /> 
            
           
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App

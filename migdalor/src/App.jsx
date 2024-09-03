import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home';
import Login from './Components/Login';


import {HashRouter as Router, Routes, Route, Link, BrowserRouter} from 'react-router-dom';
import {UserProvider} from "./Auth/Auth.jsx";
import ProtectedRoute from "./Auth/ProtectedRoute.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div>
                <UserProvider>
                    <BrowserRouter>

                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route
                                path="/*"
                                element={
                                    <ProtectedRoute>
                                        <Home/>
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                        </BrowserRouter>
                </UserProvider>
            </div>
        </>
)
}

export default App


import React, { useState, useEffect } from 'react'
import Home from './components/Home'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from './components/Profile'
import NotFound from './components/NotFound'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export const Context = React.createContext()

function App() {

  const [userInfo, setUserInfo] = useState(null)

  function getUserInfo() {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'))
    setUserInfo(storedUserInfo)
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div className="App">
      <Context.Provider value={{ userInfo, setUserInfo }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;

import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import './app.css'

const App = () => {

  const routes = (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
  return (
    <div> 
      {routes}
    </div>
  )
}

export default App
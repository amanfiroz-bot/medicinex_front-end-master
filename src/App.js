import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Layouts/Header';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { AuthProvider } from './Components/AuthProvider';
import Profile from './Pages/Profile';
import Orders from './Pages/Orders';
import Shopping from './Pages/Shopping';
import BuyItem from './Components/BuyItem';
import Medicines from './Pages/Medicines';
const App = () => {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Header />}>
                  <Route index element={ <Home/>}/>
                  <Route path='signup' element={<Register/>}/>
                  <Route path='login' element={<Login/>}/>
                  <Route path='profile' element={<Profile/>}/>
                  <Route path='orders' element={<Orders/>}/>
                  <Route path='shopping' element={<Shopping/>}/>
                  <Route path='medicines' element={<Medicines/>}/>
                  <Route path='shopping/buyitem/:Mid' element={<BuyItem/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App

import React from 'react'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Hero from './pages/Hero'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import Signin from './pages/Signin';
import ProtectedRoute from './components/protectedRoute'
import Patient from './pages/Patient'
import Newpatient from './pages/Newpatient'
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
        <Route path='/patient' element={
          <ProtectedRoute>
            <Patient />
          </ProtectedRoute>
        }/>
        <Route path='/patient/newpatient' element={
          <ProtectedRoute>
            <Newpatient/>
          </ProtectedRoute>
        }/>
        <Route path='/login' element={<Login />} />
        <Route path='/signin' element={<Signin />}/>
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App

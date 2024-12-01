import React from 'react'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Hero from './pages/Hero'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import Signin from './pages/Signin';
import ProtectedRoute from './components/protectedRoute'
import Tables from './pages/Tables'
import Newpatient from './pages/Newpatient'
import NewDoctor from './pages/NewDoctor'
import DoctorOverview from './pages/DoctorOverview'
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
        <Route path='/tables' element={
          <ProtectedRoute>
            <Tables />
          </ProtectedRoute>
        }/>
        <Route path='/tables/newpatient' element={
          <ProtectedRoute>
            <Newpatient/>
          </ProtectedRoute>
        }/>
        <Route path='/tables/newdoctor' element={
          <ProtectedRoute>
            <NewDoctor />
          </ProtectedRoute>
        }/>
        <Route path='/doctor/overview' element={
          <ProtectedRoute>
            <DoctorOverview />
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

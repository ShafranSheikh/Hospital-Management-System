import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import ProtectedRoute from './components/ProtectedRoute'
import DoctorDetails from './pages/DoctorDetails';
import PublicRoute from './components/PublicRoute';

// Lazy loading the components
const Hero = lazy(() => import('./pages/Hero'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/login'));
const Signin = lazy(() => import('./pages/Signin'));
const Tables = lazy(() => import('./pages/Tables'));
const Newpatient = lazy(() => import('./pages/Newpatient'));
const NewDoctor = lazy(() => import('./pages/NewDoctor'));
const DoctorOverview = lazy(() => import('./pages/DoctorOverview'));

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Hero />} />
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path='/tables'
              element={
                <ProtectedRoute>
                  <Tables />
                </ProtectedRoute>
              }
            />
            <Route
              path='/tables/newpatient'
              element={
                <ProtectedRoute>
                  <Newpatient />
                </ProtectedRoute>
              }
            />
            <Route
              path='/tables/newdoctor'
              element={
                <ProtectedRoute>
                  <NewDoctor />
                </ProtectedRoute>
              }
            />
            <Route
              path='/doctor/overview'
              element={
                <ProtectedRoute>
                  <DoctorOverview />
                </ProtectedRoute>
              }
            />
            <Route path='/doctor/details/:id'
            element={
              <ProtectedRoute>
                <DoctorDetails/>
              </ProtectedRoute>
            }/>
            <Route path='/login' element={
              <PublicRoute>
                <Login/>
              </PublicRoute>
            } />
            <Route path='/signin' element={
              <PublicRoute>
                <Signin />
              </PublicRoute>
            } />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import LandingPage from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import ConnectPage from './pages/ConnecPage'; // ✅ fixed typo
import ProfilePage from './pages/profile';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar'; // ✅ added

import './styles/styles.css';
import './app.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp < Date.now() / 1000;
        if (isExpired) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (err) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    }
  }, []);

  return (
    <Router>
      {/* ✅ Navbar displayed globally */}
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/dashboard" />
              : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route path="/register" element={<Register/>} />

        <Route
          path="/dashboard"
          element={
            isAuthenticated
              ? <Dashboard setIsAuthenticated={setIsAuthenticated} />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/Jobs"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ConnectPage"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ConnectPage />
            </ProtectedRoute>
          }
        />

        <Route path="/Profile/:id" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;

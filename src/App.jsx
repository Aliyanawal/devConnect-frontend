
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useEffect, useState } from 'react';
import './styles/styles.css';
import './app.css'
import Jobs from './pages/Jobs';
import ConnectPage from './pages/ConnecPage';
import ProfilePage from './pages/profile';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    
    <Router>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />

        <Route path="/Jobs" element={
          <ProtectedRoute>
            <Jobs/>
            </ProtectedRoute>} />
        <Route path="/ConnectPage" element={
          <ProtectedRoute>
            <ConnectPage/>
            </ProtectedRoute>} />
        <Route path="/Profile/:id" element={<ProfilePage/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
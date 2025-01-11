import React, { useState, useEffect } from 'react';
import { auth } from './config/firebaseConfig';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import "./App.css";
import "./index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './Navbar/NavBar';
import MainPage from './components/MainPage';
import ExpenseLogging from './components/ExpenseLogging';
import BudgetManagement from './components/BudgetManagement';
import SavingsTracking from './components/SavingsTracking';
import ReportGeneration from './components/ReportGeneration';
import MediaStorage from './components/MediaStorage';
import Auth from './components/auth'


const App = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (

    <Router>
      {user && <Navbar/>}
        <Routes>
          {user ? (
            <>
              <Route path="/main-page" element={<MainPage />} />
              <Route path="/expense-logging" element={<ExpenseLogging />} />
              <Route path="/budget-management" element={<BudgetManagement />} />
              <Route path="/savings-tracking" element={<SavingsTracking />} />
              <Route path="/report-generation" element={<ReportGeneration />} />
              <Route path="/media-storage" element={<MediaStorage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/auth/*" element={<Auth />} />
              <Route path="*" element={<Navigate to="/auth/login" />}/>
            </>
          )}
        </Routes>
    </Router>

    );
};

export default App;

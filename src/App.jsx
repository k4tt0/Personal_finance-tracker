import React, { useState, useEffect } from 'react';
import { auth } from './config/firebaseConfig';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import "./App.css";
import "./index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './Navbar/NavBar';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import ExpenseLogging from './components/ExpenseLogging';
import BudgetManagement from './components/budget/BudgetManagement';
import SavingsTracking from './components/SavingsTracking';
import ReportGeneration from './components/ReportGeneration';
import MediaStorage from './components/MediaStorage';
import PrivateRoute from './components/PrivateRoute';

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
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/main-page"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/expense-logging"
          element={
            <PrivateRoute>
              <ExpenseLogging />
            </PrivateRoute>
          }
        />
        <Route
          path="/budget-management"
          element={
            <PrivateRoute>
              <BudgetManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/savings-tracking"
          element={
            <PrivateRoute>
              <SavingsTracking />
            </PrivateRoute>
          }
        />
        <Route
          path="/report-generation"
          element={
            <PrivateRoute>
              <ReportGeneration />
            </PrivateRoute>
          }
        />
        <Route
          path="/media-storage"
          element={
            <PrivateRoute>
              <MediaStorage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={user ? "/main-page" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
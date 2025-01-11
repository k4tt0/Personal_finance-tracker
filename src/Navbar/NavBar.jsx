import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseConfig';
import { signOut } from 'firebase/auth';
import './NavBar.css';
import fin1Light from "../images/fin1_day.png";
import fin1Dark from "../images/fin1_night.png";
import toggleLight from "../images/day.png"
import toggleDark from "../images/night.png"

const Navbar = () => {
    const [theme, setTheme] = useState('light');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = theme
    }, [theme]);

    const toggleTheme = () => {
            setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        }

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (err) {
            console.error("Error signing out:", err);
        }
    }

    return (
        <nav className={`navbar ${theme}`}>
            <div className="navbar-logo">
                <img 
                    src={theme == 'light' ? fin1Dark : fin1Light} 
                    alt="logo" 
                    className="logo"/>
                {/* <Link to="/">Personal Finance Tracker</Link> */}
            </div>

            <div className="navbar-links">
              <ul>
                <li><Link to="/main-page">Home Page</Link></li>
                <li><Link to="/expense-logging">Expense Logging</Link></li>
                <li><Link to="/budget-management">Budget Management</Link></li>
                <li><Link to="/savings-tracking">Savings Tracking</Link></li>
                <li><Link to="/report-generation">Report Generation</Link></li>
                <li><Link to="/media-storage">Media Storage</Link></li>
                <li><button onClick={logOut} className="sign-out-button">Sign Out</button></li>
                <li>
                    <img
                        src={theme === 'light' ? toggleDark : toggleLight}
                        alt="Toggle Theme"
                        className="theme-toggle-button"
                        onClick={toggleTheme}
                    />
                </li>
              </ul>
            </div>
        </nav>
    );
};

export default Navbar
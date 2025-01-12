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
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
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
            <div>
                <img 
                    src={theme === 'light' ? fin1Dark : fin1Light} 
                    alt="logo" 
                    className="logo"/>
                {/* <Link to="/">Personal Finance Tracker</Link> */}
            </div>

            <div className="navbar-links">
                <button onClick={() => navigate("/main-page")}>Home Page</button>
                <button onClick={() => navigate("/expense-logging")}>Expense Logging</button>
                <button onClick={() => navigate("/budget-management")}>Budget Management</button>
                <button onClick={() => navigate("/savings-tracking")}>Savings Tracking</button>
                <button onClick={() => navigate("/report-generation")}>Report Generation</button>
                <button onClick={() => navigate("/media-storage")}>Media Storage</button>
                <button onClick={logOut} className="sign-out-button">Log Out</button>
            </div>

            <div className="navbar-toggle">
                <img
                    src={theme === 'light' ? toggleDark : toggleLight}
                    alt="Toggle Theme"
                    className="theme-toggle-button"
                    onClick={toggleTheme}
                />
            </div>
        </nav>
    );
};

export default Navbar
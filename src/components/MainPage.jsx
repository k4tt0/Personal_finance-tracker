import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const MainPage = () => {
    const [username, setUsername] = useState("");
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.currentUser) {
            const user = auth.currentUser;
            setUsername(user.displayName);
            saveUserProfile(user);
        }
    }, []);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const saveUserProfile = async (user) => {
        const userProfile = {
            name: user.displayName,
            email: user.email,
            createdAt: new Date()
        };
        await setDoc(doc(db, "users", user.uid), userProfile);
    };

    const scrollToLinks = () => {
        document.getElementById("links-section").scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="main-page-container">
            <div className={`card-main-page ${theme}`}>
                <h1>Welcome back, {username}!</h1>
                <p className="main-page-p">Welcome to Personal Finance Tracker</p>
                <p className="main-page-p">
                    Take control of your finances with ease and confidence. Personal Finance Tracker is a modern web application designed to simplify financial management and help you achieve your goals. Whether you're tracking income, monitoring expenses, or building your savings, our intuitive platform offers real-time tools to keep you organized and on track.
                </p>
                <p className="main-page-p">
                    With robust data security, a seamless user experience, and cross-device accessibility, Personal Finance Tracker fits effortlessly into your daily routine. Powered by Firebase, it provides secure storage, instant updates, and personalized notifications, ensuring you stay informed every step of the way.
                </p>
                <p className="main-page-p">
                    Start your journey to smarter financial management today!
                </p>
                <button onClick={scrollToLinks}>Explore More</button>
            </div>
            <div id="links-section" className={`card-main-page ${theme}`}>
                <h2>What would you like to do today?</h2>
                <div>
                    <button onClick={() => navigate("/expense-logging")}>Expense Logging</button>
                    <p>Log your daily expenses and categorize them for better tracking.</p>
                </div>
                <div>
                    <button onClick={() => navigate("/budget-management")}>Budget Management</button>
                    <p>Set monthly budgets for different categories and track your spending.</p>
                </div>
                <div>
                    <button onClick={() => navigate("/savings-tracking")}>Savings Tracking</button>
                    <p>Set savings goals and monitor your progress towards achieving them.</p>
                </div>
                <div>
                    <button onClick={() => navigate("/report-generation")}>Report Generation</button>
                    <p>Generate visual reports to get insights into your spending patterns.</p>
                </div>
                <div>
                    <button onClick={() => navigate("/media-storage")}>Media Storage</button>
                    <p>Store and manage your financial documents and receipts securely.</p>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
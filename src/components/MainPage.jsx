import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";

const MainPage = () => {

    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.currentUser){
            setUsername(auth.currentUser.displayName);
        }
    }, []);

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (err) {
            console.error("Error signing out:", err);
        }
    };


    return (
        <div className="card-main-page">
        <h1>Welcome back, {username}!</h1>
        <p className="main-page-p">What would you like to do today?</p>
        <button onClick={() => navigate("/expense-logging")}>Expense Logging</button>
        <button onClick={() => navigate("/budget-management")}>Budget Management</button>
        <button onClick={() => navigate("/savings-tracking")}>Savings Tracking</button>
        <button onClick={() => navigate("/report-generation")}>Report Generation</button>
        <button onClick={() => navigate("/media-storage")}>Media Storage</button>
        <button onClick={logOut}>Log Out</button>
        </div>
    );
};

export default MainPage;
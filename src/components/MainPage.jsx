import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";

const MainPage = () => {

    const navigate = useNavigate();

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (err) {
            console.error("Error signing out:", err);
        }
    };


    return (
        <div className="card">
        <h1>Main Page</h1>
        <p>Welcome to the main page!</p>
        <button onClick={logOut}>Log Out</button>
        </div>
    );
};

export default MainPage;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';

const LogIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const navigate = useNavigate();  

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const logIn = async () => {
        if (!validateEmail(email)) {
            setError("Invalid email format.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User logged in:", user);
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
      <div className="card">
        <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
      <button onClick={logIn}>Log In</button>
      <p className="navigate-text" onClick={() => navigate("/signUp")}>
        Don't have an account? Sign Up
      </p>
      {error && <p>{error}</p>}
    </div>
    )

}; export default LogIn;
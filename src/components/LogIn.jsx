import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link } from 'react-router-dom';
import fin1 from "../images/fin1.png";


const LogIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [remMe, setRemMe] = useState(false);
    const [error, setError] = useState(""); 
    const navigate = useNavigate();  

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");
        const savedPass = localStorage.getItem("password");
        if (savedEmail && savedPass){
            setEmail(savedEmail);
            setPassword(savedPass);
            setRemMe(true);
        }
    }, []);

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
            if (remMe) {
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
            } else {
                localStorage.removeItem("email");
                localStorage,removeItem("password");
            }
            navigate("/main");
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/main");
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
      <div className="card">
        <img src={fin1} alt="fin1" className="fin1-image"/>
        <h2>Log In</h2>
        <h3>Log in to start tracking your finances</h3> 
        <label htmlFor="email">Email</label>
        <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <div className="password-container">
            <input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <i 
                className={`fas ${showPass ? "fa-eye-slash" : "fa-eye"} password-toggle`}
                onClick={() => setShowPass(!showPass)}
            ></i>
           </div>
        <div>
            <input
            type="checkbox"
            id="remMe"
            checked={remMe}
            onChange={(e) => setRemMe(e.target.checked)}
            />
            <label htmlFor="remMe" className="remember-me-label">Remember me</label>
        </div>
      <button onClick={logIn}>Log In</button>
      <button onClick={signInWithGoogle}>Log in with Google</button>
      {error && <p>{error}</p>}
      <p>Don't have an account? <Link to="/auth/signup">Sign Up</Link></p>
    </div>
    )

}; export default LogIn;
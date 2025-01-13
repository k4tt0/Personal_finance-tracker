import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import fin1Light from "../images/fin1_day.png";
import fin1Dark from "../images/fin1_night.png";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [remMe, setRemMe] = useState(false);
    const [error, setError] = useState(""); 
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const navigate = useNavigate();  

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

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
                localStorage.removeItem("password");
            }
            navigate('/main-page'); // Navigate to the home page
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/main-page'); // Navigate to the home page
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
      <div className={`card ${theme}`}>
        <img 
            src={theme === 'light' ? fin1Dark : fin1Light} 
            alt="logo" 
            className="logo"/>
        <h2 className={theme}>Log In</h2>
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
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
    );

}; export default LogIn;
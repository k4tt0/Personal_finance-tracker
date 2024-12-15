import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth' ;
import fin1 from "../images/fin1.png";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateUsername = (username) => {
        const minLength = 3;
        const maxLength = 20;
        const regex = /^[a-zA-Z0-9_]+$/; // only letters, numbers, and underscores
    
        if (username.length < minLength || username.length > maxLength) {
            return `Username must be between ${minLength} and ${maxLength} characters.`;
        }
        if (!regex.test(username)) {
            return "Username can only contain letters, numbers, and underscores.";
        }
        return null;
    };

    const signUp = async () => {
        const validationError = validateUsername(username);
        if(validationError) {
            setError(validationError);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, {
                displayName: username
            });
            console.log("User signed up:", user);
            navigate("/main");
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError("The email address is already in use by another account.");
              } else {
                console.error(err);
                setError(err.message);
              }
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
            <h2> Sign Up </h2> {}
            <h3> Create an account to start tracking your finances </h3>  
            <label htmlFor = "username"> Username </label> 
          <input
            id="username"
            type="text"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor = "email"> Email </label> 
          <input
            id="email"
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor = "password"> Password </label>
          <div className="password-container">
            <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <i 
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle`}
                onClick={() => setShowPassword(!showPassword)}
            ></i>
           </div>
          <button onClick={signUp}>Sign Up</button>
          <button onClick={signInWithGoogle}>Sign up with Google</button>
          {error && <p>{error}</p>}
          <p className="navigate-text" onClick={() => navigate("/login")}>
            Already have an account? Log In
      </p>
        </div>
      );

};

export default SignUp;
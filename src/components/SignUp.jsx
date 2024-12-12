import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth' ;

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateUsername = (username) => {
        const minLength = 3;
        const maxLength = 20;
        const regex = /^[a-zA-Z0-9_]+$/; // Only allows letters, numbers, and underscores
    
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
            console.error(validationError);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await user.updateProfile({
                displayName: username
            });
            console.log("User signed up:", user);
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="card">
          <input
            type="text"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <button onClick={signUp}>Sign Up</button>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
          <p className="navigate-text" onClick={() => navigate("/login")}>
        Already have an account? Log In
      </p>
          {error && <p>{error}</p>}
        </div>
      );

};

export default SignUp;
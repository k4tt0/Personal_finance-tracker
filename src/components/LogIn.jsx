import { useState } from "react";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';

const LogIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User logged in:", user);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input
                //type="text"
                placeholder="Email..."
                //value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password..."
                //value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={logIn}>Log In</button>
        </div>
    )

}; export default LogIn;
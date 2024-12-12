import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import MainPage from "./MainPage";

export const Auth = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/LogIn" />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/main" element={<MainPage />} />
            </Routes>
        </Router>
    );
};
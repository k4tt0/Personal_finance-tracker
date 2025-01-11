import { Route, Routes, Navigate} from "react-router-dom";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import MainPage from "./MainPage";

export const Auth = () => {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/auth/login" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/main" element={<MainPage />} />
        </Routes>
    );
};

export default Auth;
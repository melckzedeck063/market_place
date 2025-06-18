import {useContext} from "react";
import {AuthContext} from "./index";
import {useNavigate} from "react-router-dom";
import AuthGuard from "./AuthGuard";



export default function ProtectedRoute({ children }) {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const { token } = AuthGuard();

    if (!token) {
        setTimeout(() => {
            navigate("/");
            context.handleLogout();
        }, 100);
    }

    return <>{children}</>; // Render children directly, no need for a new AuthProvider
}
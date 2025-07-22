import {createContext, useCallback, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { decryptData } from "../store/utils_encryption";


const AuthContext = createContext();

const AuthProvider =  (props) => {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();


    const handleLogin = useCallback(() => {
        const storage = sessionStorage.getItem("food_recipe");

        if (storage) {
            const decrypted = decryptData(storage)
            const {data} = JSON.parse(decrypted);
            console.log({data});
            
            setAuthenticatedUser(data);
            const origin = location.state?.from?.pathname || "/dashboard";
            navigate(origin)
        }
    }, [navigate, location])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleLogout = () => {
        navigate("/");

        setTimeout(() => {
            setAuthenticatedUser(null);
            sessionStorage.removeItem("food_recipe");
        }, 100)
    }

    const values = useMemo(() => ({
        authenticatedUser,
        handleLogout,
        handleLogin
    }),[authenticatedUser,handleLogout,handleLogin]);


    return (
        <AuthContext.Provider value={values} >
            {props.children}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthProvider}
import { createContext, useState, useContext, useEffect } from "react";
import api from "@/utils/api";

// create the context
const AuthContext = createContext();

/**
 * AuthProvider wraps the app with authentication context
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components to be wrapped by this provider
 * @returns {JSX.Element}
 */
export function AuthProvider({ children }) {

    //true if is authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //data about user
    const [user, setUser] = useState(null);
    const [pkey, setPkey] = useState(null);

    const login = (userData, privateKey) => {
        setUser(userData);
        setIsAuthenticated(true);
        setPkey(privateKey);

        if (localStorage.getItem("user") == null) {
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("pkey", JSON.stringify(privateKey));
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("pkey");
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("pkey", JSON.stringify(privateKey));
        }
    };

    const logout = async () => {
        const logouterString = localStorage.getItem("user");
        const logouter = JSON.parse(logouterString);

        const log = logouter.cf
        try {
            await api.post("/logout", { log });
            setUser(null);
            setIsAuthenticated(false);
            setPkey(null);
            localStorage.removeItem("user");
            localStorage.removeItem("pkey");
        } catch (err) {
            console.error("Logout fallito", err);
        }
    };

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedPkey = localStorage.removeItem("pkey");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
            setPkey(savedPkey);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, pkey }}>
            {children}
        </AuthContext.Provider>
    );
}

/** Hook for use the context
 * 
 * @returns {Object} The value provided by AuthContext.Provider
*/
export function useAuth() {
    return useContext(AuthContext);
}

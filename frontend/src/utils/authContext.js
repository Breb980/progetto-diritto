import { createContext, useState, useContext, useEffect } from "react";

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
    
    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);

        if (localStorage.getItem("user") == null) {
            localStorage.setItem("user", JSON.stringify(userData));
        } else {
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(userData));
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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

import { createContext, useState, useContext, useEffect } from "react";

// create the context
const AuthContext = createContext();

// Provider that wrap the app
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

// Hook for use the context
export function useAuth() {
  return useContext(AuthContext);
}

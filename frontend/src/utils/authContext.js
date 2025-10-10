import { createContext, useState, useContext } from "react";

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
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

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

import React, { useContext, createContext, useState, useEffect, useCallback } from "react";
import { useNotification } from "./NotificationContext";
import Cookies from "js-cookie";

export const AuthUserContext = createContext({
    authUser: null,
    saveAuthUser: () => { }
});

export const AuthUserProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const saveAuthUser = useCallback((user) => {
        setAuthUser(user)
    }, []);

    return (
        <AuthUserContext.Provider value={{ authUser, saveAuthUser }}>
            {children}
        </AuthUserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = useContext(AuthUserContext);
    if (!context) {
        throw new Error("useUserContext must be used within an AuthUserProvider");
    }
    return context;
}
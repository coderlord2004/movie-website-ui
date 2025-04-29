import React, { useContext, createContext, useState, useEffect } from "react";

export const AuthUserContext = createContext({
    authUser: null,
    isLogin: false,
    saveAuthUser: () => { },
    setLogin: () => { }
});
export const AuthUserProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const saveAuthUser = (userData) => {
        setAuthUser(userData);
    };

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
import React, { useContext, createContext, useState, useEffect } from "react";
import { useNotification } from "./NotificationContext";
import Cookies from "js-cookie";

export const AuthUserContext = createContext({
    authUser: null,
    saveAuthUser: () => { },
    updateAvatarPath: () => { }
});
export const AuthUserProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const { showNotification } = useNotification();
    const saveAuthUser = (userData) => {
        setAuthUser(userData);
    };
    console.log(authUser);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_WEBSITE_BASE_URL}/users/my-info`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await res.json();
                Cookies.set('auth_user', JSON.stringify(data.results), { expires: 1 });
                saveAuthUser(data.results);
            } catch (err) {
                showNotification('error', err.message);
            }
        };
        fetchUserInfo();
    }, [showNotification]);

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
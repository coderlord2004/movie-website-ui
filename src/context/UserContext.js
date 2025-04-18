import React, { useContext, createContext } from "react";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [jwtToken, setJwtToken] = React.useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    };

    const updateJwtToken = (token) => {
        setJwtToken(token);
    };

    return (
        <UserContext.Provider value={{ user, jwtToken, updateUser, updateJwtToken }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => useContext(UserContext);
import { jwtDecode } from 'jwt-decode';

const decodeJWT = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

export default decodeJWT;

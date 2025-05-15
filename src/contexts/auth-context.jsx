import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../lib/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = async (data) => {
        try {
            const response = await API.login(data);

            if (response.data) {
                setUser(response.data.user);
                API.setAccessToken(response.data.access_token);
                return true;
            }

            throw new Error(response.data.message);
        } catch (err) {
            console.error(err);
        }

        return false
    };

    const logout = () => {
        setUser(null);
        API.setAccessToken(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
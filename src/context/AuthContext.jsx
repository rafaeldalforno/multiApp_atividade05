/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [token, setToken] = useState(null);
	const navigate = useNavigate();

	const login = (username, password) => {
		if (username === "admin" && password === "123") {
			const token = "tokenProvisorio-usuarioAutenticado"; // token gerado no backend
			localStorage.setItem("token", token);
			setToken(token);
			setAuthenticated(true);
			navigate("/home");
		} else {
			throw new Error("Login failed");
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
		setAuthenticated(false);
		navigate("/");
	};

	const values = { authenticated, token, login, logout };

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	return useContext(AuthContext);
}

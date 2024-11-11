/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

import "./styles/global.css";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { QRCodeGenerator } from "./components/QRCodeGenarator";
import { IPAddressFinder } from "./components/IPAddressFinder";
import { MovieSearchEngine } from "./components/MovieSearchEngine";
import { TodoApp } from "./components/TodoApp";
import { QuizApp } from "./components/QuizApp";
import { LanguageTranslator } from "./components/LanguageTranslator";
import { useAuth } from "../src/context/AuthContext";

export const ProtectedRoute = ({ children }) => {
	const { authenticated } = useAuth();

	if (!authenticated) {
		return <Navigate to="/" />;
	}

	return children;
};

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route
					path="/home"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				>
					<Route path="qr-code-generator" element={<QRCodeGenerator />} />
					<Route path="ip-address-finder" element={<IPAddressFinder />} />
					<Route path="movie-search-engine" element={<MovieSearchEngine />} />
					<Route path="todo-app" element={<TodoApp />} />
					<Route path="quiz-app" element={<QuizApp />} />
					<Route path="language-translator" element={<LanguageTranslator />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;

import { useState } from "react";

import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";

const LoginContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #f0f0f0;
`;

const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	background: var(--white);
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
	margin-bottom: 10px;
	padding: 10px;
	width: 200px;
`;

export const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			login(username, password);
		} catch (error) {
			alert("Invalid credentials");
			console.log(username);
			console.log(password);
		}
	};

	return (
		<LoginContainer>
			<LoginForm onSubmit={handleSubmit}>
				<h2 className="titleOne">Login</h2>
				<Input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				/>
				<Input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button type="submit">Login</button>
			</LoginForm>
		</LoginContainer>
	);
};

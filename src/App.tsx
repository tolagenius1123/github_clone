import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./index.css";

function App() {
	const [username, setUsername] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		setIsLoading(true);
		localStorage.setItem("loginEmail", JSON.stringify(username));

		setTimeout(() => {
			setUsername("");
			setIsLoading(false);
			navigate("/home");
		}, 2000);
	};
	return (
		<>
			<Routes>
				<Route
					path="/login"
					element={
						<Login
							username={username}
							setUsername={setUsername}
							handleSubmit={handleSubmit}
							isLoading={isLoading}
						/>
					}
				/>
				<Route path="/home" element={<Home />} />
				<Route path="/*" element={<Navigate to="/login" />} />
			</Routes>
		</>
	);
}

export default App;

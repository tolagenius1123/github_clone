import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./index.css";
import { getAllRepos } from "./redux/features/repoSlice";
import { getProfileData } from "./redux/features/profileSlice";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

function App() {
	const [username, setUsername] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		setIsLoading(true);
		localStorage.setItem("loginEmail", JSON.stringify(username));

		dispatch(getAllRepos(username));
		dispatch(getProfileData(username));

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
					path="/"
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
				{/* <Route path="/" element={<Navigate to="/login" />} /> */}
			</Routes>
		</>
	);
}

export default App;

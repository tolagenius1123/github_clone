import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./features/profileSlice";
import reposReducer from "./features/repoSlice";

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		repos: reposReducer,
	},
});

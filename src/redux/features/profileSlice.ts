import { createSlice } from "@reduxjs/toolkit";

type profileTypes = {
	profile: {
		name: string;
		bio: string;
		company: string;
		address: string;
		website: string;
	};
};

const initialState: profileTypes = {
	profile: localStorage.getItem("profile")
		? JSON.parse(localStorage.getItem("profile") || "{}")
		: {
				name: "Omotola Jinadu",
				bio: "Sofware Engineer",
				company: "Semicolon Africa",
				address: "Akoka, Lagos.",
				website: "https://tolareactprofile.netlify.app/",
		  },
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		updateProfile: (state, action) => {
			state.profile = action.payload;
			localStorage.setItem("profile", JSON.stringify(state.profile));
		},
	},
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;

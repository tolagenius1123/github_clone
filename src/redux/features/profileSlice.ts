import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type profileTypes = {
	profile: {
		avatar_url: string;
		name: string;
		login: string;
		bio: string;
		followers: number;
		following: number;
		company: string;
		location: string;
		blog: string;
		public_repos: number;
	};
	status: string;
	error: any;
};

const initialState: profileTypes = {
	profile: {
		avatar_url: "",
		name: "",
		login: "",
		bio: "",
		followers: 0,
		following: 0,
		company: "",
		location: "",
		blog: "",
		public_repos: 0,
	},
	status: "",
	error: "",
	// profile: localStorage.getItem("profile")
	// 	? JSON.parse(localStorage.getItem("profile") || "{}")
	// 	: {
	// 			avatar_url: "",
	// 			name: "",
	// 			login: "",
	// 			bio: "",
	// 			followers: 0,
	// 			following: 0,
	// 			company: "",
	// 			location: "",
	// 			blog: "",
	// 			public_repos: 0,
	// 	  },
	// status: "",
	// error: "",
};

export const getProfileData = createAsyncThunk(
	"profile/getProfileData",
	async (username: string) => {
		const response = await axios.get(
			`https://api.github.com/users/${username}`
		);

		console.log(response.data);
		return response.data;
	}
);

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		updateProfile: (state, action) => {
			state.profile = action.payload;
			// localStorage.setItem("profile", JSON.stringify(state.profile));
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProfileData.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(getProfileData.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
		builder.addCase(getProfileData.rejected, (state, action) => {
			state.error = action.error;
			state.status = "failed";
		});
	},
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;

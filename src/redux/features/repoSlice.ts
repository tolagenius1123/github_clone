import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface initialStateTypes {
	repos: any[];
	status: string;
	error: any;
}

const initialState: initialStateTypes = {
	repos: [],
	status: "",
	error: "",
};

export const getAllRepos = createAsyncThunk(
	"repos/getAllRepos",
	async (username: string) => {
		const response = await axios.get(
			`https://api.github.com/users/${username}/repos`
		);
		console.log(response.data);
		return response.data;
	}
);

const repoSlice = createSlice({
	name: "repos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllRepos.pending, (state) => {
			state.status = "loading";
		}),
			builder.addCase(getAllRepos.fulfilled, (state, action) => {
				state.status = "success";
				state.repos = action.payload;
			}),
			builder.addCase(getAllRepos.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error;
			});
	},
});

export default repoSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USER_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const response = await axios.get(USER_URL);
	return response.data;
});

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export const getUsers = (store) => store.users;
export const getUserById = (store, userId) => {
	userId = parseInt(userId);
	return store.users.find((user) => user.id === userId);
};
export default usersSlice.reducer;

import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
	posts: [],
	status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
};

// function to get data
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const response = await axios.get(POST_URL);
	return response.data;
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (data) => {
	try {
		const response = await axios.post(POST_URL, data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

export const updatePost = createAsyncThunk("posts/updatePost", async (data) => {
	const { id } = data;

	try {
		const response = await axios.put(`${POST_URL}/${id}`, data);
		return response.data;
	} catch (err) {
		return data;
	}
});

export const deletePost = createAsyncThunk("posts/deletePost", async (data) => {
	const { id } = data;

	try {
		const response = await axios.delete(`${POST_URL}/${id}`, data);

		if (response?.status === 200) return data;
		return `Server return --> ${response.status} : ${response.statusText}`;
	} catch (err) {
		return err.message;
	}
});

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addPost: {
			reducer: (state, action) => {
				state.posts.push(action.payload);
			},
			prepare: (title, body, userId) => {
				return {
					payload: {
						id: nanoid(),
						title,
						body,
						userId,
						date: new Date().toISOString(),
						reactions: {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							coffee: 0,
							rocket: 0,
						},
					},
				};
			},
		},
		addReaction: (state, action) => {
			const { postId, reaction } = action.payload;
			const existingPost = state.posts.find((post) => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction] += 1;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeeded";
				let min = 1;
				const loadedPosts = action.payload.map((post) => {
					post.date = sub(new Date(), {
						minutes: min++,
					}).toISOString();

					post.reactions = {
						thumbsUp: 0,
						wow: 0,
						heart: 0,
						coffee: 0,
						rocket: 0,
					};

					return post;
				});

				state.posts = state.posts.concat(loadedPosts);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				action.payload.userId = Number(action.payload.userId);
				action.payload.date = new Date().toISOString();
				action.payload.reactions = {
					thumbsUp: 0,
					wow: 0,
					heart: 0,
					coffee: 0,
					rocket: 0,
				};

				state.posts.push(action.payload);
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log("Could not complete update");
					console.log(action.payload);
					return;
				}

				const { id } = action.payload;
				action.payload.date = new Date().toISOString();
				const posts = state.posts.filter((post) => post.id != id);
				state.posts = [...posts, action.payload];
			})

			.addCase(deletePost.fulfilled, (state, action) => {
				if (!action.payload.id) {
					console.log(`Delete operation could not complete`);
					console.log(action.payload);
					return;
				}

				const { id } = action.payload;

				const posts = state.posts.find((post) => post.id !== id);
				state.posts = posts;
			});
	},
});

export const getPosts = (store) => store.posts.posts;
export const getPostsStatus = (store) => store.posts.status;
export const getPostsError = (store) => store.posts.error;

export const getPostById = (store, postId) => {
	postId = parseInt(postId, 10);
	return store.posts.posts.find((post) => post.id === postId);
};
export const { addPost, addReaction } = postSlice.actions;

export default postSlice.reducer;

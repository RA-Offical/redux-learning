import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewPost } from "./postSlice";
import { getUsers } from "../users/userSlice";

const AddPostForm = () => {
	// other objects and user data
	const dispatch = useDispatch();
	const users = useSelector(getUsers);

	// temporary state tracker
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState("");
	const [addRequestStatus, setAddRequestStatus] = useState("idle");

	// change handlers for input and select
	const onTitleChange = (e) => setTitle(e.target.value);
	const onContentChange = (e) => setContent(e.target.value);
	const onUserIdChange = (e) => setUserId(parseInt(e.target.value, 10));

	const canSave =
		[title, content, userId].every(Boolean) && addRequestStatus === "idle";

	// submit click
	const onAddPostClick = (e) => {
		e.preventDefault();

		if (!canSave) return;

		try {
			setAddRequestStatus("pending");
			dispatch(addNewPost({ title, body: content, userId })).unwrap();
			setTitle("");
			setContent("");
			setUserId("");
		} catch (error) {
			console.log(`Failed to save post ${error}`);
		} finally {
			setAddRequestStatus("idle");
		}
	};

	// can save post

	return (
		<section>
			<h2>Add New Post</h2>

			<form onSubmit={onAddPostClick}>
				<label htmlFor="post-title">Title</label>
				<input
					id="post-title"
					type="text"
					name="postTitle"
					placeholder="Enter title"
					value={title}
					onChange={onTitleChange}
				/>

				<label htmlFor="post-content">Content</label>
				<textarea
					id="post-content"
					cols="10"
					rows="4"
					type="textarea"
					name="postContent"
					placeholder="This keyword is very important to understand in javascript..."
					value={content}
					onChange={onContentChange}
				></textarea>
				<label htmlFor="author">Author</label>
				<select
					name="author"
					id="author"
					onChange={onUserIdChange}
					value={userId}
				>
					<option value={""}></option>
					{users.map((user) => {
						return (
							<option key={user.id} value={user.id}>
								{user.name}
							</option>
						);
					})}
				</select>

				<button disabled={!canSave}>Add Post</button>
			</form>
		</section>
	);
};

export default AddPostForm;

import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "./users/userSlice";
import { getPosts } from "./posts/postSlice";

const UserPage = () => {
	let { userId } = useParams();

	userId = parseInt(userId, 10);
	const user = useSelector((store) => getUserById(store, userId));

	const allPosts = useSelector(getPosts);

	if (!user) {
		return (
			<section>
				<p>Not found</p>
			</section>
		);
	}

	const userPosts = allPosts.filter((post) => post.userId === userId);

	return (
		<section>
			<h2>{user.name}</h2>
			<ol>
				{userPosts.map((post) => {
					return (
						<li key={post.id}>
							<Link to={`/post/${post.id}`}>{post.title}</Link>
						</li>
					);
				})}
			</ol>
		</section>
	);
};

export default UserPage;

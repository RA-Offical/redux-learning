import { useSelector } from "react-redux";
import { getPosts, getPostsError, getPostsStatus } from "./postSlice";

import PostExcerpt from "./PostExcerpt";

const PostList = () => {
	const posts = useSelector(getPosts);
	const postsStatus = useSelector(getPostsStatus);
	const postsError = useSelector(getPostsError);

	// making posts in ascening order
	const orderedPosts = posts
		.slice()
		.sort((a, b) => b.date.localeCompare(a.date));

	// rendered content
	let content = "";

	if (postsStatus === "loading") {
		content = <p>Loading ...</p>;
	} else if (postsStatus === "succeeded") {
		content = orderedPosts.map((post) => {
			return <PostExcerpt key={post.id} post={post} />;
		});
	} else {
		content = <p>{postsError}</p>;
	}

	return (
		<section>
			<h2>Posts</h2>
			{content}
		</section>
	);
};

export default PostList;

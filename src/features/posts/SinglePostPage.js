import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { useSelector } from "react-redux";
import { getPostById } from "./postSlice";
import { Link, useParams } from "react-router-dom";

const SinglePostPage = () => {
	const { postId } = useParams();

	const post = useSelector((store) => getPostById(store, postId));

	if (!post) {
		return (
			<section>
				<p>Post not found</p>
			</section>
		);
	}

	return (
		<article>
			<h3>{post.title}</h3>
			<p>{post.body}</p>
			<div className="postCredit">
				<Link to={`/post/edit/${postId}`}>Edit Post</Link>
				<PostAuthor userId={post.userId} />
				<TimeAgo timeStamp={post.date} />
			</div>
			<ReactionButton post={post} />
		</article>
	);
};

export default SinglePostPage;

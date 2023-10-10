import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";
import { Link } from "react-router-dom";

const PostExcerpt = ({ post }) => {
	return (
		<article>
			<h3>{post.title}</h3>
			<p>{post.body.substring(0, 100)}</p>
			<div className="postCredit">
				<Link to={`post/${post.id}`}>View Post</Link>
				<PostAuthor userId={post.userId} />
				<TimeAgo timeStamp={post.date} />
			</div>
			<ReactionButton post={post} />
		</article>
	);
};

export default PostExcerpt;

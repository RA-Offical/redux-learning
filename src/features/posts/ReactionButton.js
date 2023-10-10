import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { addReaction } from "./postSlice";

const ReactionButton = ({ post }) => {
	const dispatch = useDispatch();

	const reactionEmoji = useMemo(
		() => ({
			thumbsUp: "👍",
			wow: "😮",
			heart: "❤️",
			coffee: "☕",
			rocket: "🚀",
		}),
		[]
	);

	const onEmojiButtonClick = (name) => {
		dispatch(addReaction({ postId: post.id, reaction: name }));
	};

	const reactionButtons = Object.entries(reactionEmoji).map(
		([name, emoji]) => {
			return (
				<button
					key={name}
					type="button"
					className="reactionButton"
					onClick={() => onEmojiButtonClick(name)}
				>
					{emoji} {post.reactions[name]}
				</button>
			);
		}
	);

	return <div>{reactionButtons}</div>;
};

export default ReactionButton;

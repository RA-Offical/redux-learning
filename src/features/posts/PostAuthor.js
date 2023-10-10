import { useSelector } from "react-redux";
import { getUsers } from "../users/userSlice";

const PostAuthor = ({ userId }) => {
	const users = useSelector(getUsers);

	const user = users.find((user) => user.id === userId);

	return <h3>{user ? user.name : "Unknown Author"}</h3>;
};

export default PostAuthor;

import { useSelector } from "react-redux";
import { getUsers } from "./userSlice";
import { Link } from "react-router-dom";

const UserList = () => {
	const users = useSelector(getUsers);

	return (
		<div>
			<h2>Users</h2>
			<ul>
				{users.map((user) => {
					return (
						<li key={user.id}>
							<Link to={`/user/${user.id}`}>{user.name}</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default UserList;

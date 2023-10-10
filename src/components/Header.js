import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header
			style={{
				background: "purple",
				color: "white",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<h1>Redux Blog</h1>
			<nav>
				<ul style={{ display: "flex", listStyle: "none", gap: "2rem" }}>
					<li>
						<Link style={{ color: "inherit" }} to="/">
							Home
						</Link>
					</li>
					<li>
						<Link style={{ color: "inherit" }} to="post">
							Add Post
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;

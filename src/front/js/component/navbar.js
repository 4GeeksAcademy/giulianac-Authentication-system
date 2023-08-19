import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const location = useLocation();
	const navigate = useNavigate();

	const handleLogout = () => {
		actions.logout();
		navigate("/");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0">Home</span>
				</Link>
				<div className="ml-auto">
					{location.pathname === "/" && !store.viewLogged && (
						<Link to="/login">
							<button className="btn btn-success">Login</button>
						</Link>
					)}
					{location.pathname === "/login" && (
						<Link to="/signup">
							<button className="btn btn-primary">Sign Up</button>
						</Link>
					)}
					{location.pathname === "/signup" && (
						<Link to="/login">
							<button className="btn btn-success">Login</button>
						</Link>
					)}
					{location.pathname === "/private" && store.token && (
						<button className="btn btn-danger" onClick={handleLogout}>Logout</button>
					)}
				</div>
			</div>
		</nav>
	);
};
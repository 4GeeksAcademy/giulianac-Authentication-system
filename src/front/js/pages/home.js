import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center text-light mt-5">
			<h1>You must authenticate to continue</h1>
			<p className="mt-5 mb-2">Not a member yet? Click on the button below and sign up first!</p>
			<div>
				<Link to="/signup">
					<button className="btn btn-primary mb-5">Sign Up</button>
				</Link>
			</div>
		</div>
	);
};

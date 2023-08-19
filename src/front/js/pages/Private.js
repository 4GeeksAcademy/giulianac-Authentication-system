import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Private = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.private();
	}, [])

	if (store.token) {
		return (
			<div className="container text-center pt-5">
				<h1>Welcome {store.loggedUser}</h1>
				<p>Congratulations you have reached the promised land!</p>
			</div>);
	} else {
		return (
			<div className="container text-center pt-5">
				<h1>Access Restricted</h1>
				<p>Oops! Looks like you showed the wrong keyword to the bouncer and he kicked you out!
					Good Luck next time...
				</p>
			</div>);
	}
};

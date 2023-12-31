const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			viewSignUp: false,
			viewLogged: false,

			email: null,
			password: null,
			token: null,

			message: null,
			loggedUser: "",
		},
		actions: {

			login: async (email, password) => {
				try {
					const options = {
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					};

					const resp = await fetch(process.env.BACKEND_URL + "/login", options);
					const data = await resp.json();
					console.log(data);

					if (resp.status == 200) {
						localStorage.setItem("token", data.access_token)
						setStore({ viewLogged: true })
					} else alert(data.message);

				} catch (err) {
					console.error("An error has occurred during login", err);
				}
			},

			signUp: async (email, password) => {
				if (!email || !password) {
					alert("Please enter both email and password");
				}
				try {
					const options = {
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"email": email,
							"password": password
						})
					};

					const resp = await fetch(process.env.BACKEND_URL + "/signup", options);
					const data = await resp.json();
					console.log(data);

					if (resp.status == 200) {
						alert("User registered successfully")
						setStore({ viewSignUp: true })
					} else {
						alert(data.message);
					}

				} catch (err) {
					console.error("An error has occurred during signup", err);
				}
			},

			private: async () => {
				const token = localStorage.getItem("token");
				setStore({ token: token });

				try {
					const options = {
						method: 'GET',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + token
						}
					};

					const resp = await fetch(process.env.BACKEND_URL + "/private", options);
					const data = await resp.json();
					setStore({ loggedUser: data.User });
					console.log(store.loggedUser);
				}

				catch (err) {
					console.error("An error has occurred", err);
				}
			},

			logout: () => {
				localStorage.clear();
				setStore({ viewLogged: false })
			},

			toggleSignUp: (value) => {
				setStore({ viewSignUp: value })
			},
		}
	};
};

export default getState;

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			viewSignUp: false,
			viewLogged: false,

			email: null,
			password: null,
			token: null,

			message: null,
			loggedUser: {},
		},
		actions: {

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

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
						sessionStorage.setItem("token", data.access_token)
						setStore({ viewLogged: true })
						alert("User logged in");
					} else alert(data.message);

				} catch (err) {
					console.error("An error has occurred during login", err);
				}
			},

			signUp: async (email, password) => {
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

					if (resp.status == 200) {
						setStore({ viewSignUp: true })
						alert("User registered successfully");
					} else alert(data.message);

				} catch (err) {
					console.error("An error has occurred", err);
				}
			},

			private: async () => {
				const token = sessionStorage.getItem("token")
				const store = getStore();
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

					if (resp.status == 200) {
						setStore({ loggedUser: data });
						console.log(store.loggedUser);
					}
				}

				catch (err) {
					console.error("An error has occurred", err);
				}
			},

			logout: () => {
				const store = getStore();
				sessionStorage.removeItem(store.token);
			},
		}
	};
};

export default getState;

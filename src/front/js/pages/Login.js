import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await actions.login(email, password);

            if (store.viewLogged) {
                navigate("/private");
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
        }

        e.target.reset();
    };

    return (
        <div className="container my-3 mt-5">
            <form className="m-auto" onSubmit={handleSubmit}>
                <h1 className="form-title login text-center mb-4">Log In</h1>
                <div className="form-group mb-3">
                    <label htmlFor="inputEmail">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="inputPassword">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="row text-center">
                    <button type="submit" className="btn btn-success w-50 mx-auto mt-4">Login</button>
                    <Link to="/signup">
                        <small>or sign up instead</small>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login;
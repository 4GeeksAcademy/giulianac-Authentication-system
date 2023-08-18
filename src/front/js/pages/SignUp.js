import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        actions.signUp(email, password)
        e.target.reset();
    };

    store.viewSignUp ? navigate("/login") : null;

    return (
        <div className="container my-3">
            <form className="p-3" onSubmit={handleSubmit}>
                <h1 className="text-center mb-4">Create New Account</h1>
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
                    <button type="submit" className="btn btn-success w-50 mx-auto mt-4">Submit</button>
                    <Link to="/login">
                        <small>or log in instead</small>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default SignUp;
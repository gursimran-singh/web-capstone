import React, { useState } from "react";
import PropTypes from 'prop-types';
import baseURL from "../../slices/authRequest.js";
import "./login.css";


async function loginUser(credentials) {
    return baseURL.post('/user/login', credentials)
        .then(response => response.data)
        .catch(e => e);
}

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState("");
    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({
            email,
            password
        });
debugger
        if (response.isAxiosError) {
            console.log(response);
            setMessage(response.message);

        } else {
            console.log(response);
            setToken(response);
            window.location.reload();
        }
       
        // const interval = setInterval(() => {
        //     //setGoBack("goback");
        // }, 2000);
        // return () => clearInterval(interval);
    }

    return (
        <div className="app">
            <div className="title">Admin- Sign In</div>
            {
                message && (
                    <div className="form-group">
                        <div className="error">
                            {message}
                        </div>
                    </div>
                )
            }
            <div className="form">

                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Email </label>
                        <input type="text" name="uname" required onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="button-container">
                        <input type="submit" />
                    </div>
                </form>

            </div>
        </div>

    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};

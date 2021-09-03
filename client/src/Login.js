import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "./utils/AuthContext";
import axios from "axios";

export default function Home() {

    const [switcher, setSwitcher] = useState("Login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    const changePage = () => {
        history.push("/home");
    };

    const changeSwitch = (e) => {
        e.preventDefault();

        if (switcher === "Login") {
            setSwitcher("Sign Up");
            console.log(switcher);
        } else {
            setSwitcher("Login");
            console.log(switcher);
        }
    };

    async function userLogin(e) {
        e.preventDefault();

        try {
            // Grab user data from form
            const loginData = { username, password };

            // API calls to log user in
            await axios.post("/user/login", loginData);
            await getLoggedIn();

            // Reset State
            setUsername("");
            setPassword("");

            // Send to protected home page
            changePage("/home");
        } catch (err) {
            console.error(err);
            alert(err.request.response);
        }
    };

    async function userSignUp(e) {
        e.preventDefault();

        try {
            // Grab user data from form
            const signUpData = { email, username, password };

            // API calls to log user in
            await axios.post("/user/signup", signUpData);
            await getLoggedIn();

            // Reset State
            setEmail("");
            setUsername("");
            setPassword("");

            // Send to protected home page
            changePage("/home");
        } catch (err) {
            console.error(err);
            alert("something went wrong");
        }
    };

    return (
        <div>
            <div className="header-container">
                <h1 className="header">Budget Tracker</h1>
                <div className="login-switcher">
                    <button className={switcher === "Login" ? "button-switcher-selected" : "button-switcher"} onClick={(e) => changeSwitch(e)}>Login</button>
                    <button className={switcher === "Sign Up" ? "button-switcher-selected" : "button-switcher"} onClick={(e) => changeSwitch(e)}>Sign Up</button>
                </div>
            </div>
            <div>
            </div>
            {switcher === "Login" && (
                <div className="auth-container">
                    <h1 className="auth-header">Login</h1>
                    <form className="auth-form" onSubmit={(e) => userLogin(e)}>
                        <label for="username">Username: </label>
                        <input
                            type="text"
                            id="username"
                            className="text-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br />
                        <label for="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            className="text-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="auth-button">Login</button>
                    </form>
                </div>
            )}
            {switcher === "Sign Up" && (
                <div className="auth-container">
                    <h1 className="auth-header">Sign Up</h1>
                    <form className="auth-form" onSubmit={(e) => userSignUp(e)}>
                        <label for="email">Email: </label>
                        <input
                            type="text"
                            id="email"
                            className="text-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <label for="username">Username: </label>
                        <input
                            type="text"
                            id="username"
                            className="text-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br />
                        <label for="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            className="text-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="auth-button">Sign Up</button>
                    </form>
                </div>
            )}
        </div>
    )
}

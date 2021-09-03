import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from './utils/AuthContext';
import axios from "axios";

export default function Home() {

    const history = useHistory();
    const { getLoggedIn } = useContext(AuthContext);

    const [switcher, setSwitcher] = useState("Login");

    const changeSwitch = (e) => {
        e.preventDefault();

        if (switcher === "Login") {
            setSwitcher("Sign Up");
            console.log(switcher);
        } else {
            setSwitcher("Login");
            console.log(switcher);
        }
    }

    async function handleClick(e) {
        e.preventDefault();

        try {
            await axios.get("/user/logout");
            await getLoggedIn();
            history.push("/");
        } catch (err) {
            console.error(err);
            alert(err.request.response)
        }
    }

    return (
        <div>
            <div className="header-container">
                <h1 className="header">Budget Tracker</h1>
                <div className="login-switcher">
                    <button className="button-switcher" onClick={(e) => handleClick(e)}>Logout</button>
                </div>
            </div>
            <div>
                <h1 className="header">Home</h1>
            </div>
        </div>
    )
}

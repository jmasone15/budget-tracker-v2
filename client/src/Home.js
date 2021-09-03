import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from './utils/AuthContext';
import UserContext from './utils/UserContext';
import axios from "axios";

export default function Home() {

    const { username } = useContext(UserContext);
    const history = useHistory();
    const { getLoggedIn } = useContext(AuthContext);

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

    async function getGoals() {
        if (username !== "") {
            const goals = await axios.get(`/budget/${username}`);
            console.log(goals.data);
        }
    }

    useEffect(() => {
        getGoals();
    }, [username]);

    return (
        <div>
            <div className="header-container">
                <h1 className="header">Budget Tracker</h1>
                <div className="login-switcher">
                    <button className="button-switcher" onClick={(e) => handleClick(e)}>Logout</button>
                </div>
            </div>
            <div>
                <h1 className="header">Welcome {username}</h1>
            </div>
        </div>
    )
}

import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const UserContext = createContext();

function UserContextProvider(props) {
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const { loggedIn } = useContext(AuthContext);

    async function getUserId() {
        if (loggedIn === true) {
            const token = document.cookie;
            const payload = JSON.parse(window.atob(token.split('.')[1]));
            const id = payload.user;
            setUserId(id);
        }
    }
    async function getUsername() {
        if (userId !== "") {
            const userData = await axios.get(`/user/profile/${userId}`);
            setUsername(userData.data.username);
            setEmail(userData.data.email);
        }
    }

    useEffect(() => {
        getUserId();
        getUsername();
    });

    return (
        <UserContext.Provider value={{ userId, getUserId, username, email, getUsername }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;
export { UserContextProvider };
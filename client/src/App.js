import React from "react";
import Router from "./Router";
import axios from "axios";
import "./style.css";
import { AuthContextProvider } from "./utils/AuthContext";
import { UserContextProvider } from "./utils/UserContext";
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;

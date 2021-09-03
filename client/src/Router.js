import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import AuthContext from "./utils/AuthContext";
import Login from "./Login";
import Home from "./Home";
// import Profile from "./pages/Profile";
// import Loading from "./pages/Loading";
import NotFound from "./NotFound";

export default function Router() {

    const { loggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            {loggedIn === false && (
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/home">
                        <Redirect to="/" />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            )}
            {loggedIn === true && (
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route exact path="/home">
                        <Home />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            )}
        </BrowserRouter>
    )
}

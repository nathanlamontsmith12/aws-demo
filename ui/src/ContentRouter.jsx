import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AppContext } from "./App.jsx";
import { PageNotFound } from "./pages/404/index.jsx";
import { Landing } from "./pages/Landing/index.jsx";
import { Login } from "./pages/Login/index.jsx";
import { Logout } from "./pages/Logout/index.jsx";
import { Register } from "./pages/Register/index.jsx";
import { TimelineContainer } from "./pages/Timeline/index.jsx";
import { useSession } from "./hooks/useSession.jsx";

const Authenticate = ({ element }) => {
    const [ session ] = useSession();
    const { user } = session;
    const navigate = useNavigate();
    const { message } = useContext(AppContext)
    useEffect(() => {
        if (!user) {
            navigate("/login");
            message({
                type: "warning",
                content: "You need to log in"
            });
        }
    }, [user]);
    return !user ? null : element;
};

const RedirectIfLoggedIn = ({ element }) => {
    const [ session ] = useSession();
    const { user } = session;
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/");
        } else {
            navigate("/login")
        }
    }, [user]);
    return user ? null : element;
};

export const ContentRouter = () => <Routes>
    <Route
        path="/login"
        element={ <RedirectIfLoggedIn element={<Login />} /> }
    />
    <Route
        path="/register"
        element={ <RedirectIfLoggedIn element={<Register />} /> }
    />
    <Route
        path="/"
        element={ <Authenticate element={<Landing />}/> }
    />
    <Route
        path="/logout"
        element={ <Logout /> }
    />
    <Route
        path="/timeline"
        element={ <TimelineContainer /> }
    />
    <Route
        path="*"
        element={ <PageNotFound /> }
    />
</Routes>;
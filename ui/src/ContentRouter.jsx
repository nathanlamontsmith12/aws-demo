import React from "react";
import { Routes, Route } from "react-router-dom";
import { PageNotFound } from "./pages/404/index.jsx";
import { Landing } from "./pages/Landing/index.jsx";

export const ContentRouter = () => <Routes>
    <Route
        path="/"
        element={<Landing />}
    />
    <Route
        path="*"
        element={ <PageNotFound /> }
    />
</Routes>;
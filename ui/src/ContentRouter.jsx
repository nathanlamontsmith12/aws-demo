import React from "react";
import { Routes, Route } from "react-router-dom";
import { PageNotFound } from "./pages/404/index.jsx";
import { Documents } from "./pages/Documents/index.jsx";

export const ContentRouter = () => <Routes>
    <Route
        path="/"
        element={<Documents />}
    />
    <Route
        path="*"
        element={ <PageNotFound /> }
    />
</Routes>;
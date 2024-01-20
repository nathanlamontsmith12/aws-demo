import React from "react";
import Layout from "antd/es/layout/layout.js";
import AppContext from "./context/index.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentRouter } from "./ContentRouter.jsx";
import { NavBar } from "./components/Navbar/index.jsx";
import { Logo } from "./components/Logo/index.jsx";

const { Content } = Layout;

const CoreLayout = () => {
    return <>
        <Logo />
        <Layout style={{ minHeight: "100vh" }}>
            <NavBar />
            <Content style={{ 
                padding: "20px", 
                margin: "40px" 
            }}>
                <ContentRouter />
            </Content>
        </Layout>
    </>
};

export const App = () => {
    return (
        <BrowserRouter> 
            <AppContext>
                <Routes>
                    <Route
                        path="*"
                        element={<CoreLayout />}
                    />
                </Routes>
            </AppContext>
        </BrowserRouter>
    );
};
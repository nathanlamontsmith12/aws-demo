import React, { useEffect } from "react";
import Layout from "antd/es/layout/layout.js";
import AppContext from "./context/index.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentRouter } from "./ContentRouter.jsx";
import { NavBar } from "./components/Navbar/index.jsx";
import { Sidebar } from "./components/Sidebar/index.jsx";
import { Logo } from "./components/Logo/index.jsx";
import { useMessage } from "./hooks/useMessage.js";

const { Content } = Layout;

export const App = () => {
    const [message] = useMessage();
    useEffect(() => {
        const id = setTimeout(() => {
            clearTimeout(id);
            message("Hello!");
        }, 3000);
        return () => clearTimeout(id);
    }, []);
    return (
        <BrowserRouter> 
            <AppContext>
                <Routes>
                    <Route
                        path="*"
                        element={
                            <>
                                <Logo />
                                <Layout style={{ minHeight: "100vh" }}>
                                    <NavBar />
                                    <Layout>
                                        <Sidebar />
                                        <Content style={{ padding: "20px" }}>
                                            <ContentRouter />
                                        </Content>
                                    </Layout>
                                </Layout>
                            </>
                        }
                    />
                </Routes>
            </AppContext>
        </BrowserRouter>
    );
};
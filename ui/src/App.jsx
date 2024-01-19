import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, useResolvedPath } from "react-router-dom";
import { ContentRouter } from "./ContentRouter.jsx";
import { NavBar } from "./components/Navbar/index.jsx";
import { Sidebar } from "./components/Sidebar/index.jsx";
import Layout from "antd/es/layout/layout.js";
import { Logo } from "./components/Logo/index.jsx";
import { message as antMessage } from "antd";
import { autologin } from "./devconfig.js";
import { IS_LOCAL } from "./env.js";
import { automaticLoginData } from "./functions/formatSessionData.js";

const { Content } = Layout;
let messageOpen = false;
const defaultLogin = IS_LOCAL && autologin ? automaticLoginData() : {};

export const AppContext = createContext([]);

export const App = () => {
    const [messageApi, messageContext] = antMessage.useMessage();
    const [session, setSession] = useState(defaultLogin);
    const { user } = session;

    const message = async (options) => {
        if (!messageOpen) {
            messageOpen = true;
            await messageApi.open(options);
            messageOpen = false;
            return true;
        }
        return false;
    };

    return (
        <BrowserRouter>
            <AppContext.Provider value={{
                message,
                messageOpen,
                messageApi,
                session,
                setSession
            }}>
                { messageContext }
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
            </AppContext.Provider>
        </BrowserRouter>
    );
};
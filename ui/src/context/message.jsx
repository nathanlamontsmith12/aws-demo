import React, { createContext } from "react";
import { message as antMessage } from "antd";

let messageOpen = false;

export const ReactMessageContext = createContext();

export const Message = ({ children }) => {
    const [messageApi, messageContext] = antMessage.useMessage();

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
            <ReactMessageContext.Provider value={{
                message,
                messageOpen,
                messageApi
            }}>
                { messageContext }
                { children }
            </ReactMessageContext.Provider>
    );
};
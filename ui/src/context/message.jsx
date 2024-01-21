import React, { createContext } from "react";
import { message as antMessage } from "antd";

const activeMessages = new Map();

export const ReactMessageContext = createContext({});

export const Message = ({ children }) => {
    const [messageApi, messageContext] = antMessage.useMessage();

    const message = (options = {}) => {
        const key = Symbol();
        const { 
            destroy,
            onClose,
            ...otherOptions
        } = options;
       
        if (destroy) {
            messageApi.destroy();
        } 
    
        messageApi.open({ 
            ...otherOptions, 
            onClose: () => {
                activeMessages.delete(key);
                if (typeof onClose === "function") {
                    onClose();
                } 
            }
        });

        return key;
    };

    const messageOpen = (key) => {
        if (key !== undefined) {
            return activeMessages.has(key);
        } else {
            // return true if at least one message is open :: 
            return Array.from(activeMessages.entries()).length > 0;
        }
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
import React from "react";
import { Message } from "./message.jsx";

// Combine all contexts (with correct nesting, etc.) into one App Context :: 

const AppContext = ({ children }) => {
    return (
        <Message>
            { children }
        </Message>
    );
};

export default AppContext;
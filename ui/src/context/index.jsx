import React from "react";
import { Message } from "./message.jsx";
import { Enums } from "./enums.jsx";

// Combine all contexts (with correct nesting, etc.) into one App Context :: 

const AppContext = ({ children }) => {
    return (
        <Enums>
            <Message>
                { children }
            </Message>
        </Enums>
    );
};

export default AppContext;
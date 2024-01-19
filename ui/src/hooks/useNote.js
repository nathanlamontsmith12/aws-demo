import { useContext } from "react";
import { ReactMessageContext } from "../context/message.jsx";

export const useNote = () => {
    const {
        message,
        messageOpen,
        messageApi
    } = useContext(ReactMessageContext);

    return [ message, messageOpen, messageApi ];
};
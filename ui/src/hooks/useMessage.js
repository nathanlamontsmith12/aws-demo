import { ReactMessageContext } from "../context/message.jsx";

export const useMessage = () => {
    console.log(ReactMessageContext);
    const {
        message,
        messageOpen,
        messageApi
    } = ReactMessageContext;

    return [ message, messageOpen, messageApi ];
};
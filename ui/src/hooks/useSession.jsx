import { useContext } from "react";
import { AppContext } from "../App.jsx";

export const useSession = () => {
    const { session, setSession } = useContext(AppContext);
    return [ session, setSession ];
};
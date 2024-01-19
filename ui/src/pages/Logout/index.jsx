import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../hooks/useSession.jsx";


export const Logout = () => {
    const navigate = useNavigate();
    const [ _, setSession ] = useSession();
    useEffect(() => {
        setSession({});
        navigate("/login");
    }, []);
};
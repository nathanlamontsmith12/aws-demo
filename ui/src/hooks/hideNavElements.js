import { useLocation } from "react-router-dom";

export const hideNavElements = () => {
    const NO_NAV_PAGES = ["/login", "/register"];
    const location = useLocation();
    return NO_NAV_PAGES.includes(location.pathname);
};
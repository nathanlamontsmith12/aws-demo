import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { HEADER_HEIGHT, OPEN_SIDER_WIDTH } from "../../constants.js";
import { hideNavElements } from "../../hooks/hideNavElements.js";
const { Header } = Layout;

const MENU_STYLE = {
    width: "100%",
    height: HEADER_HEIGHT,
    position: "sticky",
    marginLeft: OPEN_SIDER_WIDTH
};

export const NavBar = () => {
    const hideNavBar = hideNavElements();
    return (
        hideNavBar
            ? null
            : <Header style={{
                width: "100%",
                paddingInline: 0
            }}>
                <Menu
                    style={MENU_STYLE}
                    mode="horizontal"
                    items={[
                        {
                            key: "cases",
                            label: <Link to={"/cases"}>Cases</Link>
                        },
                        {
                            key: "timeline",
                            label: <Link to={"/timeline"}>Timeline</Link>
                        },
                        {
                            key: "new-case",
                            label: <Link to={"/cases/new"}>New Case</Link>
                        },
                        {
                            key: "logout",
                            label: <Link to={"/logout"}>Logout</Link>
                        }
                    ]}
                />
            </Header>
    );
};
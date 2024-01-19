import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { HEADER_HEIGHT, OPEN_SIDER_WIDTH } from "../../constants.js";
const { Header } = Layout;

const MENU_STYLE = {
    width: "100%",
    height: HEADER_HEIGHT,
    position: "sticky",
    marginLeft: OPEN_SIDER_WIDTH
};

export const NavBar = () => {
    return (
        <Header style={{
            width: "100%",
            paddingInline: 0
        }}>
            <Menu
                style={MENU_STYLE}
                mode="horizontal"
                selectedKeys={["documents"]}
                items={[
                    {
                        key: "documents",
                        label: <Link to={"/"}>Documents</Link>
                    }
                ]}
            />
        </Header>
    );
};
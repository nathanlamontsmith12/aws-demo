import { Layout, Menu } from "antd";
import { HEADER_HEIGHT, OPEN_SIDER_WIDTH } from "../../constants.js";

const { Sider } = Layout;

export const Sidebar = () => {
    return (
        <Sider
            width={OPEN_SIDER_WIDTH}
        >
            <Menu
                style={{
                    position: "sticky",
                    top: HEADER_HEIGHT,
                    height: "100%"
                }}
                mode="inline"
                items={[
                    {
                        key: "menu-item-1",
                        label: "Menu Item 1"
                    },
                    {
                        key: "menu-item-2",
                        label: "Menu Item 2"
                    },
                    {
                        key: "menu-item-3",
                        label: "Menu Item 3"
                    }
                ]}
            />
        </Sider>
    );
};
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
                selectedKeys={["all-documents"]}
                mode="inline"
                items={[
                    {
                        key: "all-documents",
                        label: "All Documents"
                    }
                ]}
            />
        </Sider>
    );
};
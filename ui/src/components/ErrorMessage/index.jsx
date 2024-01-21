import React from "react";
import { Layout, Result } from "antd";

const defaultStyle = { padding: "20px", textAlign: "center", width: "100%" };
const defaultTitle = "There was an error loading data for this page.";

export const ErrorMessage = ({ title, style }) => {
    const titleToUse = title && typeof options.title === "string" ? title : defaultTitle;
    const styleToUse = style && typeof options.style === "object" ? Object.assign(defaultStyle, options.style) : defaultStyle;

    return (
        <Layout.Content style={styleToUse}>
            <Result 
                title={titleToUse}
                status={"error"}
            >
            </Result>
        </Layout.Content>
    );
};
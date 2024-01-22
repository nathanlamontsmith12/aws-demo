import { Spin } from "antd";
import React from "react";


export const PolledValue = ({ value, isLoading }) => {
    return (
        <div style={{ width: "100px"}}>
            <Spin spinning={isLoading} size="small">
                <span> { value } </span>
            </Spin>
        </div>
    );
};
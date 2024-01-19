import React from "react";
import { Spin } from "antd";

const DEFAULT_DELAY = 500;

export const Loading = ({ delay, ...otherProps }) => {
    const delayToUse = delay ? delay : DEFAULT_DELAY;
    return <Spin delay={delayToUse} {...otherProps} />;
};
import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
    const navigate = useNavigate();
    const backBtn = (
        <Button
            type="primary"
            onClick={() => navigate("/")}
        >
            Back Home
        </Button>
    );

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, this page does not exist."
            extra={ backBtn }
        />
    );
};
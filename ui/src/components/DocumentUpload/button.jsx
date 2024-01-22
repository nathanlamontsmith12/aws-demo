import React from "react";
import { Button } from "antd";


export const UploadButton = ({ openModal }) => {
    return <Button onClick={openModal}>
        Upload
    </Button>
};
import { Card, Modal } from "antd";
import React from "react";

export const EventDetail = ({ id, close }) => {
    const showModal = id && typeof id === "string";
    return <Modal
        open={showModal}
        cancelButtonProps={{style: {display: "none"}}}
        onCancel={close}
        onOk={close}
    >
        <br />
        <Card>
            EVENT DETAILS
        </Card>
    </Modal>;
};
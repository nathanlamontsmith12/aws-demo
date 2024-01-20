import React, { useState } from "react";
import { Button, Modal, Upload } from "antd";

const { Dragger } = Upload;


export const DocumentUpload = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setModalOpen(true)}>
                Upload
            </Button>
            <Modal 
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                destroyOnClose={true}
                maskClosable={false}
                closable={false}
                onOk={() => setModalOpen(false)}
            >
                <Dragger>
                    Click or Drag File Here
                </Dragger>
            </Modal>
        </>
    );
};
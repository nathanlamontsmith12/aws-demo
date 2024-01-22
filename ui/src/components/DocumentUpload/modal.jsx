import React from "react";
import { Modal } from "antd";

export const UploadModal = ({ 
    modalOpen,
    loading,
    handleUpload, 
    reset, 
    disabled, 
    children
}) => {
    return (
        <Modal
            open={modalOpen}
            loading={loading}
            onCancel={reset}
            destroyOnClose={true}
            maskClosable={false}
            closable={false}
            okButtonProps={{ disabled }}
            onOk={handleUpload}
        >
            { children }
        </Modal>
    );
};
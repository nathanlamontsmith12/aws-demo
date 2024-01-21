import React, { useState } from "react";
import { Button, Modal, Upload } from "antd";
import { useUpload } from "../../mutations/useUpload.js";

const { Dragger } = Upload;


export const DocumentUpload = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState(null);
    const [size, setSize] = useState(null);
    const [dataQuality, setDataQuality] = useState(false);
    const [file, setFile] = useState(null);

    const [uploadFile, { loading }, isValidUpload] = useUpload({
        successMessage: "File upload underway!",
        failureMessage: "File upload unsuccessful",
        errorMessage: "A technical error prevented file upload"
    });

    const reset = () => {
        setName(null);
        setSize(null);
        setDataQuality(false);
        setFile(null);
        setModalOpen(false);
    };

    return (
        <>
            <Button onClick={() => setModalOpen(true)}>
                Upload
            </Button>
            <Modal 
                open={modalOpen}
                loading={loading}
                onCancel={reset}
                destroyOnClose={true}
                maskClosable={false}
                closable={false}
                okButtonProps={{ 
                    disabled: isValidUpload({ name, size, file }) !== true 
                }}
                onOk={async () => {
                    try {
                        await uploadFile({ 
                            variables: {
                                name,
                                size,
                                dqFlag: dataQuality,
                                file: file
                            }
                        });
                    } finally {
                        reset();
                    }
                }}
            >
                <Dragger
                    name="file"
                    multiple={false}
                    customRequest={() => {
                        // To stop default xhr request  
                    }}
                    maxCount={1}
                    onChange={({ file }) => {
                        setName(file.name);
                        setSize(file.size);
                        setFile(file.originFileObj);
                    }}
                >
                    Click or Drag File Here
                </Dragger>
            </Modal>
        </>
    );
};
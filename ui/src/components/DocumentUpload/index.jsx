import React, { useState } from "react";
import { Button, Modal, Upload } from "antd";
import { useUpload } from "../../mutations/useUpload.js";
import { Spacer } from "../Spacer/index.jsx";
import { DataQualityToggle } from "./dataQualityToggle.jsx";

const { Dragger } = Upload;


export const DocumentUpload = ({ afterUpload }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState(null);
    const [type, setType] = useState(null);
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
        setType(null);
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
                                type,
                                dqFlag: dataQuality,
                                file: file
                            }
                        });
                        if (typeof afterUpload === "function") {
                            afterUpload();
                        }
                    } finally {
                        reset();
                    }
                }}
            >
                <>
                    <Dragger
                        name="file"
                        multiple={false}
                        customRequest={() => {
                            // To stop default xhr request  
                        }}
                        maxCount={1}
                        onChange={({ file }) => {
                            setName(file.name);
                            setType(file.type);
                            setSize(file.size);
                            setFile(file.originFileObj);
                        }}
                    >
                        <Spacer className="flex-center" height={"100px"}>
                            <span className="medium-text">Click or Drag File</span>
                        </Spacer>
                    </Dragger>
                    <DataQualityToggle 
                        dataQuality={dataQuality} 
                        setDataQuality={setDataQuality} 
                    />
                </>
            </Modal>
        </>
    );
};
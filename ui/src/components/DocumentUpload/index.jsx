import React, { useState } from "react";
import { useUpload } from "../../mutations/useUpload.js";
import { UploadDragger } from "./dragger.jsx";
import { UploadButton } from "./button.jsx";
import { UploadModal } from "./modal.jsx";
import { DataQualityToggle } from "./toggle.jsx";


export const DocumentUpload = ({ startOpen }) => {
    const [modalOpen, setModalOpen] = useState( startOpen ? true : false);
    const [newDocument, setNewDocument] = useState(null);
    const [dataQuality, setDataQuality] = useState(false);

    const [uploadFile, { loading }, isValidInput] = useUpload({
        successMessage: "File upload underway!",
        failureMessage: "File upload unsuccessful",
        errorMessage: "A technical error prevented file upload"
    });

    const documentToUse = newDocument ?? {};
    const {
        name,
        type,
        size,
        file
    } = documentToUse;

    const reset = () => {
        setModalOpen(false);
        setNewDocument(null);
        setDataQuality(false);
    };

    const handleUpload = async () => {
        try {
            const input = {
                name,
                type,
                size,
                file,
                dqFlag: dataQuality
            };
            await uploadFile({ 
                variables: input
            });
            if (typeof afterUpload === "function") {
                afterUpload();
            }
        } catch (err) {
            console.log(err);
        } finally {
            reset();
        }
    };

    // disable modal OK button if upload request is underway (loading is true) OR if the input is invalid :: 
    const okButtonDisabled = (loading === true) || (isValidInput({ name, size, file }) !== true )

    return (
        <>
            <UploadButton openModal={() => setModalOpen(true)} />
            <UploadModal 
                modalOpen={modalOpen}
                loading={loading}
                handleUpload={handleUpload}
                reset={reset}
                disabled={okButtonDisabled}
            >
                <UploadDragger 
                    setNewDocument={setNewDocument}
                    newDocument={newDocument}
                />
                <DataQualityToggle 
                    dataQuality={dataQuality}
                    setDataQuality={setDataQuality}
                    filetype={type}
                    disabledMessage={"Invalid File Type"}
                />
            </UploadModal>
        </>
    );
};
import React, { useEffect } from "react";
import { getDocuments } from "./queries.js";
import { DocumentUpload } from "../../components/DocumentUpload/index.jsx";
import { Spacer } from "../../components/Spacer/index.jsx";
import { ErrorMessage } from "../../components/ErrorMessage/index.jsx";
import { useActiveTracker } from "../../hooks/useActiveTracker.js";
import { DocumentsTable } from "./DocumentsTable.jsx";
import { DATA_QUALITY_POLLING_STATUS, UPLOAD_POLLING_STATUS } from "../../constants.js";

const onDocumentFetch = (documents, { start, stop }) => {
    if (documents) {
        const continuePolling = documents?.some?.(({ uploadStatus, dqStatus }) => {
            return (uploadStatus === UPLOAD_POLLING_STATUS || dqStatus === DATA_QUALITY_POLLING_STATUS) 
        });
        if (continuePolling) {
            start();
        } else {
            stop();
        }
    }
};


export const Documents = () => {
    const [documents, { error, refetch }] = useActiveTracker({
        query: getDocuments,
        transform: (data) => data?.documents,
        onFetch: onDocumentFetch,
        onError: (error, { stop }) => {
            console.log("Error Polling Documents :: ", error);
            console.log("-- Stop Polling --");
            stop();
        }
    });

    if (error) {
        return <ErrorMessage />
    }

    return (
        <div>
            <h1 className="big-text">All Documents</h1>
            <Spacer margin={{ top: "20px" }}>
                <DocumentUpload 
                    afterUpload={refetch} 
                />
            </Spacer>
            <Spacer margin={{ top: "15px" }}>
                <DocumentsTable 
                    documents={documents}
                    loading={!documents}
                    refetch={refetch}
                />
            </Spacer>
        </div>
    );
}
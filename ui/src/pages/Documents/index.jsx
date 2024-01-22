import React from "react";
import { getDocuments } from "./queries.js";
import { DocumentUpload } from "../../components/DocumentUpload/index.jsx";
import { Spacer } from "../../components/Spacer/index.jsx";
import { ErrorMessage } from "../../components/ErrorMessage/index.jsx";
import { useActiveTracker } from "../../hooks/useActiveTracker.js";
import { DocumentsTable } from "./DocumentsTable.jsx";


export const Documents = () => {
    const [documents, { error, refetch }] = useActiveTracker({
        query: getDocuments,
        transform: (data) => data?.documents
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
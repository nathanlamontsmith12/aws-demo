import React from "react";
import { useQuery } from "@apollo/client"
import { getDocuments } from "./queries.js";
import { DocumentsTable } from "./DocumentsTable.jsx";
import { DocumentUpload } from "../../components/DocumentUpload/index.jsx";
import { Spacer } from "../../components/Spacer/index.jsx";
import { ErrorMessage } from "../../components/ErrorMessage/index.jsx";


export const Documents = () => {
    const { loading, error, data, refetch } = useQuery(getDocuments)

    if (error) {
        console.log(error);
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
                    documents={data?.documents}
                    loading={loading}
                    refetch={refetch}
                />
            </Spacer>
        </div>
    );
}
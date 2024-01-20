import React from "react";
import { useQuery } from "@apollo/client"
import { getDocuments } from "./queries.js";
import { DocumentsTable } from "./DocumentsTable.jsx";
import { DocumentUpload } from "../../components/DocumentUpload/index.jsx";
import { Spacer } from "../../components/Spacer/index.jsx";


export const Documents = () => {
    const { loading, error, data } = useQuery(getDocuments)

    if (error) {
        console.log(error);
        return "Oh no! Error!!";
    }

    return (
        <div>
            <h1>All Documents</h1>
            <Spacer margin={{ top: "20px" }}>
                <DocumentUpload />
            </Spacer>
            <Spacer margin={{ top: "15px" }}>
                <DocumentsTable 
                    documents={data?.documents}
                    loading={loading}
                />
            </Spacer>
        </div>
    );
}
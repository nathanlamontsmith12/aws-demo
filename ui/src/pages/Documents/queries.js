import { gql } from "@apollo/client";

export const getDocuments = gql`
    query {
        documents {
            id
            name
            type
            size 
            uploadStatus
            dqFlag
            dqStatus
            canDownload 
            hasReport 
            reportName 
        }
    }
`;
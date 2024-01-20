import { gql } from "@apollo/client";

export const getDocuments = gql`
    query {
        documents {
            id
            name
            size 
            uploadStatus
            dqFlag
            dqStatus
        }
    }
`;
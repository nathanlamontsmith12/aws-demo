export const typeDefs = `#graphql

    scalar Date
    scalar Upload

    type Document {
        id: ID
        name: String
        type: String 
        size: Int
        uploadStatus: String
        dqFlag: Boolean 
        dqStatus: String 
        createdAt: Date 
        updatedAt: Date 
        canDownload: Boolean 
    }

    type MutationResponse {
        success: Boolean
        message: String
    }

    type Query {
        document(id: ID): Document
        documents: [Document]
    }

    type Mutation {
        createDocument(
            file: Upload!
            name: String!
            size: Int!
            type: String!
            dqFlag: Boolean
        ): MutationResponse
    }
`;
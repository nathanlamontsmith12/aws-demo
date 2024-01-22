export const typeDefs = `#graphql

    scalar Date
    scalar Upload
    scalar Enum

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

    type EnumSet {
        dataQualityFileTypes: Enum
    }

    type Query {
        document(id: ID): Document
        documents: [Document]
        enums: EnumSet
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
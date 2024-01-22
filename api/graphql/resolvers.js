// ___ SCALARS ____ 
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs"; 
import { dateScalar } from "./scalars/date.js";

// ___ TYPES ___
import { DocumentTypeResolver } from "./types/DocumentResolver.js";

// ___ QUERIES ___
import { getDocument, getDocuments } from "./queries/documents.js";

// ___ MUTATIONS ___
import { createDocument } from "./mutations/documents.js";

// ___ OTHER ___ 
import { VALID_DATA_QUALITY_FILE_TYPES } from "../constants.js";


export const resolvers = {
    Date: dateScalar,
    Upload: GraphQLUpload,
    Document: DocumentTypeResolver,
    Query: {
        document: getDocument,
        documents: getDocuments, 
        enums: () => ({ 
            dataQualityFileTypes: VALID_DATA_QUALITY_FILE_TYPES
        })
    },
    Mutation: {
        createDocument
    }
};
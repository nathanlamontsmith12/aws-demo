// ___ SCALARS ____ 
import { dateScalar } from "./scalars/date.js";

// ___ TYPES ___
import { DocumentTypeResolver } from "./types/DocumentResolver.js";

// ___ QUERIES ___
import { getDocument, getDocuments } from "./queries/documents.js";

// ___ MUTATIONS ___
import { createDocument } from "./mutations/documents.js";


export const resolvers = {
    Date: dateScalar,
    Document: DocumentTypeResolver,
    Query: {
        document: getDocument,
        documents: getDocuments 
    },
    Mutation: {
        createDocument
    }
};
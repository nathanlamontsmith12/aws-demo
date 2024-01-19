import { dateScalar } from "./scalars/date.js";
import { DocumentTypeResolver } from "./types/DocumentResolver.js";
import { createDocument } from "./mutations/documentMutations.js";
import { getDocument, getDocuments } from "./queries/documents.js";

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
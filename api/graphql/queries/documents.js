import { documentLoader } from "../batchLoaders.js";

export const getDocument = (_root, { id }) => {
    return documentLoader.load(id);
};

export const getDocuments = (_root, _variables, { db }) => {
    return db("documents")
        .orderBy("created_at", "DESC");
};
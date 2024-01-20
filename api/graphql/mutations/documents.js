import DocumentModels from "../../models/Document.js";
import { handleMutationError } from "./_mutation-helpers.js";

export const createDocument = async (_root, variables, { insertData }) => {
    try {
        await insertData(variables, DocumentModels);
        return {
            success: true,
            message: "Successfully created document"
        };
    } catch (err) {
        return handleMutationError(err, "Error when attempting to create document");
    }
};
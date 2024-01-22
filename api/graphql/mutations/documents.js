import { uploadFile } from "../../file-storage/index.js";
import DocumentModels from "../../models/Document.js";
import { handleMutationError } from "./_mutation-helpers.js";

export const createDocument = async (_root, variables, { insertData }) => {
    try {
        const {
            file, 
            name,
            type,
            size,
            dqFlag 
        } = variables;

        const insertion = await insertData({ 
            name, 
            size, 
            type,
            dqFlag 
        }, DocumentModels);

        const newDocument = insertion.rows[0];
        const documentId = newDocument.id;

        await uploadFile(documentId, file);
        
        return {
            success: true,
            message: "Upload underway"
        };
    } catch (err) {
        return handleMutationError(err, "Error when attempting to create document");
    }
};
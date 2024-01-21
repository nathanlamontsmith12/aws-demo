import DocumentModels from "../../models/Document.js";
import { handleMutationError } from "./_mutation-helpers.js";

export const createDocument = async (_root, variables, { insertData }) => {
    try {
        const {
            name,
            size,
            dqFlag, 
            file 
        } = variables;

        console.log("FILE :: ", file);
        await insertData({ name, size, dqFlag }, DocumentModels);

        return {
            success: true,
            message: "Successfully created document"
        };
    } catch (err) {
        return handleMutationError(err, "Error when attempting to create document");
    }
};
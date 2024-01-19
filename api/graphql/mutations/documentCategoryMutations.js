import DocumentCategoryModels from "../../models/DocumentCategory.js";
import { insertData } from "../../db.js";
import { handleMutationError } from "./_mutation-helpers.js";

export const createDocumentCategory = async (_root, variables) => {
    try {
        const newDocumentCategory = await insertData(variables, DocumentCategoryModels);
        return {
            success: true,
            message: "Successfully created document category",
            data: {
                ...newDocumentCategory,
                __typename: "DocumentCategory"
            }
        };
    } catch (err) {
        return handleMutationError(err, "Error when attempting to create document category");
    }
};
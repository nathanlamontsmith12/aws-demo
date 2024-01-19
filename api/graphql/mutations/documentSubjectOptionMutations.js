import DocumentSubjectOptionModels from "../../models/DocumentSubjectOption.js";
import { insertData } from "../../db.js";
import { handleMutationError } from "./_mutation-helpers.js";

export const createEventCategory = async (_root, variables) => {
    try {
        const newDocumentSubjectOption = await insertData(variables, DocumentSubjectOptionModels);
        return {
            success: true,
            message: "Successfully created document subject option",
            data: {
                ...newDocumentSubjectOption,
                __typename: "DocumentSubjectOption"
            }
        };
    } catch (err) {
        return handleMutationError(err, "Error when attempting to create document subject option");
    }
};
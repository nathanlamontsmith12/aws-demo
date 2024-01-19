import CaseModels from "../../models/Case.js";
import { insertData } from "../../db.js";
import { handleMutationError } from "./_mutation-helpers.js";

export const createCase = async (_root, variables) => {
    try {
        const newCase = await insertData(variables, CaseModels);
        return {
            success: true,
            message: "Successfully created case",
            data: {
                ...newCase,
                __typename: "Case"
            }
        };
    } catch (err) {
        return handleMutationError(err, "Error when attempting to create case");
    }
};
import CaseCategoryModels from "../../models/CaseCategory.js";
import { insertData } from "../../db.js";
import { handleMutationError } from "./_mutation-helpers.js";

export const createCaseCategory = async (_root, variables) => {
    try {
        const newCaseCategory = await insertData(variables, CaseCategoryModels);
        return {
            success: true,
            message: "Successfully created case category",
            data: {
                ...newCaseCategory,
                __typename: "CaseCategory"
            }
        };
    } catch (err) {
        return handleMutationError(err, "Error when attempting to create case category");
    }
};
import EventDataCategoryModels from "../../models/EventDataCategory.js";
import { insertData } from "../../db.js";
import { handleMutationError } from "./_mutation-helpers.js";

export const createEventDataCategory = async (_root, variables) => {
    try {
        const newEventDataCategory = await insertData(variables, EventDataCategoryModels);
        return {
            success: true,
            message: "Successfully created event data category",
            data: {
                ...newEventDataCategory,
                __typename: "EventDataCategory"
            }
        };
    } catch (err) {
        return handleMutationError(err, "Error when attempting to create event data category");
    }
};
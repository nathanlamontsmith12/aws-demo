import EventCategoryModels from "../../models/EventDataCategory.js";
import { insertData } from "../../db.js";
import { handleMutationError } from "./_mutation-helpers.js";

export const createEventCategory = async (_root, variables) => {
    try {
        const newEventCategory = await insertData(variables, EventCategoryModels);
        return {
            success: true,
            message: "Successfully created event data category",
            data: {
                ...newEventCategory,
                __typename: "EventCategory"
            }
        };
    } catch (err) {
        return handleMutationError(err, "Error when attempting to create event category");
    }
};
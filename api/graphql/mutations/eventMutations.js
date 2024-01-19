import EventModels from "../../models/Event.js";
import { insertData } from "../../db.js";
import { handleMutationError } from "./_mutation-helpers.js";

export const createEvent = async (_root, variables) => {
    try {
        const newEvent = await insertData(variables, EventModels);
        return {
            success: true,
            message: "Successfully created event",
            data: {
                ...newEvent,
                __typename: "Event"
            }
        };
    } catch (err) {
        return handleMutationError(err, "Error when attempting to create event");
    }
};
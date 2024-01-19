import EventDataModels from "../../models/EventDatum.js";
import { insertData } from "../../db.js";
import { handleMutationError } from "./_mutation-helpers.js";

export const createEventData = async (_root, variables) => {
    try {
        const newEventData = await insertData(variables, EventDataModels);
        return {
            success: true,
            message: "Successfully created event data",
            data: {
                ...newEventData,
                __typename: "EventData"
            }
        };
    } catch (err) {
        return handleMutationError(err, "Error when attempting to create event data");
    }
};
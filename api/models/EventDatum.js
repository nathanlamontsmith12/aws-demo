import { z } from "zod";
import { assembleModel } from "./_model-helpers.js";

const EventDataSchema = z.object({
    id: z.string().uuid(),
    eventId: z.string.uuid(),
    eventDataCategoryId: z.string.uuid(),
    data: z.string()
});

const AbstractEventData = (data) => {
    EventDataSchema.parse(data);
    // validate that data is in json format ::
    JSON.parse(data.data);
    return {
        id: data.id,
        event_id: data.eventId,
        event_data_category_id: data.eventDataCategoryId,
        data: data.data
    };
};

export const EventDatum = assembleModel("event_data", AbstractEventData);
export const EventData = assembleModel("event_data", AbstractEventData, true);
export default [EventDatum, EventData];
import { z } from "zod";
import { assembleModel } from "./_model-helpers.js";

const EventSchema = z.object({
    id: z.string().uuid(),
    caseId: z.string().uuid(),
    eventCategoryId: z.string().uuid(),
    startDate: z.date(),
    endDate: z.date(),
    description: z.string()
});

const AbstractEvent = (data) => {
    EventSchema.parse(data);
    return {
        id: data.id,
        case_id: data.caseId,
        event_category_id: data.eventCategoryId,
        start_date: data.startDate,
        end_date: data.endDate,
        description: data.description
    };
};

export const Event = assembleModel("events", AbstractEvent);
export const Events = assembleModel("events", AbstractEvent, true);
export default [Event, Events];
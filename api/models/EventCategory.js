import { z } from "zod";
import { assembleModel } from "./_model-helpers.js";

const EventCategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string()
});

const AbstractEventCategory = (data) => {
    EventCategorySchema.parse(data);
    return {
        id: data.id,
        name: data.name,
        description: data.description
    };
};

export const EventCategory = assembleModel("event_categories", AbstractEventCategory);
export const EventCategories = assembleModel("event_categories", AbstractEventCategory, true);
export default [EventCategory, EventCategories];
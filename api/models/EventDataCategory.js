import { z } from "zod";
import { assembleModel } from "./_model-helpers.js";

const EventDataCategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string()
});

const AbstractEventDataCategory = (data) => {
    EventDataCategorySchema.parse(data);
    return {
        id: data.id,
        name: data.name,
        description: data.description
    };
};

export const EventDataCategory = assembleModel(
    "event_data_categories",
    AbstractEventDataCategory
);

export const EventDataCategories = assembleModel(
    "event_data_categories",
    AbstractEventDataCategory,
    true
);

export default [EventDataCategory, EventDataCategories];
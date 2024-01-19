import { eventsOfCategory } from "../batchLoaders.js";

export const EventCategoryTypeResolver = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    events: ({ id: eventCategoryId }) => eventCategoryId
        ? eventsOfCategory.load(eventCategoryId)
        : [],
    description: ({ description }) => description,
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
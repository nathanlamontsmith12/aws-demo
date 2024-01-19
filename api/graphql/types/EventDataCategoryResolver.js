import { eventDataOfCategory } from "../batchLoaders.js";

export const EventDataCategoryTypeResolver = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    eventData: ({ id: eventDataCategoryId }) => eventDataCategoryId
        ? eventDataOfCategory.load(eventDataCategoryId)
        : [],
    description: ({ description }) => description,
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
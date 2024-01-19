import {
    eventLoader,
    eventDataCategoryLoader
} from "../batchLoaders.js";

export const EventDataTypeResolver = {
    id: ({ id }) => id,
    event: ({ event_id: eventId }) => eventId ? eventLoader.load(eventId) : null,
    category: ({ event_data_category_id: eventDataCategoryId }) => eventDataCategoryId
        ? eventDataCategoryLoader.load(eventDataCategoryId)
        : null,
    data: ({ data }) => data,
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
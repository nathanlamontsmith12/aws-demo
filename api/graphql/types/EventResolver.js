import {
    documentsBySubjectId,
    caseLoader,
    eventData,
    eventCategoryLoader
} from "../batchLoaders.js";

export const EventTypeResolver = {
    id: ({ id }) => id,
    startDate: ({ start_date }) => start_date,
    endDate: ({ end_date }) => end_date,
    description: ({ description }) => description,
    documents: ({ id: subjectId }) => subjectId ? documentsBySubjectId.load(subjectId) : [],
    case: ({ case_id: caseId }) => caseId ? caseLoader.load(caseId) : null,
    category: ({ category_id: categoryId }) => categoryId
        ? eventCategoryLoader.load(categoryId)
        : null,
    eventData: ({ id: eventId }) => eventId ? eventData.load(eventId) : [],
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
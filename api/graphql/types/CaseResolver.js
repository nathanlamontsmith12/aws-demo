import {
    userLoader,
    documentsBySubjectId,
    caseCategoryLoader,
    eventsByCaseIdLoader
} from "../batchLoaders.js";

export const CaseTypeResolver = {
    id: ({ id }) => id,
    client: ({ user_id: userId }) => userId ? userLoader.load(userId) : null,
    documents: ({ id: subjectId }) => subjectId ? documentsBySubjectId.load(subjectId) : [],
    category: ({ case_category_id: caseCategoryId }) => caseCategoryId
        ? caseCategoryLoader.load(caseCategoryId)
        : null,
    events: ({ id: caseId }) => caseId
        ? eventsByCaseIdLoader.load(caseId)
        : null,
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
import { casesOfCategory } from "../batchLoaders.js";

export const CaseCategoryTypeResolver = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    cases: ({ id: caseCategoryId }) => caseCategoryId
        ? casesOfCategory.load(caseCategoryId)
        : [],
    description: ({ description }) => description,
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
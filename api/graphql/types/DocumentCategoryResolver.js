import { documentsOfCategory } from "../batchLoaders.js";

export const DocumentCategoryTypeResolver = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    documents: ({ id: documentCategoryId }) => documentCategoryId
        ? documentsOfCategory.load(documentCategoryId)
        : [],
    description: ({ description }) => description,
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
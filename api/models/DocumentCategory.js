import { z } from "zod";
import { assembleModel } from "./_model-helpers.js";

const DocumentCategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string()
});

const AbstractDocumentCategory = (data) => {
    DocumentCategorySchema.parse(data);
    return {
        id: data.id,
        name: data.name,
        description: data.description
    };
};

export const DocumentCategory = assembleModel("document_categories", AbstractDocumentCategory);
export const DocumentCategories = assembleModel("document_categories", AbstractDocumentCategory, true);
export default [DocumentCategory, DocumentCategories];
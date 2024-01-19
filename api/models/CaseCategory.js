import { z } from "zod";
import { assembleModel } from "./_model-helpers.js";

const CaseCategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string()
});

const AbstractCaseCategory = (data) => {
    CaseCategorySchema.parse(data);
    return {
        id: data.id,
        name: data.name,
        description: data.description
    };
};

export const CaseCategory = assembleModel("case_categories", AbstractCaseCategory);
export const CaseCategories = assembleModel("case_categories", AbstractCaseCategory, true);
export default [CaseCategory, CaseCategories];
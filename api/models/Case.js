import { z } from "zod";
import { assembleModel } from "./_model-helpers.js";

const CaseSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    caseCategoryId: z.string().uuid()
});

const AbstractCase = (data) => {
    CaseSchema.parse(data);
    return {
        id: data.id,
        user_id: data.userId,
        case_category_id: data.caseCategoryId
    };
};

export const Case = assembleModel("cases", AbstractCase);
export const Cases = assembleModel("cases", AbstractCase, true);
export default [Case, Cases];
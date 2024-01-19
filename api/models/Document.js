import { z } from "zod";
import { DOCUMENT_UPLOAD_STATUSES } from "../constants.js";
import { assembleModel } from "./_model-helpers.js";

const DocumentSchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    nodeId: z.string().uuid(),
    documentCategoryId: z.string().uuid(),
    documentSubjectOptionId: z.string().uuid(),
    uploadStatus: z.string(),
    name: z.string(),
    size: z.bigint()
}).refine(
    ({ uploadStatus }) => Object.values(DOCUMENT_UPLOAD_STATUSES).includes(uploadStatus),
    { message: "Invalid upload status for new document" }
);

const AbstractDocument = (data) => {
    DocumentSchema.parse(data);
    return {
        id: data.id,
        user_id: data.userId,
        node_id: data.nodeId,
        documentCategoryId: data.document_category_id,
        documentSubjectOptionId: data.document_subject_option_id,
        name: data.name,
        size: data.size,
        upload_status: data.uploadStatus
    };
};

export const Document = assembleModel("documents", AbstractDocument);
export const Documents = assembleModel("documents", AbstractDocument, true);
export default [Document, Documents];
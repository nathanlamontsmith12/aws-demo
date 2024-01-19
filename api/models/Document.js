import { z } from "zod";
import { DOCUMENT_UPLOAD_STATUSES } from "../constants.js";
import { assembleModel } from "./_model-helpers.js";

const DocumentSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    size: z.bigint(),
    uploadStatus: z.string().default(DOCUMENT_UPLOAD_STATUSES.uploading),
    dqFlag: z.boolean().default(false),
    dqStatus: z.string().nullable()
}).refine(
    ({ uploadStatus }) => Object.values(DOCUMENT_UPLOAD_STATUSES).includes(uploadStatus),
    { message: "Invalid upload status for new document" }
);

const AbstractDocument = (data) => {
    DocumentSchema.parse(data);
    return {
        id: data.id,
        name: data.name,
        size: data.size,
        upload_status: data.uploadStatus,
        dq_flag: data.dqFlag,
        dq_status: data.dqStatus
    };
};

export const Document = assembleModel("documents", AbstractDocument);
export const Documents = assembleModel("documents", AbstractDocument, true);

export default [Document, Documents];
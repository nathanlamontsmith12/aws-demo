import { z } from "zod";
import { 
    DEFAULT_UPLOAD_STATUS, 
    DEFAULT_DATA_QUALITY_STATUS, 
    DOCUMENT_UPLOAD_STATUSES,
    DATA_QUALITY_STATUSES 
} from "../constants.js";
import { assembleModel } from "./_model-helpers.js";

const DocumentSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    type: z.string(),
    size: z.number().int().safe().positive(),
    uploadStatus: z.string().default(DEFAULT_UPLOAD_STATUS),
    dqFlag: z.boolean().default(false),
    dqStatus: z.string().nullable().default(null),
    reportName: z.string().nullable().default(null)
}).refine(
    ({ uploadStatus }) => Object.values(DOCUMENT_UPLOAD_STATUSES).includes(uploadStatus),
    { message: "Invalid upload status for new document" }
).refine(
    ({ dqStatus, dqFlag }) => {
        return dqFlag === true 
            ? Object.values(DATA_QUALITY_STATUSES).includes(dqStatus) 
            : dqStatus === null;
    },
    { message: "Invalid data quality status for new document" }
);

const AbstractDocument = (data) => {
    const initialDQStatus = data.dqStatus && typeof data.dqStatus === "string"
        ? data.dqStatus 
        : DEFAULT_DATA_QUALITY_STATUS;

    const dataToUse = {
        ...data,
        type: Boolean(data.type) && typeof data.type === "string" ? data.type : null,
        dqStatus: data.dqFlag === true ? initialDQStatus : null,
        reportName: null
    };

    DocumentSchema.parse(dataToUse);

    return {
        id: dataToUse.id,
        name: dataToUse.name,
        type: dataToUse.type,
        size: dataToUse.size,
        upload_status: dataToUse.uploadStatus,
        dq_flag: dataToUse.dqFlag,
        dq_status: dataToUse.dqStatus
    };
};

export const Document = assembleModel("documents", AbstractDocument);
export const Documents = assembleModel("documents", AbstractDocument, true);

export default [Document, Documents];
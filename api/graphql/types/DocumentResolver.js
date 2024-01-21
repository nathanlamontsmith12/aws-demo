import { DOCUMENT_UPLOAD_STATUSES } from "../../constants.js";

export const DocumentTypeResolver = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    type: ({ type }) => type,
    size: ({ size }) => size,
    uploadStatus: ({ upload_status }) => upload_status,
    canDownload: ({ upload_status }) => upload_status === DOCUMENT_UPLOAD_STATUSES.uploaded,
    dqFlag: ({ dq_flag }) => dq_flag,
    dqStatus: ({ dq_status }) => dq_status,
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
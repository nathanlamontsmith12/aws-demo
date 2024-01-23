import { 
    DATA_QUALITY_STATUSES, 
    DOCUMENT_UPLOAD_STATUSES, 
    DEFAULT_REPORT_NAME 
} from "../../constants.js";


export const DocumentTypeResolver = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    type: ({ type }) => type,
    size: ({ size }) => size,
    uploadStatus: ({ upload_status }) => upload_status,
    canDownload: ({ upload_status }) => upload_status === DOCUMENT_UPLOAD_STATUSES.uploaded,
    hasReport: ({ dq_status }) => dq_status === DATA_QUALITY_STATUSES.failed,
    dqFlag: ({ dq_flag }) => dq_flag,
    dqStatus: ({ dq_status }) => dq_status,
    reportName: ({ report_name, dq_status }) => {
        if (report_name) {
            return report_name;
        } else {
            return dq_status === DATA_QUALITY_STATUSES.failed 
                ? DEFAULT_REPORT_NAME
                : null;
        }
    },
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
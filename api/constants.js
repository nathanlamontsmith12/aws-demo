export const ONE_GB = 1000 * 1000 * 1000;

export const DOCUMENT_UPLOAD_STATUSES = {
    uploading: "Uploading",
    uploaded: "Finished",
    error: "Error"
};

export const DEFAULT_UPLOAD_STATUS = DOCUMENT_UPLOAD_STATUSES.uploading;

export const DATA_QUALITY_STATUSES = {
    pending: "In Progress",
    failed: "Issues Found",
    success: "Passed",
    error: "Error"
};

export const DEFAULT_DATA_QUALITY_STATUS = DATA_QUALITY_STATUSES.pending;

export const CORE_TABLE_NAMES = [
    "documents"
];
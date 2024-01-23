import dotenv from "dotenv";
dotenv.config();

export const ONE_GB = 1000 * 1000 * 1000;

export const DOCUMENT_UPLOAD_STATUSES = {
    uploading: "Uploading",
    uploaded: "Finished",
    jailed: "Wrong File Type",
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

export const S3_BUCKET = `${process.env.S3_BUCKET}`;

export const S3_TARGETS = {
    initial: `${process.env.S3_INITIAL_FOLDER}`,
    reports: `${process.env.S3_REPORTS_FOLDER}`,
    jail: `${process.env.S3_JAIL_FOLDER}`,
    promote: `${process.env.S3_PROMOTE_FOLDER}`
};

export const VALID_DATA_QUALITY_FILE_TYPES = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "text/csv"
];

export const DEFAULT_REPORT_NAME = "dq-report.json";

import { DATA_QUALITY_STATUSES, DEFAULT_REPORT_NAME } from "../constants.js";
import { repository } from "../data-access/repository.js";

// Endpoints To be hit by AWS Lambda Functions Triggered by S3 uploads :: 
export const DATA_QUALITY_ENDPOINT = "/data-quality-result/:documentId/:result/:reportName";

export const dataQualityHandler = async (req, res) => {
    const validateReportName = (reportName) => {
        if (!reportName || typeof reportName !== "string") {
            return DEFAULT_REPORT_NAME;
        } else if (reportName === "null") {
            return DEFAULT_REPORT_NAME;
        } else {
            return reportName;
        }
    };

    const reportName = validateReportName(req.params.reportName);
    const result = req.params.result;
    const documentId = req.params.documentId;

    console.log("\n\nReceiving notification :: data quality finished :: ", documentId);
    console.log(" -- Result :: ", result);

    let dqStatus;
    if (result === "error") {
        dqStatus = DATA_QUALITY_STATUSES.error;
    } else if (result === "pass") {
        dqStatus = DATA_QUALITY_STATUSES.success;
    } else {
        dqStatus = DATA_QUALITY_STATUSES.failed;
    }

    await repository.updateDocumentDQStatus(documentId, dqStatus, reportName);
    res.status(200).send("Complete");
};
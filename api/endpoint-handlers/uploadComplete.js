import { repository } from "../data-access/repository.js";
import { imprisonFile } from "../file-storage/imprisonFile.js";
import { promoteFile } from "../file-storage/promoteFile.js";

// Endpoint To be hit by AWS Lambda Functions Triggered by S3 uploads :: 
export const UPLOAD_COMPLETE_ENDPOINT = "/document-upload-complete/:documentId/:verdict";

export const uploadCompleteHandler = async (req, res) => {
    try {
        const verdict = req.params.verdict;
        const documentId = req.params.documentId;
        console.log("\n\nReceiving notification :: document upload complete :: ", req.params.documentId);
        console.log(" -- Result :: ", verdict);

        if (verdict === "error") {
            await repository.updateDocumentOnError(documentId);
        } else if (verdict === "innocent") {
            await promoteFile(documentId);
        } else {
            await imprisonFile(documentId);
        }

        res.status(200).send("Complete");
    } catch (err) {
        console.log(err);
        res.status(400).send("Error");
    }
};
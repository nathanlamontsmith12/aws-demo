import { repository } from "../data-access/repository.js";

// Endpoint To be hit by AWS Lambda Functions Triggered by S3 uploads :: 
export const DOCUMENT_PROMOTED_ENDPOINT = "/document-ready/:documentId";

export const documentPromotedHandler = async (req, res) => {
    const documentId = req.params.documentId;
    console.log("\n\nReceiving notification :: document promoted :: ", documentId);
    await repository.updateDocumentOnUpload(documentId);
    res.status(200).send("Complete");
};
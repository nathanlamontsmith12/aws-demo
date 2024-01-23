import { S3_BUCKET, S3_TARGETS } from "../constants.js";
import { repository } from "../data-access/repository.js";
import { copyFile } from "./copyFile.js";


export const imprisonFile = async (documentId) => {
    await repository.updateDocumentOnImprisonment(documentId);
    return copyFile(documentId, { 
        bucket: S3_BUCKET,
        source: S3_TARGETS.initial,
        destination: S3_TARGETS.jail
    });
};
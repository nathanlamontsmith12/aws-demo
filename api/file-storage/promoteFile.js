import { S3_BUCKET, S3_TARGETS } from "../constants.js";
import { copyFile } from "./copyFile.js";


export const promoteFile = async (documentId) => {
    return copyFile(documentId, {
        bucket: S3_BUCKET,
        source: S3_TARGETS.initial,
        destination: S3_TARGETS.promote
    });
};
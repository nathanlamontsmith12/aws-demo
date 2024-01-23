import { S3_BUCKET } from "../constants.js";
import { FileStorage } from "./_config.js";
import { makeKey } from "./_helpers.js";


export const getFileForDownload = async (documentId, target) => {
    const downloadParams = {
        Bucket: S3_BUCKET,
        Key: makeKey(documentId, target)
    };

    try {
        const data = await FileStorage.headObject(downloadParams).promise();
        const stream = FileStorage.getObject(downloadParams).createReadStream();

        stream.on("error", (err) => {
            console.error("Failed to download file from S3 with params :: ", downloadParams);
            console.log(err);
        });

        const filename = data.Metadata.filename;

        return {
            stream,
            contentType: data.ContentType,
            contentLength: data.ContentLength,
            filename,
            success: true
        };
    } catch (err) {
        console.error("Download from S3 Failed", err);
        console.log(downloadParams);

        // error handling delegated to the function calling downloadFileFromS3 :: 
        return {
            error: err,
            success: false
        };
    }
};
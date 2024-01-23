import { FileStorage } from "./_config.js";


export const copyFile = async (documentId, { bucket, source, destination }) => {
    try {
        await FileStorage.copyObject({
            Bucket: `${bucket}/${destination}`,
            CopySource: `${bucket}/${source}/${documentId}`,
            Key: documentId
        }).promise();
        return true;
    } catch (err) {
        console.log(err);
        return false;
    } 
};
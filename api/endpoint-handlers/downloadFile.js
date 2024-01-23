import { S3_TARGETS } from "../constants.js";
import { getFileForDownload } from "../file-storage/getFileForDownload.js";

// Endpoint To be used by frontend web app to download files :: 
export const DOWNLOAD_FILE_ENDPOINT = "/download-file/:documentId/:type";

export const downloadFileHandler = async (req, res) => {
    try {
        const documentId = req.params.documentId; 
        const downloadType = req.params.type;   
        const target = downloadType === "report"
            ? S3_TARGETS.reports
            : S3_TARGETS.promote;

        console.log("\n\nAttempting to get file :: ", documentId, " -- in :: ", target);

        const downloadResponse = await getFileForDownload(documentId, target);
        const { 
            success, 
            stream, 
            contentType, 
            contentLength, 
            filename 
        } = downloadResponse;
        
        if (success) {
            res.attachment(filename);
            res.contentType(contentType);
            res.set({"Content-Length": contentLength});
            stream
                .on("error", (err) => { 
                    console.log("ERROR while attempting to stream file for client download :: ");
                    console.log(err);
                })
                .pipe(res);
        } else {
            return res.status(500).send();
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
};
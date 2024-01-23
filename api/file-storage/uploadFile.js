import { S3_BUCKET, S3_TARGETS } from "../constants.js";
import { knex } from "../db.js";
import { execute, makeKey } from "./_helpers.js";
import { FileStorage } from "./_config.js";
import { repository } from "../data-access/repository.js";

const DEFAULT_TARGET = S3_TARGETS.initial;


const nonBlockingUpload = async (params, documentId, callback) => {
    try {
        const result = await FileStorage.upload(params).promise();
        console.log("Successfully uploaded File :: ", documentId);
        execute(callback, { result });
    } catch (err) {
        console.log("ERROR during 'nonBlockingUpload' :: ", err);
        await repository.updateDocumentOnError(documentId);
        execute(callback, { error: err });
    }
};

const stageFileForUpload = async (documentId, file, { target, callback }) => {
    try {
        const document = await knex("documents")
            .where({ id: documentId })
            .first();

        const resolvedFile = await file;
        
        const {
            createReadStream,
            filename,
            mimetype,
            encoding
        } = resolvedFile;

        const fileStream = createReadStream();
        fileStream.on("error", (err) => {
            console.log("Error uploading file :: ", documentId, file, target);
            console.log(err);
            execute(callback, { error: err });
        });

        const params = {
            Bucket: S3_BUCKET,
            Key: makeKey(documentId, S3_TARGETS.initial),
            Body: fileStream,
            Metadata: {
                document_id: documentId,
                document_name: document.name,
                document_size: document.size.toString(),
                document_type: document.type,
                dq_flag: document.dq_flag.toString(),
                filename: filename,
                mimetype: mimetype,
                encoding: encoding
            }
        };

        // do not "await" -- 
        nonBlockingUpload(params, documentId, callback);
    } catch (err) {
        console.log("Error uploading file :: ", documentId, file, target);
        console.log(err);
        repository.updateDocumentOnError(documentId);
        execute(callback, { error: err });
    }
};

const handleUploadError = async (documentId) => {
    try {
        await repository.updateDocumentOnError(documentId);
    } catch (err) {
        console.log("Failed to update document status to error :: ", documentId);
        console.log(err);
    }
};


export const uploadFile = async (documentId, file, options = {}) => { 
    try {
        const { target, callback } = options;
        const targetToUse = target ? target : DEFAULT_TARGET;
        console.log("Attempting to upload file :: ", documentId, file, target);
        await stageFileForUpload(documentId, file, { target: targetToUse, callback });
    } catch (err) {
        console.log(err);
        await handleUploadError(err);
    }
};
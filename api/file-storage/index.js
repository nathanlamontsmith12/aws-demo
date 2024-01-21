import { DOCUMENT_UPLOAD_STATUSES, S3_BUCKET, S3_TARGETS } from "../constants.js";
import { knex } from "../db.js";
import { FileStorage } from "./config.js";

const DEFAULT_TARGET = S3_TARGETS.initial;

const execute = (cb, ...args) => typeof cb === "function" ? cb(...args) : undefined;

const makeKey = (id, target) => `${target}/${id}`;

const nonBlockingUpload = async (params, documentId, callback) => {
    try {
        const result = await FileStorage.upload(params).promise();
        console.log("Successfully uploaded File :: ", documentId);
        execute(callback, { result });
    } catch (err) {
        console.log("ERROR during 'nonBlockingUpload' :: ", err);
        updateDocumentOnError(documentId);
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
                filename: filename,
                mimetype: mimetype,
                encoding: encoding,
                data_quality: document.dq_flag.toString()
            }
        };

        // do not "await" -- 
        nonBlockingUpload(params, documentId, callback);
    } catch (err) {
        console.log("Error uploading file :: ", documentId, file, target);
        console.log(err);
        updateDocumentOnError(documentId);
        execute(callback, { error: err });
    }
};

export const uploadFile = async (documentId, file, { target, callback }) => {
    const targetToUse = target ? target : DEFAULT_TARGET;
    console.log("Attempting to upload file :: ", documentId, file, target);
    await stageFileForUpload(documentId, file, { target: targetToUse, callback });
};

export const downloadFile = (documentId, target) => {
    const targetToUse = target ? target : DEFAULT_TARGET;
    console.log(documentId, targetToUse);
};

export const updateDocumentOnUpload = (documentId) => {
    return knex("documents")
        .where({ id: documentId })
        .update({ dq_status: DOCUMENT_UPLOAD_STATUSES.uploaded });
};

export const updateDocumentOnError = (documentId) => {
    return knex("documents")
        .where({ id: documentId })
        .update({ dq_status: DOCUMENT_UPLOAD_STATUSES.error });
};
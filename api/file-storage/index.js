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
        await updateDocumentOnError(documentId);
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

const handleUploadError = async (documentId) => {
    try {
        await updateDocumentOnError(documentId);
    } catch (err) {
        console.log("Failed to update document status to error :: ", documentId);
        console.log(err);
    }
};



// EXPORTS :: 

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


export const downloadFile = (documentId, target) => {
    const targetToUse = target ? target : DEFAULT_TARGET;
    console.log(documentId, targetToUse);
};


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



// Send to repository (refactoring -- later :: ) :: 

export const imprisonFile = async (documentId) => {
    await knex("documents")
        .where({ id: documentId })
        .update({ 
            upload_status: DOCUMENT_UPLOAD_STATUSES.jailed, 
            dq_flag: false
        });

    return copyFile(documentId, { 
        bucket: S3_BUCKET,
        source: S3_TARGETS.initial,
        destination: S3_TARGETS.jail
    });
};

export const promoteFile = async (documentId) => {
    return copyFile(documentId, {
        bucket: S3_BUCKET,
        source: S3_TARGETS.initial,
        destination: S3_TARGETS.promote
    });
};

export const updateDocumentOnUpload = async (documentId) => {
    return knex("documents")
        .where({ id: documentId })
        .update({ upload_status: DOCUMENT_UPLOAD_STATUSES.uploaded });
};

export const updateDocumentOnError = async (documentId) => {
    if (documentId) {
        return knex("documents")
            .where({ id: documentId })
            .update({ 
                upload_status: DOCUMENT_UPLOAD_STATUSES.error, 
                dq_flag: false
            });
    } else {
        return false;
    }
};

export const updateDocumentDQStatus = async (documentId, dqStatus) => {
    return knex("documents")
        .where({ id: documentId })
        .update({ 
            dq_status: dqStatus
        });
};
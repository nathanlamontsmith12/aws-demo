import { DOCUMENT_UPLOAD_STATUSES } from "../constants.js";
import { knex } from "../db.js";


export const repository = {
    getFailedUploads: () => {
        return knex("documents")
            .where("upload_status", DOCUMENT_UPLOAD_STATUSES.error)
            .orderBy("created_at", "DESC");
    },
    updateDocumentDQStatus: (documentId, dqStatus, reportName) => { 
        return knex("documents")
            .where({ id: documentId })
            .update({ 
                dq_status: dqStatus, 
                // will be undefined (and ignored by knex.update) if document passed or errored out of DQ :: 
                report_name: reportName 
            });
    },
    updateDocumentOnError: (documentId) => {
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
    }, 
    updateDocumentOnUpload: (documentId) => {
        return knex("documents")
            .where({ id: documentId })
            .update({ upload_status: DOCUMENT_UPLOAD_STATUSES.uploaded });
    }, 
    updateDocumentOnImprisonment: (documentId) => {
        return knex("documents")
            .where({ id: documentId })
            .update({ 
                upload_status: DOCUMENT_UPLOAD_STATUSES.jailed, 
                dq_flag: false
            });
    }
};
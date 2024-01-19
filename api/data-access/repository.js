import { DOCUMENT_UPLOAD_STATUSES } from "../constants.js";
import { knex } from "../db.js";

export const repository = {
    getFailedUploads: () => {
        return knex("documents")
            .where("upload_status", DOCUMENT_UPLOAD_STATUSES.error)
            .orderBy("created_at", "DESC");
    }
};
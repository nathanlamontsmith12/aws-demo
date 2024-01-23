import { DOCUMENT_UPLOAD_STATUSES } from "../../constants.js";

export const documentsTable = async (knex) => {
    await knex.schema.createTable("documents", (table) => {
        table.comment("Data about a file that has been uploaded");
        table.uuid("id")
            .primary()
            .references("nodes.id");
        table.string("name")
            .notNullable();
        table.integer("size")
            .comment("Size of the uploaded file, in bytes")
            .notNullable();
        table.string("type")
            .comment("File type of the uploaded file")
            .notNullable();
        table.string("upload_status")
            .comment("Status of the upload in terms of S3")
            .defaultTo(DOCUMENT_UPLOAD_STATUSES.uploading);
        table.boolean("dq_flag")
            .comment("Whether or not document should undergo data quality checks")
            .defaultTo(false);
        table.string("dq_status")
            .comment("Status of the data quality process; NULL unless document's dq_flag is TRUE");
        table.string("report_name")
            .comment("The filename of the DQ report (if any) associated with this document");
        table.datetime("created_at")
            .defaultTo(knex.fn.now());
        table.datetime("updated_at")
            .defaultTo(knex.fn.now());
    });
};
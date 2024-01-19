export const documentsTable = async (knex) => {
    await knex.schema.createTable("documents", (table) => {
        table.comment("Data about a file that has been uploaded");
        table.uuid("id")
            .primary()
            .references("nodes.id");
        table.uuid("user_id")
            .references("users.id")
            .notNullable();
        table.uuid("node_id")
            .references("nodes.id")
            .notNullable();
        table.uuid("document_category_id")
            .references("document_categories.id")
            .notNullable();
        table.uuid("document_subject_option_id")
            .references("document_subject_options.id")
            .notNullable();
        table.string("name")
            .notNullable();
        table.bigInteger("size")
            .comment("Size of the uploaded file, in bytes")
            .notNullable();
        table.string("upload_status")
            .comment("Status of the upload in terms of S3")
            .defaultTo("uploading");
        table.datetime("created_at")
            .defaultTo(knex.fn.now());
        table.datetime("updated_at")
            .defaultTo(knex.fn.now());
    });
};
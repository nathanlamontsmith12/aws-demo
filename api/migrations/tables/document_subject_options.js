export const documentSubjectOptionsTable = async (knex) => {
    await knex.schema.createTable("document_subject_options", (table) => {
        table.comment("Categories that apply to various objects");
        table.uuid("id")
            .primary()
            .references("nodes.id");
        table.string("name")
            .notNullable()
            .unique();
        table.string("subject_typename")
            .unique()
            .notNullable();
        table.string("subject_tablename")
            .unique()
            .notNullable();
        table.text("description")
            .notNullable();
        table.datetime("created_at")
            .defaultTo(knex.fn.now());
        table.datetime("updated_at")
            .defaultTo(knex.fn.now());
    });
};
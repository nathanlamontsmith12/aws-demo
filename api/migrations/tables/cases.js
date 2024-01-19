export const casesTable = async (knex) => {
    await knex.schema.createTable("cases", (table) => {
        table.comment("Each case belongs to exactly one user; a case groups together events and associated data and documents");
        table.uuid("id")
            .primary()
            .references("nodes.id");
        table.uuid("user_id")
            .references("users.id")
            .notNullable();
        table.uuid("case_category_id")
            .notNullable()
            .references("case_categories.id");
        table.datetime("created_at")
            .defaultTo(knex.fn.now());
        table.datetime("updated_at")
            .defaultTo(knex.fn.now());
    });
};
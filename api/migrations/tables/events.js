export const eventsTable = async (knex) => {
    await knex.schema.createTable("events", (table) => {
        table.comment("Each event belongs to exactly one case; events compose the case timeline");
        table.uuid("id")
            .primary()
            .references("nodes.id");
        table.uuid("case_id")
            .references("cases.id")
            .notNullable();
        table.uuid("event_category_id")
            .references("event_categories.id")
            .notNullable();
        table.datetime("start_date");
        table.datetime("end_date");
        table.text("description")
            .notNullable();
        table.datetime("created_at")
            .defaultTo(knex.fn.now());
        table.datetime("updated_at")
            .defaultTo(knex.fn.now());
    });
};
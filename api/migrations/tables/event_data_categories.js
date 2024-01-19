export const eventDataCategoriesTable = async (knex) => {
    await knex.schema.createTable("event_data_categories", (table) => {
        table.comment("Categories that apply to event data records");
        table.uuid("id")
            .primary()
            .references("nodes.id");
        table.string("name")
            .notNullable()
            .unique();
        table.text("description")
            .notNullable();
        table.datetime("created_at")
            .defaultTo(knex.fn.now());
        table.datetime("updated_at")
            .defaultTo(knex.fn.now());
    });
};
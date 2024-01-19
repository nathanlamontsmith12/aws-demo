export const eventDataTable = async (knex) => {
    await knex.schema.createTable("event_data", (table) => {
        table.comment("Arbitrary data (stored as json) associated with a specific event; an event can have any number of data");
        table.uuid("id")
            .primary()
            .references("nodes.id");
        table.uuid("event_id")
            .references("events.id")
            .notNullable();
        table.uuid("event_data_category_id")
            .references("event_data_categories.id")
            .notNullable();
        table.json("data");
        table.datetime("created_at")
            .defaultTo(knex.fn.now());
        table.datetime("updated_at")
            .defaultTo(knex.fn.now());
    });
};
export const permissionsTable = async (knex) => {
    await knex.schema.createTable("permissions", (table) => {
        table.comment("Permissions that can belong to many roles and, through roles, to many users");
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
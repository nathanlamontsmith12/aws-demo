export const usersTable = async (knex) => {
    await knex.schema.createTable("users", (table) => {
        table.comment("Users in the DB");
        table.uuid("id")
            .primary()
            .references("nodes.id");
        table.string("first_name")
            .notNullable();
        table.string("last_name")
            .notNullable();
        table.string("email");
        table.string("phone");
        table.datetime("created_at")
            .defaultTo(knex.fn.now());
        table.datetime("updated_at")
            .defaultTo(knex.fn.now());
    });
};
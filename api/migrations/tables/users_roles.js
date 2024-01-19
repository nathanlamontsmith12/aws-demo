// thru table -- no updated_at field is needed ::

export const usersRolesTable = async (knex) => {
    await knex.schema.createTable("users_roles", (table) => {
        table.comment("Connects users to their roles (thru table)");
        table.uuid("user_id")
            .references("users.id")
            .notNullable();
        table.uuid("role_id")
            .references("roles.id")
            .notNullable();
        table.unique(["user_id", "role_id"]);
        table.datetime("created_at")
            .defaultTo(knex.fn.now());
    });
};
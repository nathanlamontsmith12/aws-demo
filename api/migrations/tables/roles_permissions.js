// thru table -- no updated_at field is needed ::

export const rolesPermissionsTable = async (knex) => {
    await knex.schema.createTable("roles_permissions", (table) => {
        table.comment("Connects roles to permissions (thru table)");
        table.uuid("role_id")
            .references("roles.id")
            .notNullable();
        table.uuid("permission_id")
            .references("permissions.id")
            .notNullable();
        table.unique(["role_id", "permission_id"]);
        table.datetime("created_at")
            .defaultTo(knex.fn.now());
    });
};
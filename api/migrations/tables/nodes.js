export const nodesTable = async (knex) => {
    await knex.schema.createTable("nodes", (table) => {
        table.comment("Nodes table -- superset of all IDs of all rows");
        table.uuid("id")
            .primary();
    });
};
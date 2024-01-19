import { knex } from "../db.js";
import { nodesTable } from "./tables/nodes.js";
import { documentsTable } from "./tables/documents.js";

const ADD_TABLE_ORDER = [
    {
        table: "nodes",
        operation: nodesTable
    },
    {
        table: "documents",
        operation: documentsTable
    }
];

export const up = async () => {
    for (let i = 0; i < ADD_TABLE_ORDER.length; i++) {
        const { operation } = ADD_TABLE_ORDER[i];
        await operation(knex);
    }
};

export const down = async () => {
    const dropOrder = ADD_TABLE_ORDER.slice().reverse();
    for (let i = 0; i < dropOrder.length; i++) {
        const { table } = dropOrder[i];
        await knex.schema.dropTableIfExists(table);
    }
};

export default {
    up,
    down
};
import { knex } from "../db.js";
import { casesTable } from "./tables/cases.js";
import { caseCategoriesTable } from "./tables/case_categories.js";
import { documentsTable } from "./tables/documents.js";
import { documentCategoriesTable } from "./tables/document_categories.js";
import { documentSubjectOptionsTable } from "./tables/document_subject_options.js";
import { eventsTable } from "./tables/events.js";
import { eventCategoriesTable } from "./tables/event_categories.js";
import { eventDataTable } from "./tables/event_data.js";
import { eventDataCategoriesTable } from "./tables/event_data_categories.js";
import { nodesTable } from "./tables/nodes.js";
import { permissionsTable } from "./tables/permissions.js";
import { rolesTable } from "./tables/roles.js";
import { rolesPermissionsTable } from "./tables/roles_permissions.js";
import { usersTable } from "./tables/users.js";
import { usersRolesTable } from "./tables/users_roles.js";

const ADD_TABLE_ORDER = [
    {
        table: "nodes",
        operation: nodesTable
    },
    {
        table: "roles",
        operation: rolesTable
    },
    {
        table: "users",
        operation: usersTable
    },
    {
        table: "permissions",
        operation: permissionsTable
    },
    {
        table: "case_categories",
        operation: caseCategoriesTable
    },
    {
        table: "document_categories",
        operation: documentCategoriesTable
    },
    {
        table: "event_categories",
        operation: eventCategoriesTable
    },
    {
        table: "event_data_categories",
        operation: eventDataCategoriesTable
    },
    {
        table: "cases",
        operation: casesTable
    },
    {
        table: "document_subject_options",
        operation: documentSubjectOptionsTable
    },
    {
        table: "documents",
        operation: documentsTable
    },
    {
        table: "events",
        operation: eventsTable
    },
    {
        table: "event_data",
        operation: eventDataTable
    },
    {
        table: "roles_permissions",
        operation: rolesPermissionsTable
    },
    {
        table: "users_roles",
        operation: usersRolesTable
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
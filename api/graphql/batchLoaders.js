import { knex } from "../db.js";
import Dataloader from "dataloader";

const biject = (ids, rows) => {
    const lookup = rows.reduce((obj, row) => {
        const value = row.id;
        if (value in obj) {
            obj[value] = row;
        }
        return obj;
    }, {});
    return ids.map(id => lookup[id]);
};

const group = (ids, rows, key = "id") => {
    const lookup = rows.reduce((obj, row) => {
        const value = row[key];
        if (!Array.isArray(obj[value])) {
            obj[value] = [row];
        } else {
            obj[value].push(row);
        }
        return obj;
    }, {});
    return ids.map(id => lookup[id] ? lookup[id] : []);
};

const assembleSimpleLoader = (pqThunk, key = "id", mapFn = biject) => {
    const batchFn = async (ids) => {
        const rows = await pqThunk().whereIn(key, ids);
        return mapFn(ids, rows, key);
    };
    return new Dataloader(batchFn);
};

const getRolePermissions = async (roleIds) => {
    const rows = await knex("permissions")
        .innerJoin("roles_permissions", "roles_permissions.permission_id", "permissions.id")
        .whereIn("roles_permissions.role_id", roleIds)
        .select("permissions.*", "roles_permissions.role_id");
    return group(roleIds, rows, "role_id");
};

const getUserPermissions = async (userIds) => {
    const rows = await knex("permissions")
        .innerJoin("roles_permissions", "roles_permissions.permission_id", "permissions.id")
        .innerJoin("users_roles", "users_roles.role_id", "roles_permissions.role_id")
        .whereIn("users_roles.user_id", userIds)
        .select("permissions.*", "users_roles.user_id");
    return group(userIds, rows, "user_id");
};

const getUserRoles = async (userIds) => {
    const rows = await knex("roles")
        .innerJoin("users_roles", "users_roles.role_id", "roles.id")
        .whereIn("users_roles.user_id", userIds)
        .select("roles.*", "users_roles.user_id");
    return group(userIds, rows, "user_id");
};

const getRolesWithPermission = async (permissionIds) => {
    const rows = await knex("roles")
        .innerJoin("roles_permissions", "roles_permissions.role_id", "roles.id")
        .whereIn("roles_permissions.permission_id", permissionIds)
        .select("roles.*", "roles_permissions.permission_id");
    return group(permissionIds, rows, "permission_id");
};

const getUsersWithPermission = async (permissionIds) => {
    const rows = await knex("users")
        .innerJoin("users_roles", "users_roles.user_id", "users.id")
        .innerJoin("roles_permissions", "roles_permissions.role_id", "users_roles.role_id")
        .whereIn("roles_permissions.permission_id", permissionIds)
        .select("roles_permissions.permission_id");
    return group(permissionIds, rows, "permission_id");
};

export const caseCategoryLoader = assembleSimpleLoader(() => knex("case_categories"));
export const caseLoader = assembleSimpleLoader(() => knex("cases"));
export const documentCategoryLoader = assembleSimpleLoader(() => knex("document_categories"));
export const documentLoader = assembleSimpleLoader(() => knex("documents"));
export const documentSubjectOption = assembleSimpleLoader(() => knex("document_subject_options"));
export const eventCategoryLoader = assembleSimpleLoader(() => knex("event_categories"));
export const eventLoader = assembleSimpleLoader(() => knex("events"));
export const eventDataCategoryLoader = assembleSimpleLoader(() => knex("event_data_categories"));
export const permissionLoader = assembleSimpleLoader(() => knex("permissions"));
export const roleLoader = assembleSimpleLoader(() => knex("roles"));
export const userLoader = assembleSimpleLoader(() => knex("users"));
export const eventData = assembleSimpleLoader(() => knex("event_data"), "event_id");
export const eventDataOfCategory = assembleSimpleLoader(() => knex("event_data"), "event_data_category_id", group);
export const eventsOfCategory = assembleSimpleLoader(() => knex("events"), "event_category_id", group);
export const documentsOfCategory = assembleSimpleLoader(() => knex("documents"), "document_category_id");
export const casesOfCategory = assembleSimpleLoader(() => knex("cases"), "case_category_id", group);
export const documentsBySubjectId = assembleSimpleLoader(() => knex("documents"), "node_id", group);
export const eventsByCaseIdLoader = assembleSimpleLoader(() => knex("events"), "case_id", group);
export const userDocuments = assembleSimpleLoader(() => knex("documents"), "user_id", group);
export const userCases = assembleSimpleLoader(() => knex("cases"), "user_id", group);
export const rolePermissions = new Dataloader(getRolePermissions);
export const userPermissions = new Dataloader(getUserPermissions);
export const userRoles = new Dataloader(getUserRoles);
export const rolesWithPermission = new Dataloader(getRolesWithPermission);
export const usersWithPermission = new Dataloader(getUsersWithPermission);

const allLoaders = {
    caseCategoryLoader,
    caseLoader,
    documentCategoryLoader,
    documentLoader,
    documentSubjectOption,
    eventCategoryLoader,
    eventLoader,
    eventDataCategoryLoader,
    permissionLoader,
    roleLoader,
    userLoader,
    eventData,
    eventDataOfCategory,
    eventsOfCategory,
    documentsOfCategory,
    casesOfCategory,
    documentsBySubjectId,
    eventsByCaseIdLoader,
    userDocuments,
    userCases,
    rolePermissions,
    userPermissions,
    userRoles,
    rolesWithPermission,
    usersWithPermission
};

export default allLoaders;
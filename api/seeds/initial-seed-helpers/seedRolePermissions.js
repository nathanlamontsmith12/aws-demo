import { PERMISSIONS, ROLES } from "../../constants.js";

export const seedRolePermissions = [
    ...Object.values(PERMISSIONS).map(permission => ({
        role: ROLES.owner,
        permission
    })),
    ...Object.values(PERMISSIONS).map(permission => ({
        role: ROLES.assistant,
        permission
    })),
    ...Object.values(PERMISSIONS).map(permission => ({
        role: ROLES.basic,
        permission
    }))
];
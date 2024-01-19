import {
    usersWithPermission,
    rolesWithPermission
} from "../batchLoaders.js";

export const PermissionTypeResolver = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    users: ({ id: permissionId }) => permissionId ? usersWithPermission.load(permissionId) : [],
    roles: ({ id: permissionId }) => permissionId ? rolesWithPermission.load(permissionId) : [],
    description: ({ description }) => description,
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
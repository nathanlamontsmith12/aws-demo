import { rolePermissions } from "../batchLoaders.js";

export const RoleTypeResolver = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    description: ({ description }) => description,
    permissions: ({ id: roleId }) => roleId ? rolePermissions.load(roleId) : [],
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
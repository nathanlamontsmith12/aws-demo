import { z } from "zod";

const RolePermissionSchema = z.object({
    roleId: z.string().uuid(),
    permissionId: z.string().uuid()
});

const AbstractRolePermission = (data) => {
    RolePermissionSchema.parse(data);
    return {
        role_id: data.roleId,
        permission_id: data.permissionId
    };
};

export const RolePermission = (data) => [{
    table: "roles_permissions",
    rows: [AbstractRolePermission(data)]
}];

export const RolePermissions = (data) => [{
    table: "roles_permissions",
    rows: data.map(AbstractRolePermission)
}];

export default [RolePermission, RolePermissions];
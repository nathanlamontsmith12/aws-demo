import { z } from "zod";

const UserRoleSchema = z.object({
    userId: z.string().uuid(),
    roleId: z.string().uuid()
});

const AbstractUserRole = (data) => {
    UserRoleSchema.parse(data);
    return {
        user_id: data.userId,
        role_id: data.roleId
    };
};

export const UserRole = (data) => [{
    table: "users_roles",
    rows: [AbstractUserRole(data)]
}];

export const UserRoles = (data) => [{
    table: "users_roles",
    rows: data.map(AbstractUserRole)
}];

export default [UserRole, UserRoles];
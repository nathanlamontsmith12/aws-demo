import { z } from "zod";
import { assembleModel } from "./_model-helpers.js";

const RoleSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string()
});

const AbstractRole = (data) => {
    RoleSchema.parse(data);
    return {
        id: data.id,
        name: data.name,
        description: data.description
    };
};

export const Role = assembleModel("roles", AbstractRole);
export const Roles = assembleModel("roles", AbstractRole, true);
export default [Role, Roles];
import { z } from "zod";
import { assembleModel } from "./_model-helpers.js";

const PermissionSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string()
});

const AbstractPermission = (data) => {
    PermissionSchema.parse(data);
    return {
        id: data.id,
        name: data.name,
        description: data.description
    };
};

export const Permission = assembleModel("permissions", AbstractPermission);
export const Permissions = assembleModel("permissions", AbstractPermission, true);
export default [Permission, Permissions];
import PermissionModels from "../../models/Permission.js";
import { insertData } from "../../db.js";
import { handleMutationError } from "./_mutation-helpers.js";

export const createPermission = async (_root, variables) => {
    try {
        const newPermission = await insertData(variables, PermissionModels);
        return {
            success: true,
            message: "Successfully created permission",
            data: {
                ...newPermission,
                __typename: "Permission"
            }
        };
    } catch (err) {
        return handleMutationError(err, "Error when attempting to create permission");
    }
};
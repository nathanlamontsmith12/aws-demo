import RoleModels from "../../models/Role.js";
import { insertData } from "../../db.js";
import { handleMutationError } from "./_mutation-helpers.js";

export const createRole = async (_root, variables) => {
    try {
        const newRole = await insertData(variables, RoleModels);
        return {
            success: true,
            message: "Successfully created role",
            data: {
                ...newRole,
                __typename: "Role"
            }
        };
    } catch (err) {
        return handleMutationError(err, "Error when attempting to create role");
    }
};
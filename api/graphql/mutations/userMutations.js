import UserModels from "../../models/User.js";
import UserRoleModels from "../../models/UserRole.js";
import { insertData } from "../../db.js";
import { handleMutationError } from "./_mutation-helpers.js";
import { repository } from "../../data-access/repository.js";
import { RollbackSequence } from "../../data-access/rollback.js";

export const createUser = async (_root, userData, { db }) => {
    const rollback = new RollbackSequence();
    try {
        const newUser = await insertData(userData, UserModels);
        rollback.add(() => db("nodes").where("id", newUser.id).del());
        rollback.add(() => db("users").where("id", newUser.id).del());
        const { id: roleId } = await repository.getBasicRole();
        await insertData({ userId: newUser.id, roleId }, UserRoleModels);
        return {
            success: true,
            message: "Successfully created user",
            data: {
                ...newUser,
                __typename: "User"
            }
        };
    } catch (err) {
        rollback.undo();
        return handleMutationError(err, "Error when attempting to create user");
    }
};

export const assignUserRole = async (_root, assignmentData) => {
    try {
        const newAssignment = await insertData(assignmentData, UserRoleModels);
        return {
            success: true,
            message: "Successfully assigned user to role",
            data: {
                ...newAssignment,
                __typename: "UserRole"
            }
        };
    } catch (err) {
        return handleMutationError(err, "Error when attempting to assign user to role");
    }
};
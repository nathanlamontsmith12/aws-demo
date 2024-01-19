import { ROLES } from "../constants.js";
import { insertData } from "../db.js";
import RoleModels from "../models/Role.js";
import { seedRoles } from "./initial-seed-helpers/seedRoles.js";
import UserModels from "../models/User.js";
import { seedUsers } from "./initial-seed-helpers/seedUsers.js";
import UserRoleModels from "../models/UserRole.js";
import PermissionModels from "../models/Permission.js";
import { seedPermissions } from "./initial-seed-helpers/seedPermissions.js";
import RolePermissionModels from "../models/RolePermission.js";
import { seedRolePermissions } from "./initial-seed-helpers/seedRolePermissions.js";
import DocumentSubjectOptionModels from "../models/DocumentSubjectOption.js";
import { seedDocumentSubjectOptions } from "./initial-seed-helpers/seedDocumentSubjectOptions.js";


export const seed = async () => {
    // Insert Seed Roles ::
    const newRoles = await insertData(seedRoles, RoleModels);
    console.log("\nInserted Roles :: ");
    console.log(newRoles);

    // Insert Seed Users ::
    const newUsers = await insertData(seedUsers, UserModels);
    console.log("\nInserted Users :: ");
    console.log(newUsers);

    // Assign Users to (Basic) Role ::
    const basicRoleId = newRoles.find(({ name }) => name === ROLES.basic).id;
    const userRoleAssignmentsToInsert = newUsers.map(({ id }) => ({
        userId: id,
        roleId: basicRoleId
    }));
    await insertData(userRoleAssignmentsToInsert, UserRoleModels);
    console.log("\n--- Assigned Users to BASIC role successfully! --- \n\n");

    // Insert Seed Permissions ::
    const newPermissions = await insertData(seedPermissions, PermissionModels);
    console.log("\nInserted Permissions :: ");
    console.log(newPermissions);

    // Link Permissions to Roles ::
    const rolePermissionsToInsert = seedRolePermissions.map(({ role, permission }) => ({
        roleId: (newRoles.find(({ name }) => name === role).id),
        permissionId: (newPermissions.find(({ name }) => name === permission).id)
    }));
   await insertData(rolePermissionsToInsert, RolePermissionModels);
   console.log("\n--- Inserted Role Permissions successfully! --- \n\n");

    // Insert Document Subject Options ::
    const newDocumentSubjectOptions = await insertData(
        seedDocumentSubjectOptions,
        DocumentSubjectOptionModels
    );
    console.log("\nInserted Document Subject Options :: ");
    console.log(newDocumentSubjectOptions);
};
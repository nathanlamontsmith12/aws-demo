import { ROLES } from "../../constants.js";

export const seedRoles = [
    {
        name: ROLES.owner,
        description: "Admin privileges"
    },
    {
        name: ROLES.assistant,
        description: "Delegate of owner, with some responsibilities and permissions of same"
    },
    {
        name: ROLES.basic,
        description: "User who has registered an account in the application"
    }
];
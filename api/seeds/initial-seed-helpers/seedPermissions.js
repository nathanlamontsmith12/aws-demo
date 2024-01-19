import { PERMISSIONS } from "../../constants.js";

export const seedPermissions = [
    {
        name: PERMISSIONS.createCase,
        description: "Ability to create a new case"
    }, {
        name: PERMISSIONS.createCaseCategory,
        description: "Ability to create a new case category"
    },
    {
        name: PERMISSIONS.createDocument,
        description: "Ability to create a new document"
    },
    {
        name: PERMISSIONS.createDocumentCategory,
        description: "Ability to create a new document category"
    },
    {
        name: PERMISSIONS.createEvent,
        description: "Ability to create a new event"
    },
    {
        name: PERMISSIONS.createEventCategory,
        description: "Ability to create a new event category"
    },
    {
        name: PERMISSIONS.createEventData,
        description: "Ability to create new event data"
    },
    {
        name: PERMISSIONS.createEventDataCategory,
        description: "Ability to create new category for event data"
    },
    {
        name: PERMISSIONS.createRole,
        description: "Ability to create new role"
    },
    {
        name: PERMISSIONS.createUser,
        description: "Ability to create new user"
    }
];
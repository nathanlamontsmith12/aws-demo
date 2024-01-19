export const THRU_TABLE_NAMES = [
    "roles_permissions",
    "users_roles"
];

export const CORE_TABLE_NAMES = [
    "cases",
    "case_categories",
    "document_categories",
    "event_categories",
    "event_data_categories",
    "documents",
    "document_subject_options",
    "event_data",
    "events",
    "nodes",
    "permissions",
    "roles",
    "users"
];

export const ALL_TABLE_NAMES = [
    ...THRU_TABLE_NAMES,
    ...CORE_TABLE_NAMES
];

export const DOCUMENT_SUBJECT_OPTIONS = {
    case: {
        name: "Case Documents",
        tablename: "cases",
        typename: "Case",
        description: "Documents regarding cases"
    },
    event: {
        name: "Event Documents",
        tablename: "events",
        typename: "Event",
        description: "Documents regarding events"
    },
    user: {
        name: "User Documents",
        tablename: "users",
        typename: "User",
        description: "Documents regarding a user"
    }
};

export const LOOKUP_SUBJECT_TABLENAME_BY_DOCUMENT_CATEGORY = {
    "Case Documents": "cases",
    "Event Documents": "events",
    "User Documents": "users"
};

export const DOCUMENT_UPLOAD_STATUSES = {
    uploading: "Uploading",
    uploaded: "Uploaded",
    error: "Error"
};

export const PERMISSIONS = {
    createCase: "CREATE_CASE",
    createCaseCategory: "CREATE_CASE_CATEGORY",
    createDocument: "CREATE_DOCUMENT",
    createDocumentCategory: "CREATE_DOCUMENT_CATEGORY",
    createEvent: "CREATE_EVENT",
    createEventCategory: "CREATE_EVENT_CATEGORY",
    createEventData: "CREATE_EVENT_DATA",
    createEventDataCategory: "CREATE_EVENT_DATA_CATEGORY",
    createRole: "CREATE_ROLE",
    createUser: "CREATE_USER"
};

export const ROLES = {
    owner: "OWNER",
    assistant: "ASSISTANT",
    basic: "BASIC"
};
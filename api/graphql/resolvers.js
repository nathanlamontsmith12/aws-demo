import { dateScalar } from "./scalars/date.js";
import { eventDataScalar } from "./scalars/eventData.js";
import {
    createUser
} from "./mutations/userMutations.js";
import { UserTypeResolver } from "./types/UserResolver.js";
import { RoleTypeResolver } from "./types/RoleResolvers.js";
import { PermissionTypeResolver } from "./types/PermissionResolver.js";
import { EventDataTypeResolver } from "./types/EventDataResolver.js";
import { EventTypeResolver } from "./types/EventResolver.js";
import { DocumentSubjectOptionTypeResolver } from "./types/DocumentSubjectOptionResolver.js";
import { DocumentTypeResolver } from "./types/DocumentResolver.js";
import { EventDataCategoryTypeResolver } from "./types/EventDataCategoryResolver.js";
import { EventCategoryTypeResolver } from "./types/EventCategoryResolver.js";
import { DocumentCategoryTypeResolver } from "./types/DocumentCategoryResolver.js";
import { CaseCategoryTypeResolver } from "./types/CaseCategoryResolver.js";
import { CaseTypeResolver } from "./types/CaseResolver.js";


export const resolvers = {
    Date: dateScalar,
    EventDataJSON: eventDataScalar,
    DocumentSubject: {
        __resolveType: ({ __typename }) => __typename
    },
    Node: {
        __resolveType: ({ __typename }) => __typename
    },
    Case: CaseTypeResolver,
    CaseCategory: CaseCategoryTypeResolver,
    Document: DocumentTypeResolver,
    DocumentCategory: DocumentCategoryTypeResolver,
    DocumentSubjectOption: DocumentSubjectOptionTypeResolver,
    Event: EventTypeResolver,
    EventCategory: EventCategoryTypeResolver,
    EventData: EventDataTypeResolver,
    EventDataCategory: EventDataCategoryTypeResolver,
    Permission: PermissionTypeResolver,
    Role: RoleTypeResolver,
    User: UserTypeResolver,
    Query: {
        case: (_root, { id }, { db }) => db("cases").where({ id }).first(),
        cases: (_root, _variables, { db }) => db("cases"),
        caseCategory: (_root, { id }, { db }) => db("case_categories").where({ id }).first(),
        caseCategories: (_root, _variables, { db }) => db("case_categories"),
        document: (_root, { id }, { db }) => db("documents").where({ id }).first(),
        documents: (_root, _variables, { db }) => db("documents"),
        documentCategory: (_root, { id }, { db }) => db("document_categories").where({ id }).first(),
        documentCategories: (_root, _variables, { db }) => db("document_categories"),
        documentSubjectOption: (_root, { id }, { db }) => db("document_subject_options").where({ id }).first(),
        documentSubjectOptions: (_root, _variables, { db }) => db("document_subject_options"),
        event: (_root, { id }, { db }) => db("events").where({ id }).first(),
        events: (_root, _variables, { db }) => db("events"),
        eventCategory: (_root, { id }, { db }) => db("event_categories").where({ id }).first(),
        eventCategories: (_root, _variables, { db }) => db("event_categories"),
        eventDatum: (_root, { id }, { db }) => db("event_data").where({ id }).first(),
        eventData: (_root, _variables, { db }) => db("event_data"),
        eventDataCategory: (_root, { id }, { db }) => db("event_data_categories").where({ id }).first(),
        eventDataCategories: (_root, _variables, { db }) => db("event_data_categories"),
        permission: (_root, { id }, { db }) => db("permissions").where({ id }).first(),
        permissions: (_root, _variables, { db }) => db("permissions"),
        role: (_root, { id }, { db }) => db("roles").where({ id }).first(),
        roles: (_root, _variables, { db }) => db("roles"),
        user: (_root, { id }, { db }) => db("users").where({ id }).first(),
        users: (_root, _variables, { db }) => db("users")
    },
    Mutation: {
        createUser
    }
};
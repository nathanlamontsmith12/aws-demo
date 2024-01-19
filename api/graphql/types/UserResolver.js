import {
    userRoles,
    documentsBySubjectId,
    userPermissions,
    userDocuments,
    userCases
} from "../batchLoaders.js";

export const UserTypeResolver = {
    id: ({ id }) => id,
    firstName: ({ first_name }) => first_name,
    lastName: ({ last_name }) => last_name,
    email: ({ email }) => email,
    phone: ({ phone }) => phone,
    roles: ({ id: userId }) => userId ? userRoles.load(userId) : [],
    documents: ({ id: subjectId }) => subjectId ? documentsBySubjectId.load(subjectId) : [],
    permissions: ({ id: userId }) => userId ? userPermissions.load(userId) : [],
    uploads: ({ id: userId }) => userId ? userDocuments.load(userId) : [],
    cases: ({ id: userId }) => userId ? userCases.load(userId) : [],
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
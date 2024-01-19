export const DocumentSubjectOptionTypeResolver = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    typename: ({ subject_typename }) => subject_typename,
    tablename: ({ subject_tablename }) => subject_tablename,
    description: ({ description }) => description,
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
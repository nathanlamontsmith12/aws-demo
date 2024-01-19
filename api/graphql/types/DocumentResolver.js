export const DocumentTypeResolver = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    size: ({ size }) => size,
    uploadStatus: ({ upload_status }) => upload_status,
    dqFlag: ({ dq_flag }) => dq_flag,
    dqStatus: ({ dq_status }) => dq_status,
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
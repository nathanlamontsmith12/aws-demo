import {
    documentCategoryLoader,
    documentSubjectOption,
    caseLoader,
    eventLoader,
    userLoader
} from "../batchLoaders.js";

const loadDocumentSubject = async (optionId, subjectId) => {
    const subjectData = await documentSubjectOption.load(optionId);
    if (!subjectData) {
        return null;
    } else {
        const __typename = subjectData.subject_typename;
        let subject;
        if (__typename === "Case") {
            subject = await caseLoader.load(subjectId);
        } else if (__typename === "Event") {
            subject = await eventLoader.load(subjectId);
        } else if (__typename === "User") {
            subject = await userLoader.load(subjectId);
        }
        return subject ? { ...subject, __typename } : null;
    }
};

export const DocumentTypeResolver = {
    id: ({ id }) => id,
    author: ({ user_id: userId }) => userId ? userLoader.load(userId) : null,
    subject: ({
        document_subject_option_id: optionId,
        node_id: subjectId
    }) => optionId && subjectId ? loadDocumentSubject(optionId, subjectId) : null,
    category: ({ document_category_id: documentCategoryId }) => documentCategoryId ?
        documentCategoryLoader.load(documentCategoryId)
        : null,
    name: ({ name }) => name,
    size: ({ size }) => size,
    uploadStatus: ({ upload_status }) => upload_status,
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};
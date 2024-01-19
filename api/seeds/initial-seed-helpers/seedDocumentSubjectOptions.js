import { DOCUMENT_SUBJECT_OPTIONS } from "../../constants.js";

export const seedDocumentSubjectOptions = Object.values(
    DOCUMENT_SUBJECT_OPTIONS
).map((option) => ({
    subjectTablename: option.tablename,
    subjectTypename: option.typename,
    ...option
}));
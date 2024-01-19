import { z } from "zod";
import { DOCUMENT_SUBJECT_OPTIONS } from "../constants.js";
import { assembleModel } from "./_model-helpers.js";

const {
    typenames,
    tablenames
} = Object.values(DOCUMENT_SUBJECT_OPTIONS).reduce((obj, { typename, tablename }) => {
    obj.typenames.push(typename);
    obj.tablenames.push(tablename);
    return obj;
}, {
    typenames: [],
    tablenames: []
});

const DocumentSubjectOptionSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    subjectTypename: z.enum(typenames),
    subjectTablename: z.enum(tablenames),
    description: z.string()
});

const AbstractDocumentSubjectOption = (data) => {
    DocumentSubjectOptionSchema.parse(data);
    return {
        id: data.id,
        name: data.name,
        subject_typename: data.subjectTypename,
        subject_tablename: data.subjectTablename,
        description: data.description
    };
};

export const DocumentSubjectOption = assembleModel(
    "document_subject_options",
    AbstractDocumentSubjectOption
);

export const DocumentSubjectOptions = assembleModel(
    "document_subject_options",
    AbstractDocumentSubjectOption,
    true
);

export default [DocumentSubjectOption, DocumentSubjectOptions];
import { gql } from "@apollo/client";
import { createMutationHandler } from "./create-mutation-handler/index.js";


const UPLOAD_MUTATION = gql`
    mutation (
        $file: Upload!
        $name: String!
        $size: Int!
        $dqFlag: Boolean 
    ) {
        createDocument (
            file: $file
            name: $name 
            size: $size 
            dqFlag: $dqFlag
        ) {
            success,
            message
        }
    }
`;

const isValidUpload = ({ name, size, file }) => {
    const isValidName = Boolean(name) && typeof name === "string";
    const isValidSize = Number.isSafeInteger(size);
    const isValidFile = file instanceof File;
    return isValidName && isValidSize && isValidFile;
};

export const useUpload = createMutationHandler({
    name: "createDocument",
    definition: UPLOAD_MUTATION,
    validator: isValidUpload
});
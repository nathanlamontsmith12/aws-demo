import { validate } from "uuid";
import { Node, Nodes } from "./Node.js";

export const validateId = (id) => {
    if (!validate(id)) {
        throw new Error(`Invalid uuid :: ${id}`);
    } else {
        return true;
    }
};

export const assembleModel = (
    tablename,
    modelFn,
    multiple = false
) => {
    return (data) => {
        return [
            multiple ? Nodes(data) : Node(data),
            {
                table: tablename,
                rows: multiple ? data.map(modelFn) : [modelFn(data)]
            }
        ];
    };
};
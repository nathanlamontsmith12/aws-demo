import { GraphQLScalarType, Kind } from "graphql";

export const eventDataScalar = new GraphQLScalarType({
    name: "EventDataJSON",
    description: "Custom scalar type for arbitrary data associated with an Event",
    serialize(value) {
        return JSON.stringify(value);
    },
    parseValue(value) {
        return JSON.parse(value);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return JSON.parse(ast.value);
        } else {
            return null;
        }
    }
});
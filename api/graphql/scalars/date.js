import { GraphQLScalarType, Kind } from "graphql";

export const dateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Custom scalar type for dates",
    serialize(value) {
        return value.getTime();
    },
    parseValue(value) {
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10));
        } else {
            return null;
        }
    }
});
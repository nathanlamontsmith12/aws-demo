import { validateId } from "./_model-helpers.js";

const AbstractNode = ({ id }) => {
    validateId(id);
    return { id };
};

export const Node = (data) => ({
    table: "nodes",
    rows: [AbstractNode(data)]
});

export const Nodes = (nodes) => ({
    table: "nodes",
    rows: nodes.map(AbstractNode)
});

export default [Node, Nodes];
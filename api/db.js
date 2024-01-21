import Knex from "knex";
import { v4 as uuid } from "uuid";
import config from "./knexfile.js";

export const knex = Knex(config);

export const insertData = async (input, models) => {
    const [ Single, Multiple ] = models;
    const singleInsertion = !Array.isArray(input);
    const data = singleInsertion
        ? Single({ id: uuid(), ...input })
        : Multiple(input.map(data => ({ id: uuid(), ...data })));
    const dataArray = Array.isArray(data) ? data : [data];
    const insertions = [];
    for (let i = 0; i < dataArray.length; i++) {
        const { table, rows } = dataArray[i];
        const insertionInArray = await knex(table).insert(rows).returning("*");
        if (table !== "nodes") {
            insertions.push({ table, rows: insertionInArray });
        }
    }
    return singleInsertion ? insertions[0] : insertions;
};
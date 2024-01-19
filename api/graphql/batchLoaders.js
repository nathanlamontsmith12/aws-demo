import { knex } from "../db.js";
import Dataloader from "dataloader";

const biject = (ids, rows) => {
    const lookup = rows.reduce((obj, row) => {
        const value = row.id;
        if (value in obj) {
            obj[value] = row;
        }
        return obj;
    }, {});
    return ids.map(id => lookup[id]);
};

const assembleLoader = (pqThunk, key = "id") => {
    const batchFn = async (ids) => {
        const rows = await pqThunk().whereIn(key, ids);
        return biject(ids, rows, key);
    };
    return new Dataloader(batchFn);
};

export const documentLoader = assembleLoader(() => knex("documents"));

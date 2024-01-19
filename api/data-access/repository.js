import { knex } from "../db.js";

export const repository = {
    getBasicRole: () => {
        return knex("roles").where("name", "BASIC").first();
    }
};
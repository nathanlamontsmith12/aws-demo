import { knex } from "../db.js";
import { CORE_TABLE_NAMES } from "../constants.js";

const ON_UPDATE_SET_UPDATED_AT = `
    CREATE OR REPLACE FUNCTION on_update_timestamp()
    RETURNS trigger AS $$
    BEGIN
        NEW.updated_at = now();
        RETURN NEW;
    END;
$$ language 'plpgsql';
`;

export const up = async () => {
    await knex.raw(ON_UPDATE_SET_UPDATED_AT);
    for (let i = 0; i < CORE_TABLE_NAMES.length; i++) {
        const table = CORE_TABLE_NAMES[i];
        await knex.raw(`
            CREATE TRIGGER ${table}_updated_at
            BEFORE UPDATE ON ${table}
            FOR EACH ROW
            EXECUTE PROCEDURE on_update_timestamp();
        `);
    }
};

export const down = async () => {
    for (let i = 0; i < CORE_TABLE_NAMES.length; i++) {
        const table = CORE_TABLE_NAMES[i];
        await knex.raw(`DROP TRIGGER ${table}_updated_at ON ${table}`);
    }
    await knex.raw("DROP FUNCTION on_update_timestamp");
};

export default {
    up,
    down
};
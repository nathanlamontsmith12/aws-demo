import dotenv from "dotenv";

dotenv.config();

const customLogger = (message) => {
    const date = new Date();
    console.log(`${date} :: ${message}`);
};

export default {
    client: "postgresql",
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    pool: {
        min: 0,
        max: 7
    },
    seeds: {
        directory: "./seeds",
        loadExtensions: [".mjs"]
    },
    migrations: {
        directory: "./migrations",
        loadExtensions: [".mjs"]
    },
    log: customLogger
};
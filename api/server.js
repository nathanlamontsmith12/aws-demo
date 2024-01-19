// first -- add environment variables ::
import dotenv from "dotenv";

// rest of the imports ::
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { insertData, knex } from "./db.js";

dotenv.config();

const { json } = bodyParser;

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
const corsOptions = {
    origin: "http://127.0.0.1:5173",
    optionsSuccessStatus: 200,
    credentials: true
};

await server.start();

app.use(
    "/graphql",
    cors(corsOptions),
    json(),
    expressMiddleware(server, {
        context: async ({ req }) => ({
            token: req.headers.token,
            db: knex,
            insertData
        })
    })
);

httpServer.listen({ port: 4000 }, () => {
    const date = new Date();
    console.log(`${date} :: nthtake api is running on port 4000`);
});
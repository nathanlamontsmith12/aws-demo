import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { insertData, knex } from "./db.js";
import { ONE_GB } from "./constants.js";

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
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true
};

await server.start();

app.use(
    "/graphql",
    cors(corsOptions),
    graphqlUploadExpress({ maxFiles: 1, maxFileSize: ONE_GB }),
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
    console.log(`${date} :: AWS DEMO api is running on port 4000`);
});
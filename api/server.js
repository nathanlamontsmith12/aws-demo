import dotenv from "dotenv";
dotenv.config();

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
import { DATA_QUALITY_STATUSES, ONE_GB } from "./constants.js";
import { imprisonFile, promoteFile, updateDocumentDQStatus, updateDocumentOnError, updateDocumentOnUpload } from "./file-storage/index.js";

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


// Endpoints To be hit by AWS Lambda Functions Triggered by S3 uploads :: 
app.use(
    "/document-upload-complete/:documentId/:verdict",
    async (req, res) => {
        try {
            const verdict = req.params.verdict;
            const documentId = req.params.documentId;
            console.log("\n\nReceiving notification :: document upload complete :: ", req.params.documentId);
            console.log(" -- Result :: ", verdict);

            if (verdict === "error") {
                await updateDocumentOnError(documentId);
            } else if (verdict === "innocent") {
                await promoteFile(documentId);
            } else {
                await imprisonFile(documentId);
            }

            res.status(200).send("Complete");
        } catch (err) {
            console.log(err);
            res.status(400).send("Error");
        }
    }
);

app.use(
    "/document-ready/:documentId",
    async (req, res) => {
        const documentId = req.params.documentId;
        console.log("\n\nReceiving notification :: document promoted :: ", documentId);
        await updateDocumentOnUpload(documentId);
        res.status(200).send("Complete");
    }
);

app.use(
    "/data-quality-result/:documentId/:result",
    async (req, res) => {
        const result = req.params.result;
        const documentId = req.params.documentId;

        console.log("\n\nReceiving notification :: data quality finished :: ", documentId);
        console.log(" -- Result :: ", result);

        let dqStatus;
        if (result === "error") {
            dqStatus = DATA_QUALITY_STATUSES.error;
        } else if (result === "pass") {
            dqStatus = DATA_QUALITY_STATUSES.success;
        } else {
            dqStatus = DATA_QUALITY_STATUSES.failed;
        }

        await updateDocumentDQStatus(documentId, dqStatus);
        res.status(200).send("Complete");
    }
);

httpServer.listen({ port: process.env.SERVER_PORT }, () => {
    const date = new Date();
    console.log(`${date} :: AWS DEMO api is running on port ${process.env.SERVER_PORT}`);
});
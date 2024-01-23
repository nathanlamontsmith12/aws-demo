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
import { ONE_GB } from "./constants.js";
import { insertData, knex } from "./db.js";

// non-graphql endpoints :: 
import { DOWNLOAD_FILE_ENDPOINT, downloadFileHandler } from "./endpoint-handlers/downloadFile.js";
import { UPLOAD_COMPLETE_ENDPOINT, uploadCompleteHandler } from "./endpoint-handlers/uploadComplete.js";
import { DOCUMENT_PROMOTED_ENDPOINT, documentPromotedHandler } from "./endpoint-handlers/documentPromoted.js";
import { DATA_QUALITY_ENDPOINT, dataQualityHandler } from "./endpoint-handlers/dataQuality.js";


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

// Consumed by frontend (use cors!) :: 
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

app.use(
    DOWNLOAD_FILE_ENDPOINT,
    cors(corsOptions),
    downloadFileHandler
);



// Endpoints To be hit by AWS Lambda Functions (triggered by s3 uploads; no cors) :: 
app.use(
    UPLOAD_COMPLETE_ENDPOINT,
    uploadCompleteHandler
);

app.use(
    DOCUMENT_PROMOTED_ENDPOINT,
    documentPromotedHandler
);

app.use(
    DATA_QUALITY_ENDPOINT,
    dataQualityHandler
);


httpServer.listen({ port: process.env.SERVER_PORT }, () => {
    const date = new Date();
    console.log(`${date} :: AWS DEMO api is running on port ${process.env.SERVER_PORT}`);
});
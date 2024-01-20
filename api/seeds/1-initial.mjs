import { v4 } from "uuid";
import { insertData } from "../db.js";
import DocumentModels from "../models/Document.js";

const makeFakeDocument = ({ name, size }) => {
    return {
        id: v4(),
        name,
        size
    }
};

const seedDocuments = [
    { name: "test doc 1", size: 567 },
    { name: "hello world.txt", size: 12 },
    { name: "another test doc", size: 124122 }    
];

export const seed = async () => {
    console.log("Running seed file to insert initial data into DB...");
    await insertData(seedDocuments.map(makeFakeDocument), DocumentModels);
    console.log("...Seed file finished!");
};
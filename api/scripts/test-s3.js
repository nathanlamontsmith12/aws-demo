import dotenv from "dotenv";
dotenv.config();

import { FileStorage } from "../file-storage/config.js";

(async () => {
    console.log("Testing connection to S3...");
    FileStorage.listBuckets((err, data) => {
        if (err) {
            console.log("ERROR :: ", err);
        } else if (data) {
            console.log("DATA :: ", data);
        }
    });
})();
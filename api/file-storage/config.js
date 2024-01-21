import AWS from "aws-sdk";

export const FileStorage = new AWS.S3({
    httpOptions: {
        timeout: 300000
    },
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION,
    correctClockSkew: true
});
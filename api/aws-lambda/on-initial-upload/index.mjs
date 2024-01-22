import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3();

const isContainedIn = (value, array) => {
    return array.some(item => value === item);
};

const validateFile = (contentType, { mimetype, filetype, filename }) => {
    const validFilenameEndings = ["xls", "xlsx", "csv"];
    const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "text/csv"
    ];
    const validContentTypes = ["application/octet-stream"];
    const filenameArray = filename.split(".");
    const filenameEnding = filenameArray.pop();
    return [
        isContainedIn(mimetype, validTypes),
        isContainedIn(filetype, validTypes),
        isContainedIn(contentType, validContentTypes),
        isContainedIn(filenameEnding, validFilenameEndings)
    ].every(Boolean);
};


export const handler = async (event) => {
    console.log("\n\n Running Lambda 'on-initial-upload :: ");
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: bucket,
        Key: key,
    };

    try {
        const { ContentType, Metadata } = await s3.getObject(params);
        const { mimetype, filetype, filename } = Metadata;
        const documentId = Metadata.document_id;
        const verdict = validateFile(ContentType, { mimetype, filetype, filename }) ? "innocent" : "guilty";
        const fullUrl = `${process.env.API_URL}/${process.env.API_ENDPOINT}/${documentId}/${verdict}`;
        
        /* global fetch */
        await fetch(fullUrl);
    } catch (err) {
        console.log(err);
        const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
};
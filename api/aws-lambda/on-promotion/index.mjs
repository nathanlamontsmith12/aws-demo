import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3();

const uploadDQReport = async (bucket, key, report) => {
    await s3.putObject({ 
        Bucket: bucket,
        Key: `${process.env.DQ_REPORT_FOLDER}/${key}`,
        Body: JSON.stringify(report),
        ContentType: "application/json; charset=utf-8"
    }).promise();
};

const generateFakeReport = (result, filename) => {
    const d = new Date();
    const fakeIssues = result === "pass" ? {} : {
        critical: [
            { type: "Missing Column", col: "Submitter Attestation" } 
        ],
        moderate: [
            { type: "Incorrect Date Format", col: "Due Date" },
            { type: "Incorrect Date Format", col: "Submitted On" },
            { type: "Missing Required Values", col: "Submitter Name" } 
        ], 
        minor: [
            { type: "Sort Order", col: "Submitter Name" }
        ]
    };
    return {
        filename,
        reportGenerated: d.toISOString(),
        result, 
        issues: fakeIssues
    };
};

const fakeDataQualityAnalysis = (filename) => {
    const result = filename.toLowerCase().includes("f")
        ? "fail"
        : "pass";

    return { 
        result, 
        report: generateFakeReport(result, filename) 
    };
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
        const { Metadata } = await s3.getObject(params);
        const dqFlag = Metadata.dq_flag;
        const documentId = Metadata.document_id;
        const filename = Metadata.filename;
        // notify that file has landed in promote bucket and is OK to be downloaded :: 
        await fetch(`${process.env.API_URL}/${process.env.DOCUMENT_PROMOTED_ENDPOINT}/${documentId}`);

        // perform additional data quality checks if flagged for DQ :: 
        if (dqFlag === "true") {
            const { result, report } = fakeDataQualityAnalysis(filename);
            await uploadDQReport(bucket, documentId, report);
            /* global fetch */
            await fetch(`${process.env.API_URL}/${process.env.DATA_QUALITY_ENDPOINT}/${documentId}/${result}`);
        } 
    } catch (err) {
        console.log(err);
        const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
};
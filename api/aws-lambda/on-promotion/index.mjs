import { S3, S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3();

const generateReportName = (filename) => {
    if (!filename || typeof filename !== "string") {
        return "dq-report.json";
    }

    const nameArray = "dq-report-".concat(filename).split(".");
    if (nameArray.length > 1) {
        nameArray.pop();
    }
    nameArray.push("json");
    return nameArray.join(".");
};

const uploadDQReport = async (bucket, key, report, Metadata) => {
    try {
        if (report) { 
            const filename = Metadata?.filename ?? Metadata?.document_name;
            const reportName = generateReportName(filename);

            const client = new S3Client();
            const command = new PutObjectCommand({
                Bucket: bucket,
                Key: `${process.env.DQ_REPORT_FOLDER}/${key}`,
                Body: JSON.stringify(report),
                Metadata: {
                    ...Metadata,
                    document_name: reportName,
                    filename: reportName
                },
                ContentType: "application/json; charset=utf-8"
            });

            const response = await client.send(command);
            console.log("\nReport Name :: ", reportName);
            console.log("\n\nDQ Report Upload Response :: ", response);
            return reportName;
        }
    } catch (err) {
        console.log("ERROR uploading DQ Report :: ");
        console.log(err);
    }
};

const generateFakeReport = (result, filename) => {
    try {
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
    } catch (err) {
        console.log("ERROR running generateFakeReport :: ");
        console.log(err);
        return err;
    }
};

const fakeDataQualityAnalysis = (filename) => {
    try {
        const result = filename.toLowerCase().includes("f")
            ? "fail"
            : "pass";
            
        const reportOrError = generateFakeReport(result, filename);
        if (reportOrError instanceof Error) { 
            throw reportOrError;
        }

        return { 
            result, 
            report: reportOrError  
        };
    } catch (err) {
        return {
            result: "error",
            report: null
        }
    }
};


export const handler = async (event) => {
    console.log("\n\n Running Lambda 'on-promotion :: ");
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
        console.log("Document ID :: ", documentId);
        console.log("Filename :: ", filename);
        console.log("DQ FLAG :: ", dqFlag, typeof dqFlag);
        console.log("\n-- Notifying that file has been promoted and is safe to download --");
        // notify that file has landed in promote bucket and is OK to be downloaded :: 
        await fetch(`${process.env.API_URL}/${process.env.DOCUMENT_PROMOTED_ENDPOINT}/${documentId}`);

        // perform additional data quality checks if flagged for DQ :: 
        if (dqFlag === "true") {
            console.log("\nPerforming Data Quality checks...");
            const { result, report } = fakeDataQualityAnalysis(filename);

            console.log("\nRESULT :: ", result);
            if (result === "fail") {
                console.log("\nREPORT :: ");
                console.log(report);
                console.log("\n\nUploading report...");
                const reportName = await uploadDQReport(bucket, documentId, report, Metadata);

                // include report name as last parameter :: 
                /* global fetch */
                await fetch(`${process.env.API_URL}/${process.env.DATA_QUALITY_ENDPOINT}/${documentId}/${result}/${reportName}`);
            } else {

                // no report name :: 
                /* global fetch */
                await fetch(`${process.env.API_URL}/${process.env.DATA_QUALITY_ENDPOINT}/${documentId}/${result}`);
            }
        } 
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};
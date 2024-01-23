import React from "react";
import { Table } from "antd";
import { PolledValue } from "./PolledValue.jsx";
import { DATA_QUALITY_POLLING_STATUS, UPLOAD_POLLING_STATUS } from "../../constants.js";
import { DownloadButtons } from "./DownloadButtons.jsx";


export const DocumentsTable = ({ documents, loading }) => {
    const columns = [
        {
            title: "Filename",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type"
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size"
        },
        {
            title: "Upload Status",
            dataIndex: "uploadStatus",
            key: "upload-status",
            width: "180px",
            render: (uploadStatus) => {
                return (
                    <PolledValue 
                        value={uploadStatus} 
                        isLoading={uploadStatus === UPLOAD_POLLING_STATUS} 
                    />
                );
            }
        },
        {
            title: "Data Quality Status",
            dataIndex: "dqStatus",
            width: "180px",
            key: "data-quality-status",
            render: (dqStatus, document) => {
                if (!document.dqFlag) {
                    return "N/A";
                } else {
                    return (
                        <PolledValue 
                            value={dqStatus} 
                            isLoading={dqStatus === DATA_QUALITY_POLLING_STATUS} 
                        />
                    );
                }
            }
        },
        {
            title: "Downloads",
            key: "download",
            width: "200px",
            render: (document) => {
                return (
                    <DownloadButtons document={document} />
                );
            }
        }
    ];
    
    return (
        <div style={{ width: "1200px" }}>
            <Table 
                rowKey={"id"}
                loading={loading}
                columns={columns}
                dataSource={documents}
            />
        </div>
    );
};
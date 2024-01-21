import React from "react";
import { Button, Table } from "antd";


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
            key: "upload-status"
        },
        {
            title: "Data Quality Status",
            dataIndex: "dqStatus",
            key: "data-quality-status",
            render: (dqStatus, document) => {
                return document.dqFlag 
                    ? dqStatus
                    : "N/A"
            }
        },
        {
            title: "Action",
            key: "action",
            render: ({ canDownload }) => {
                console.log(canDownload);
                return <Button disabled={!canDownload} >Download</Button>
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
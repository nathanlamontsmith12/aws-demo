import React from "react";
import { Table } from "antd";


export const DocumentsTable = ({ documents, loading }) => {
    const columns = [
        {
            title: "Filename",
            dataIndex: "name",
            key: "name"
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
        }
    ];
    
    return (
        <Table 
            rowKey={"id"}
            loading={loading}
            columns={columns}
            dataSource={documents}
        />
    );
};
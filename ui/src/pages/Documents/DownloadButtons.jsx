import React from "react";
import { Button } from "antd";
import { DownloadOutlined, FileExclamationOutlined } from "@ant-design/icons";
import { DATA_QUALITY_POLLING_STATUS, UPLOAD_POLLING_STATUS } from "../../constants.js";

const FILE_BUTTON_WIDTH = "70px";
const DQ_REPORT_BUTTON_WIDTH = "70px";

export const DownloadButtons = ({ document }) => {
    const fileDisabled = document?.canDownload !== true;
    const fileLoading = document?.uploadStatus === UPLOAD_POLLING_STATUS;

    const renderDQButton = document?.dqFlag === true && 
        (document?.hasReport || document?.dqStatus === DATA_QUALITY_POLLING_STATUS);

    const dqDisabled = fileDisabled || document?.hasReport !== true;
    const dqLoading = document?.dqStatus === DATA_QUALITY_POLLING_STATUS;

    
    return (
        <div className="flex-row-between">
            <Button 
                className="flex-center"
                disabled={fileDisabled} 
                loading={fileLoading}
                icon={<DownloadOutlined />}
                style={{ width: FILE_BUTTON_WIDTH }}
            >
                File
            </Button>
            { renderDQButton !== true ? null : <Button
                className="flex-center"
                disabled={dqDisabled} 
                loading={dqLoading}
                icon={<FileExclamationOutlined />}
                style={{ width: DQ_REPORT_BUTTON_WIDTH }}
            >
                DQ 
            </Button> }
        </div>
    );
};
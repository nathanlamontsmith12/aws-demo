import React from "react";
import { Upload } from "antd";
import { Spacer } from "../Spacer/index.jsx";
import { FileTwoTone } from "@ant-design/icons";

const { Dragger } = Upload;


const ClickOrDrag = () => {
    return (
        <span className="medium-text">Click or Drag File </span>
    );
};

const FileDisplay = ({ filename }) => { 
    return (
        <div>
            <div><FileTwoTone style={{ fontSize: "24px" }} /></div>
            <div className="medium-text"> { filename } </div>
        </div> 
    );
};


export const UploadDragger = ({ 
    setNewDocument, 
    newDocument 
}) => {
    const filename = newDocument?.name;

    return (
        <Dragger
            name="file"
            multiple={false}
            customRequest={() => {
                // To stop default xhr request  
            }}
            showUploadList={false}
            maxCount={1}
            onChange={({ file }) => {
                setNewDocument({ 
                    ...file, 
                    file: file.originFileObj 
                });
            }}
        >
            <Spacer className="flex-center" height={"80px"}> 
                { filename 
                    ? <FileDisplay filename={filename} />
                    : <ClickOrDrag />
                } 
            </Spacer>
        </Dragger>
    );
};
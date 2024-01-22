import React, { useEffect } from "react";
import { Switch } from "antd";
import { Spacer } from "../Spacer/index.jsx";
import { VALIDATORS, useValidator } from "../../hooks/useValidator.js";


export const DataQualityToggle = ({ 
    dataQuality, 
    setDataQuality, 
    filetype, 
    disabledMessage
}) => {
    const validateFileType = useValidator(VALIDATORS.dataQualityFileTypes);
    const isValidFileType = validateFileType(filetype);
    
    useEffect(() => {
        if (!isValidFileType && dataQuality) {
            setDataQuality(false);
        }
    }, [isValidFileType]);

    const disableToggle = isValidFileType !== true;

    return (
        <Spacer margin={{ top: "20px" }}>
            <div>
                <div>Data Quality</div>
                <Spacer 
                    className="flex-row-between" 
                    width="80px"
                    margin={{ top: "5px" }}
                >
                    <Switch 
                        checked={dataQuality}
                        onChange={setDataQuality}
                        disabled={disableToggle}
                    />
                    <span 
                        style={{ color: dataQuality ? "green" : "red" }}
                    > 
                        {dataQuality ? "ON" : "OFF" }
                    </span>
                </Spacer>
                { disabledMessage && typeof disabledMessage === "string"
                    ? <Spacer height={"16px"} margin={{ top: "5px" }}>
                        <span> { disableToggle ? disabledMessage : "" } </span>
                    </Spacer> 
                    : null 
                }
            </div>
        </Spacer>
    );
};
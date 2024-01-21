import React from "react";
import { Switch } from "antd";
import { Spacer } from "../Spacer/index.jsx";

export const DataQualityToggle = ({ dataQuality, setDataQuality }) => {
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
                    />
                    <span 
                        style={{ color: dataQuality ? "green" : "red" }}
                    > 
                        {dataQuality ? "ON" : "OFF" }
                    </span>
                </Spacer>
            </div>
        </Spacer>
    );
};
import React from "react";

export const Logo = () => {
    return (
        <div
            style={{
                position: "absolute",
                width: "200px",
                height: "64px",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <h1 className="big-text">DEMO</h1>
        </div>
    );
};
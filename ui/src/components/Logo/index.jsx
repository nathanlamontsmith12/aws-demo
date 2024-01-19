import React from "react";
import { hideNavElements } from "../../hooks/hideNavElements";

export const Logo = () => {
    const hideLogo = hideNavElements();
    return (
        hideLogo
            ? null
            : <div
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
                <h1>LOGO</h1>
            </div>
        );
};
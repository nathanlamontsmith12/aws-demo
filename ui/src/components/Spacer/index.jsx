import React from "react";
import { coalesce } from "../../functions/coalesce.js";

export const Spacer = ({ 
    margin = {}, 
    padding = {}, 
    height,
    width,
    className,
    children 
}) => {
    const { top: mT, bottom: mB, left: mL, right: mR } = margin;
    const { top: pT, bottom: pB, left: pL, right: pR } = padding;
    const styleToUse = {
        marginTop: coalesce(mT, 0),
        marginBottom: coalesce(mB, 0),
        marginLeft: coalesce(mL, 0),
        marginRight: coalesce(mR, 0),
        paddingTop: coalesce(pT, 0),
        paddingBottom: coalesce(pB, 0),
        paddingLeft: coalesce(pL, 0),
        paddingRight: coalesce(pR, 0)
    };
    if (height) {
        styleToUse.height = height;
    }
    if (width) {
        styleToUse.width = width;
    }
    return (
        <div className={className} style={styleToUse}>
            { children }
        </div>
    );
};
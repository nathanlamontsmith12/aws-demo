import { useContext } from "react";
import { ReactEnumsContext } from "../context/enums.jsx";

export const VALIDATORS = {
    dataQualityFileTypes: "dataQualityFileTypes"
};

export const useValidator = (type) => {
    const enums = useContext(ReactEnumsContext);
    return (valueOrValues) => {
        try {
            const validValues = enums[type];
            const valuesToTest = Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
            return Array.isArray(validValues) 
                ? valuesToTest.length > 0 && valuesToTest.every(value => validValues.includes(value))
                : false;
        } catch (err) {
            return false;
        }
    };
};
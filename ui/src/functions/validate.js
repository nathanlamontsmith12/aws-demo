export const validate = (valueOrArray, validValues) => {
    if (!Array.isArray(validValues)) {
        return false;
    } else {
        const valuesToTest = Array.isArray(valueOrArray) ? valueOrArray : [valueOrArray];
        return valuesToTest.length > 0 && valuesToTest.every(value => validValues.includes(value));
    }
};
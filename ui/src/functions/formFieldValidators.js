const isString = (str) => typeof str === "string";

const noWhitespace = (str) => isString(str) && str.split("").every(char => char !== " ");

export const constructValidator = (test, message) => {
    return (value) => {
        if (!test(value)) {
            return Promise.reject(new Error(message));
        } else {
            return Promise.resolve();
        }
    };
};

export const constructValidators = (rules) => {
    return (value) => {
        for (let i = 0; i < rules.length; i++) {
            const { test, message } = rules[0];
            if (!test(value)) {
                return Promise.reject(new Error(message));
            }
        }
        return Promise.resolve();
    };
};

export const makeNoWhitespaceValidator = (message) => () => {
    const defaultMessage = "Spaces are not allowed";
    const messageToUse = message ? message : defaultMessage;
    return {
        validator(_, value) {
            const customValidator = constructValidator(noWhitespace, messageToUse);
            return customValidator(value);
        }
    };
};
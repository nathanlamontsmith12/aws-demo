import { useMutation } from "@apollo/client";
import { useNote } from "../../hooks/useNote.js";

const DEFAULT_ERROR_MESSAGE = "A technical error occurred";
const DEFAULT_SUCCESS_MESSAGE = "Success";
const DEFAULT_FAILURE_MESSAGE = "Something went wrong";
const DEFAULT_VALIDATOR_MESSAGE = "Invalid input";


const determineNote = (fromOption, fromResult, defaultValue) => {
    if (fromOption === true) {
        return fromResult && typeof fromResult === "string" 
            ? fromResult 
            : defaultValue;
    } else if (typeof fromOption === "string") {
        return fromOption;
    } else {
        return defaultValue;
    }
};

const handleInputValidation = ({ 
    input, 
    validator, 
    options, 
    pinUpNote 
}) => {
    const { validatorMessage } = options;
    const { variables } = input;
    const validatorResult = validator(variables);
    if (validatorResult === true) {
        return { success: true };
    } else {
        const validatorFailedNote = determineNote(validatorMessage, validatorResult, DEFAULT_VALIDATOR_MESSAGE);
        pinUpNote({ content: validatorFailedNote, type: "error" });
        return {
            success: false,
            message: validatorFailedNote 
        };
    }
    
};

const handleNotes = ({ 
    result, 
    options, 
    pinUpNote 
}) => {
    const { 
        success, 
        message 
    } = result;

    const {
        successMessage,
        failureMessage
    } = options;

    const successNote = determineNote(successMessage, message, DEFAULT_SUCCESS_MESSAGE);
    const failureNote = determineNote(failureMessage, message, DEFAULT_FAILURE_MESSAGE);

    if (success && successMessage) {
        pinUpNote({ content: successNote, type: "success" });
    } else if (!success && failureMessage) {
        pinUpNote({ content: failureNote, type: "warning" });
    }

};


const handleMutation = async ({
    name,
    mutation,
    input,
    validator,
    pinUpNote,
    options
}) => {   
    const { errorMessage } = options;

    try {
        const validatorResult = handleInputValidation({
            input, 
            validator, 
            options, 
            pinUpNote
        });
        
        if (validatorResult.success !== true) {
            return validatorResult;
        }

        const response = await mutation(input);
        const result = response?.data?.[name];
        
        handleNotes({
            result, 
            options,
            pinUpNote
        });

        return result;
    } catch (err) {
        const errorNote = determineNote(errorMessage, null, DEFAULT_ERROR_MESSAGE);
        pinUpNote({ content: errorNote, type: "error" });
    }
};

export const createMutationHandler = ({
    name,
    definition,
    validator 
}) => {
    if (!name || typeof name !== "string" || !definition) {
        throw new Error("Improper Values Passed to 'createMutationHandler'");
    }
    return (genericHandlerOptions = {}) => {
        const [mutation, results] = useMutation(definition);
        const [pinUpNote] = useNote();
        return [
            (input, specificHandlerOptions = {}) => {
                return handleMutation({
                    name,
                    mutation,
                    input,
                    options: {
                        ...genericHandlerOptions,
                        ...specificHandlerOptions
                    },
                    pinUpNote,
                    validator
                });
            },
            results,
            validator  
        ];
    };
};
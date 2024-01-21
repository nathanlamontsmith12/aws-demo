export const handleMutationError = (error, message) => {
    const isZodError = Array.isArray(error?.issues);
    if (isZodError) {
        console.log(error.issues);
    } else {
        console.log(error);
    }
    return {
        success: false,
        error: message
    };
};
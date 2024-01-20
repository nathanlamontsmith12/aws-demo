export const coalesce = (...args) => {
    const nonNullishValue = args.find(item => item !== null && item !== undefined);
    return nonNullishValue ?? null;
};
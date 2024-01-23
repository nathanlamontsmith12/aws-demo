

export const execute = (cb, ...args) => typeof cb === "function" ? cb(...args) : undefined;

export const makeKey = (id, target) => `${target}/${id}`;
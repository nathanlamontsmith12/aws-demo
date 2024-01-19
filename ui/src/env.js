import Config from "./config.json";

export const ENV = Config.ENV;

export const BASE_URL = Config.BASE_URL;

export const IS_LOCAL = Config.ENV === "development";
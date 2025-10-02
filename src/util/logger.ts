import { logger as l } from "react-native-logs";

export const appLogger = l.createLogger();
export const authLogger = appLogger.extend("AUTH");

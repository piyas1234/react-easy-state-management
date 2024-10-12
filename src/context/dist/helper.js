"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPromise = exports.contextCreator = void 0;
const react_1 = require("react");
const contextCreator = (contextNames) => {
    try {
        const result = contextNames.map((context) => {
            const setContext = context.context || (0, react_1.createContext)(context.initialValue);
            setContext.displayName = context.contextName;
            return {
                ...context,
                context: setContext
            };
        });
        return result;
    }
    catch (error) {
        console.error("Error in contextCreator:", error);
        return [];
    }
};
exports.contextCreator = contextCreator;
function isPromise(obj) {
    return obj instanceof Promise;
}
exports.isPromise = isPromise;

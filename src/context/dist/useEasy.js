"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const index_1 = require("./index");
function useEasy(contextName, Initialize) {
    const contextListState = (0, react_1.useContext)(index_1.globalContext);
    const contextData = () => {
        if (typeof contextName === "string") {
            const matchingContext = contextListState?.find((val) => val.contextName === contextName);
            if (!matchingContext) {
                throw new Error(`Context with name '${contextName}' not found.`);
            }
            return matchingContext.context;
        }
        else if (typeof contextName === "object") {
            return contextName;
        }
        else {
            throw new Error("Invalid context parameter.");
        }
    };
    const { state, dispatch } = (0, react_1.useContext)(contextData());
    const setState = (data) => {
        if (typeof data === "object") {
            setTimeout(() => {
                dispatch({
                    type: "useEasy",
                    payload: data,
                });
            }, 1);
        }
        else {
            throw new Error("Data type should be object");
        }
    };
    const showLoader = (0, react_1.useCallback)(async (callback) => {
        dispatch({
            type: "loading",
            payload: true,
        });
        try {
            const response = await callback();
            return response;
        }
        finally {
            dispatch({
                type: "loading",
                payload: false,
            });
        }
    }, []);
    return [{ ...Initialize, ...state }, setState, showLoader];
}
exports.default = useEasy;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const index_1 = require("./index");
const offlineFunction_1 = require("./offlineFunction");
function useEasyOffline(contextName, Initialize) {
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
            Object.keys(data).map((key) => {
                (0, offlineFunction_1.storeData)(contextName + "," + key, data?.[key]);
            });
            setTimeout(() => {
                dispatch({
                    type: "useEasyOffline",
                    payload: data
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
            payload: true
        });
        try {
            const response = await callback();
            return response;
        }
        finally {
            dispatch({
                type: "loading",
                payload: false
            });
        }
    }, []);
    const keysState = Object.keys(state);
    // Define the type of modifiedState properly to allow dynamic keys
    const modifiedState = {};
    keysState.forEach((key) => {
        const keysArray = key.split(",");
        if (keysArray[1] !== undefined && keysArray.length != 1) {
            modifiedState[keysArray[1]] = state[key];
        }
        else {
            modifiedState[keysArray[0]] = state[key];
        }
    });
    return [{ ...Initialize, ...modifiedState }, setState, showLoader];
}
exports.default = useEasyOffline;

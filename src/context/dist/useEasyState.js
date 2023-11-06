"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const index_1 = require("./index");
function useEasyState(contextName) {
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
    }, [dispatch]);
    return [state, dispatch, showLoader];
}
exports.default = useEasyState;

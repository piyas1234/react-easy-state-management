"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useEasyState(context) {
    const { state, dispatch } = (0, react_1.useContext)(context);
    return [state, dispatch];
}
exports.default = useEasyState;

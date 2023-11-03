"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEasyState = exports.Provider = void 0;
const react_1 = __importStar(require("react"));
const useEasyState_1 = __importDefault(require("./useEasyState"));
exports.useEasyState = useEasyState_1.default;
const offlineFunction_1 = require("./offlineFunction");
// Define the RenderContext component
function RenderContext({ context, index, children, initialValue }) {
    const reducer = (state, action) => {
        switch (action.type) {
            case action.type === "oflineData":
                return {
                    ...state,
                    ...action.payload,
                };
            case action.type:
                if (action.offline && !action.paging) {
                    (0, offlineFunction_1.storeData)(action.type, action.payload);
                }
                if (action.paging) {
                    return {
                        ...state,
                        [action.type]: [...state[action.type], ...action.payload],
                    };
                }
                return { ...state, [action.type]: action.payload };
            default:
                return state;
        }
    };
    const [state, dispatch] = (0, react_1.useReducer)(reducer, initialValue);
    const getDataFunction = async () => {
        try {
            const promises = Object.keys(state).map(async (key) => {
                const data = await (0, offlineFunction_1.getData)(key);
                return data;
            });
            const response = await Promise.all(promises);
            const obj = {};
            Object.keys(state).map((val) => {
                obj[val] = response[Object.keys(state).indexOf(val) || state[val]];
            });
            dispatch({
                type: "oflineData",
                payload: obj,
                paging: false,
                offline: false,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    (0, react_1.useEffect)(() => {
        getDataFunction();
    }, []);
    // Create a context value object
    const contextValue = {
        state,
        dispatch,
    };
    return (react_1.default.createElement(context.Provider, { key: index, value: contextValue }, children));
}
function Provider(props) {
    const { contextsList } = props;
    // Create a nested structure of RenderContext components
    const renderStructure = (0, react_1.useMemo)(() => contextsList.reduceRight((children, data, index) => (react_1.default.createElement(RenderContext, { context: data.context, initialValue: data.initialValue, key: index }, children)), props.children), [contextsList, props.children]);
    return react_1.default.createElement(react_1.default.Fragment, null, renderStructure);
}
exports.Provider = Provider;

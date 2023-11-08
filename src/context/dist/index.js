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
exports.useEasyOffline = exports.useEasy = exports.useEasyState = exports.Provider = exports.globalContext = void 0;
const react_1 = __importStar(require("react"));
const useEasyState_1 = __importDefault(require("./useEasyState"));
exports.useEasyState = useEasyState_1.default;
const useEasy_1 = __importDefault(require("./useEasy"));
exports.useEasy = useEasy_1.default;
const useEasyOffline_1 = __importDefault(require("./useEasyOffline"));
exports.useEasyOffline = useEasyOffline_1.default;
const offlineFunction_1 = require("./offlineFunction");
const helper_1 = require("./helper");
function RenderContext({ context, index, children, initialValue }) {
    const reducer = (state, action) => {
        switch (action.type) {
            case "offlineData":
                return {
                    ...state,
                    ...action.payload,
                };
            case "useEasy":
                return {
                    ...state,
                    ...action.payload,
                };
            case "useEasyOffline":
                return {
                    ...state,
                    ...action.payload,
                };
            default:
                if (action.offline) {
                    (0, offlineFunction_1.storeData)(action.type, action.payload);
                }
                if (action.paging) {
                    return {
                        ...state,
                        [action.type]: [...state[action.type], ...action.payload],
                    };
                }
                return { ...state, [action.type]: action.payload };
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
                const result = response[Object.keys(state).indexOf(val)];
                obj[val] = result ? result : state[val];
            });
            dispatch({
                type: "offlineData",
                payload: obj,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    (0, react_1.useEffect)(() => {
        getDataFunction();
    }, []);
    const contextValue = {
        state,
        dispatch,
    };
    return react_1.default.createElement(context.Provider, { value: contextValue }, children);
}
exports.globalContext = (0, react_1.createContext)(undefined);
function Provider(props) {
    const { contextsList } = props;
    const contextList = (0, helper_1.contextCreator)(contextsList);
    const renderStructure = (0, react_1.useMemo)(() => contextList.reduceRight((children, data, index) => (react_1.default.createElement(RenderContext, { context: data.context, initialValue: data.initialValue, key: index }, children)), props.children), [contextList, props.children]);
    return (react_1.default.createElement(exports.globalContext.Provider, { value: contextList }, renderStructure));
}
exports.Provider = Provider;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesContext = exports.userContext = void 0;
const react_1 = require("react");
// Define the context
exports.userContext = (0, react_1.createContext)(undefined);
exports.imagesContext = (0, react_1.createContext)(undefined);
const contextNames = [
    {
        contextName: 'userContext',
        context: exports.userContext,
        initialValue: {
            name: '',
            email: '',
            age: [],
            gender: '',
            location: '',
            bio: '',
            image: '',
            followers: [],
        }
    },
    {
        contextName: 'imagesContext',
        context: exports.imagesContext,
        initialValue: {
            images: [],
        }
    },
];
exports.default = contextNames;

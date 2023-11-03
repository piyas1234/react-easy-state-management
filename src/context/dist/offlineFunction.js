"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.storeData = void 0;
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await async_storage_1.default.setItem(key, jsonValue);
    }
    catch (e) {
        // saving error
    }
};
exports.storeData = storeData;
const getData = async (key) => {
    try {
        const jsonValue = await async_storage_1.default.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
    catch (e) {
        return null;
        // error reading value
    }
};
exports.getData = getData;

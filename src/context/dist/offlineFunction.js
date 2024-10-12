"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeys = exports.getData = exports.storeData = void 0;
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
// Store data in AsyncStorage
const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await async_storage_1.default.setItem(key, jsonValue);
    }
    catch (e) {
        console.error("Error saving data to AsyncStorage:", e);
    }
};
exports.storeData = storeData;
// Retrieve data from AsyncStorage
const getData = async (key) => {
    try {
        const jsonValue = await async_storage_1.default.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
    catch (e) {
        console.error("Error retrieving data from AsyncStorage:", e);
        return null; // Return null in case of an error
    }
};
exports.getData = getData;
const getKeys = async () => {
    try {
        const keys = await async_storage_1.default.getAllKeys();
        return keys ? keys : [];
    }
    catch (error) {
        console.error("Error retrieving keys from AsyncStorage:", error);
        return []; // Return an empty array in case of an error
    }
};
exports.getKeys = getKeys;

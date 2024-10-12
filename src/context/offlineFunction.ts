import AsyncStorage from "@react-native-async-storage/async-storage";

// Store data in AsyncStorage
export const storeData = async (key: string, value: any) => {
  try {
     
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Error saving data to AsyncStorage:", e);
  }
};

// Retrieve data from AsyncStorage
export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error retrieving data from AsyncStorage:", e);
    return null; // Return null in case of an error
  }
};

export const getKeys = async (): Promise<string[]> => {
  try {
    const keys: any  = await AsyncStorage.getAllKeys();
    return keys ? keys : [];  
  } catch (error) {
    console.error("Error retrieving keys from AsyncStorage:", error);
    return []; // Return an empty array in case of an error
  }
};


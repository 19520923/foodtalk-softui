/* Importing the AsyncStorage from the react-native-async-storage package. */
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * It clears all the data from the AsyncStorage
 * @returns A promise that resolves to null.
 */
export function clear() {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.clear();
      resolve(null);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * It takes a key and a value, and then it sets the value in AsyncStorage
 * @param {string} key - The key of the item you want to store.
 * @param {string} value - The value to store.
 * @returns A promise that resolves to null.
 */
export function setItem(key: string, value: any) {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.setItem(key, value);
      resolve(null);
    } catch (err) {
      reject(err);
    }
  });
}
/**
 * It returns a promise that resolves to the value of the key passed in
 * @param {string} key - The key of the item you want to get.
 * @returns A promise that resolves to the value of the key.
 */

export function getItem(key: string) {
  return new Promise((resolve, reject) => {
    try {
      const value = AsyncStorage.getItem(key);
      resolve(value);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * It removes an item from the AsyncStorage
 * @param {string} key - The key of the item you want to remove.
 * @returns A promise that resolves to null.
 */
export function removeItem(key: string) {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.removeItem(key);
      resolve(null);
    } catch (err) {
      reject(err);
    }
  });
}

export default {
  clear,
  getItem,
  setItem,
  removeItem,
};

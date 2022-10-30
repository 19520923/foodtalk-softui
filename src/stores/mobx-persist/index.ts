import {onSnapshot, applySnapshot} from 'mobx-state-tree';
import {Storage} from '../../hooks';

/**
 * It takes a store, a name, options and a blacklist and saves the store to the storage
 * @param name - The name of the storage.
 * @param store - The store that you want to persist.
 * @param options - {}
 * @param [blacklist] - This is an object that contains the keys that you don't want to be saved in the storage.
 */
export const persist = (
  name: string,
  store: any,
  options: {jsonify: boolean},
  blacklist = {},
) => {
  let hydrated = false;
  let storage = Storage;

  onSnapshot(store, (_snapshot: object) => {
    /* To prevent the store from being saved to storage before it is hydrated. */
    if (!hydrated) {
      return;
    }
    const snapshot = {..._snapshot};
    /* Used to remove the keys that are not needed to be saved in the storage. */
    Object.keys(snapshot).forEach((key) => {
      if (blacklist[key]) {
        delete snapshot[key];
      }
    });
    /* Checking if the options.jsonify is true or false. If it is true, it will stringify the snapshot. */
    const data = !options.jsonify ? snapshot : JSON.stringify(snapshot);
    storage.setItem(name, data);
  });

  storage.getItem(name).then((data: any) => {
    if (data) {
      /* Used to parse the data from the storage and apply it to the store. */
      try {
        const snapshot = !options.jsonify ? data : JSON.parse(data);
        applySnapshot(store, snapshot);
      } catch (err) {
        storage.removeItem(name);
      }
      /* Checking if the store has a function called afterHydration and if it does, it will call it. */
      if (store.afterHydration && typeof store.afterHydration === 'function') {
        store.afterHydration();
      }
    }
    hydrated = true;
  });
};

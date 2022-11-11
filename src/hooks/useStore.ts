import {createContext, useContext} from 'react';
import {TRootStore} from '../stores/RootStore';

const RootStoreContext = createContext<null | TRootStore>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}

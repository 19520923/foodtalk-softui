import { Callback } from '@react-native-async-storage/async-storage/lib/typescript/types';
import i18n from 'i18n-js';
import {ImageSourcePropType} from 'react-native';
import {ITheme} from './theme';

export * from './components/atoms';
export * from './components/molecules';
export * from './theme';
export * from './user'
export * from './food'
export * from './post'
export * from './notification'

export type IParamList = {
  ImagePicker: {
    onCallback: (array: Array<any>) => void;
  };
  Map: {
    onDone: (address: string, region: any) => void
    onCancel: (Callback: void) => void
    isVisible: boolean
  }
};

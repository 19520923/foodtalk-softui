import i18n from 'i18n-js';
import {TChatModel} from '../../stores/models/ChatModel';
import {TFoodModel} from '../../stores/models/FoodModel';
import {TPostModel} from '../../stores/models/PostModel';
import {TProfileStore} from '../../stores/RootStore';
import {IFood} from './food';

export * from './components/atoms';
export * from './components/molecules';
export * from './theme';
export * from './user';
export * from './food';
export * from './post';
export * from './notification';

export interface ITranslate {
  locale: string;
  setLocale: (locale?: string) => void;
  t: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
  translate: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
}

export type IParamList = {
  ImagePicker: {
    onCallback: (array: Array<any>) => void;
  };
  Map: {
    onDone: (address: string, region: any) => void;
    onCancel: (Callback: void) => void;
    isVisible: boolean;
  };
  Comment: {
    post: TPostModel;
  };
  AttachFood: {
    foods: Array<IFood>;
    onDone: (food: Array<IFood>) => void;
  };
  UserList: {
    user: TProfileStore;
    name: string;
  };
  PostDetail: {
    post: TPostModel;
  };
  Food: {
    food: TFoodModel;
  };
  Profile: {
    user: TProfileStore;
  };
  Chat: {
    chat: TChatModel;
  };
};

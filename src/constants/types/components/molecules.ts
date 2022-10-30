import { ComponentType } from 'react';
import {ColorValue, ImageSourcePropType, ViewStyle} from 'react-native';
import {ISpacing, ITheme} from '../theme';

/* Defining the interface for the Card component. */
export interface ICard extends ISpacing {
  inline?: boolean;
  fullWidth?: boolean;
  background?: boolean;
  image: ImageSourcePropType;
  title: string;
  description: string;
  subcription?: string;
  style?: ViewStyle;
}

/* Defining the interface for the Carousel component. */
export interface ICarousel extends ISpacing {
  content?: string;
  images: Array<ImageSourcePropType>;
  created_at: string;
  likes?: number;
  comments?: number;
  actionsLeft?: JSX.Element;
  actionsRight?: JSX.Element;
  style?: ViewStyle;
}

export interface IImageDesc {
  image: ImageSourcePropType;
  size?: number;
  title?: string | undefined;
  description?: string;
  card?: boolean;
  info?: {
    likes?: number;
    created_at?: string | number | Date;
  };
  color?: ColorValue;
}

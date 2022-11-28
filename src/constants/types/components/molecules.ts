import {ColorValue, ImageSourcePropType, ViewStyle} from 'react-native';
import {ISpacing} from '../theme';

/* Defining the interface for the Card component. */
export interface ICard extends ISpacing {
  inline?: boolean;
  fullWidth?: boolean;
  background?: boolean;
  image: ImageSourcePropType;
  title?: string;
  description?: string;
  subcription?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

/* Defining the interface for the Carousel component. */
export interface ICarousel extends ISpacing {
  content?: string;
  images?: Array<any>;
  created_at?: string;
  likes?: number;
  comments?: number;
  actionsLeft?: JSX.Element;
  actionsRight?: JSX.Element;
  style?: ViewStyle;
  descPress?: () => void;
}

export interface IImageDesc {
  image?: ImageSourcePropType;
  size?: number;
  title?: string;
  description?: string;
  card?: boolean;
  info?: {
    likes?: number;
    created_at?: string | number | Date;
  };
  color?: ColorValue;
  icon?: any;
}

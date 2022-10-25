import relatedTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import React from 'react';
import {ImageSourcePropType, StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from '../../hooks';
import {Block, Image, Text} from '../atoms';
import SwipeSlide from './SwipeSlide';

dayjs.extend(relatedTime);

type IAction = {
  icon: ImageSourcePropType;
  color?: ViewStyle['backgroundColor'];
  title?: string;
  onPress?: void;
  isPress?: boolean;
  isPressColor?: ViewStyle['backgroundColor'];
};

type Props = {
  content?: string;
  images: Array<ImageSourcePropType>;
  created_at: string;
  likes?: number;
  comments?: number;
  actionsLeft?: Array<IAction>;
  actionsRight?: Array<IAction>;
};

const Carousel = ({
  content,
  images,
  created_at,
  likes,
  comments,
  actionsLeft,
  actionsRight,
}: Props) => {
  const {sizes, assets, colors} = useTheme();

  return (
    <Block>
      {/* <SwipeSlide images={images} /> */}
      <Image
        radius={0}
        resizeMode="cover"
        source={assets.carousel1}
        style={{width: '100%'}}
        marginTop={sizes.s}
        marginBottom={sizes.sm}
      />
      <Block paddingHorizontal={sizes.s}>
        <Block row justify="space-between" wrap="nowrap">
          <Block row>
            {actionsLeft &&
              actionsLeft.map((action) => (
                <Image
                  radius={0}
                  resizeMode="cover"
                  source={action.icon}
                  height={sizes.m}
                  width={sizes.m}
                  color={colors.primary}
                  marginRight={sizes.sm}
                />
              ))}
          </Block>
          <Block scroll horizontal>
            {actionsRight &&
              actionsRight.map((action) => (
                <Image
                  resizeMode="cover"
                  source={action.icon}
                  height={sizes.m}
                  width={sizes.m}
                  marginRight={sizes.sm}
                />
              ))}
          </Block>
        </Block>
        <Text p lineHeight={26} marginTop={sizes.xs}>
          {content}
        </Text>
        <Text secondary>
          {dayjs(created_at).toNow(true)} ago {likes !== 0 && `• ${likes} Like`}{' '}
          {comments !== 0 && `• ${comments} Comments`}
        </Text>
      </Block>
    </Block>
  );
};

export default Carousel;

import relatedTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from '../../hooks';
import {Block, Image, Text} from '../atoms';
import {ICarousel} from '../../constants/types';

dayjs.extend(relatedTime);

const Carousel = ({
  content,
  images,
  created_at,
  likes,
  comments,
  actionsLeft,
  actionsRight,
  margin,
  marginBottom,
  marginTop,
  marginHorizontal,
  marginVertical,
  marginRight,
  marginLeft,
  padding,
  paddingBottom,
  paddingTop,
  paddingHorizontal,
  paddingVertical,
  paddingRight,
  paddingLeft,
  style,
}: ICarousel) => {
  const {sizes, assets, colors} = useTheme();
  const CarouselContainerStyle = StyleSheet.flatten([
    style,
    {
      ...(margin !== undefined && {margin}),
      ...(marginBottom && {marginBottom}),
      ...(marginTop && {marginTop}),
      ...(marginHorizontal && {marginHorizontal}),
      ...(marginVertical && {marginVertical}),
      ...(marginRight && {marginRight}),
      ...(marginLeft && {marginLeft}),
      ...(padding !== undefined && {padding}),
      ...(paddingBottom && {paddingBottom}),
      ...(paddingTop && {paddingTop}),
      ...(paddingHorizontal && {paddingHorizontal}),
      ...(paddingVertical && {paddingVertical}),
      ...(paddingRight && {paddingRight}),
      ...(paddingLeft && {paddingLeft}),
    },
  ]) as ViewStyle;

  return (
    <Block style={CarouselContainerStyle}>
      {/* <SwipeSlide images={images} /> */}
      <Image
        radius={0}
        resizeMode="cover"
        source={assets.carousel1}
        style={{width: '100%'}}
        marginVertical={sizes.s}
      />
      <Block paddingHorizontal={sizes.s}>
        {(actionsLeft || actionsRight) && (
          <Block row justify="space-between" wrap="nowrap">
            {actionsLeft && actionsLeft}
            {actionsRight && actionsRight}
          </Block>
        )}
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

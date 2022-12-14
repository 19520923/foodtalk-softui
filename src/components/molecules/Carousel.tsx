import relatedTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {useTheme} from '../../hooks';
import {Block, Text} from '../atoms';
import {ICarousel} from '../../constants/types';
import {IMAGE_HEIGHT} from '../../constants/constants';
import {SliderBox} from 'react-native-image-slider-box';

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
  descPress,
}: ICarousel) => {
  const {sizes, colors} = useTheme();
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
      {images && (
        <Block marginVertical={sizes.s}>
          <SliderBox
            images={images}
            sliderBoxHeight={IMAGE_HEIGHT}
            onCurrentImagePressed={(index: number) =>
              console.log(`image ${index} pressed`)
            }
            dotColor={colors.primary}
            inactiveDotColor={colors.icon}
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            dotStyle={{
              width: sizes.s,
              height: sizes.s,
            }}
          />
        </Block>
      )}
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
        <TouchableOpacity
          onPress={descPress ? descPress : null}
          activeOpacity={1}>
          <Text secondary>
            {dayjs(created_at).toNow(true)} ago{' '}
            {likes !== 0 && `??? ${likes} Like`}{' '}
            {comments !== 0 && `??? ${comments} Comments`}
          </Text>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default Carousel;

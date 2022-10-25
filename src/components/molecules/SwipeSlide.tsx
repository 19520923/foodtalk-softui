import React, {useState} from 'react';
import {
  Dimensions,
  ImageSourcePropType,
  NativeScrollEvent,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {ISpacing} from '../../constants/types';
import {useTheme} from '../../hooks';
import {Block, Image, Text} from '../atoms';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = (WIDTH / 3) * 2;

interface Props extends ISpacing {
  images: Array<ImageSourcePropType>;
  style?: ViewStyle;
}

const SwipeSlide = ({
  images,
  style,
  padding,
  paddingVertical,
  paddingHorizontal,
  paddingRight,
  paddingLeft,
  paddingTop,
  paddingBottom,
  margin,
  marginVertical,
  marginHorizontal,
  marginRight,
  marginLeft,
  marginTop,
  marginBottom,
}: Props) => {
  const swipeSlideStyles = StyleSheet.flatten([
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

  const {colors, sizes, assets} = useTheme();
  const [active, setActive] = useState<number>(0);
  const onChange = (nativeEvent: NativeScrollEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== active) setActive(slide);
    }
  };
  return (
    <Block style={swipeSlideStyles}>
      <Block
        scroll
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{width: '100%', position: 'relative'}}
        onScroll={({nativeEvent}) => onChange(nativeEvent)}>
        <Image
          source={assets.carousel1}
          style={{width: '100%', height: HEIGHT}}
          resizeMode="cover"
        />
        <Image
          source={assets.carousel1}
          style={{width: '100%', height: HEIGHT}}
          resizeMode="cover"
        />
      </Block>
      <Block
        row
        horizontal
        style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
        {images.map((s, index) => (
          <Text h5 color={colors[active === index ? 'primary' : 'text']}>
            •
          </Text>
        ))}
      </Block>
    </Block>
  );
};

export default SwipeSlide;

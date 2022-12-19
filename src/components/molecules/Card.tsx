import {StyleSheet, ViewStyle} from 'react-native';
import {CARD_WIDTH} from '../../constants/constants';
import {ICard} from '../../constants/types';
import {useTheme} from '../../hooks';
import {Block, Image, Text} from '../atoms';
import React from 'react';

const FullImageWidthCard = () => {
  const {assets, colors, sizes} = useTheme();
  return (
    <Block card marginTop={sizes.sm}>
      <Image resizeMode="cover" source={assets?.card4} width={'100%'} />
      <Text
        h5
        bold
        transform="uppercase"
        color={colors.primary}
        marginTop={sizes.sm}>
        Trending
      </Text>
      <Text p marginTop={sizes.s} marginLeft={sizes.xs} marginBottom={sizes.sm}>
        The most beautiful and complex UI Kits built by Creative Tim.
      </Text>
      {/* user details */}
      <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
        <Image
          source={assets.avatar1}
          style={{width: sizes.xl, height: sizes.xl, borderRadius: sizes.s}}
        />
        <Block marginLeft={sizes.s}>
          <Text p semibold>
            Mathew Glock
          </Text>
          <Text p gray>
            Posted on 28 February
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

const ImageBackgroundCard = () => {
  const {assets, colors, sizes} = useTheme();
  <Block card padding={0} marginTop={sizes.sm}>
    <Image
      background
      resizeMode="cover"
      source={assets.card5}
      radius={sizes.cardRadius}>
      <Block color="rgba(0,0,0,0.3)" padding={sizes.padding}>
        <Text h4 white marginBottom={sizes.sm}>
          Flexible office space means growth.
        </Text>
        <Text p white>
          Rather than worrying about switching offices every couple years, you
          can instead stay in the same location.
        </Text>
        {/* user details */}
        <Block row marginLeft={sizes.xs} marginTop={sizes.xxl}>
          <Image
            source={assets.avatar2}
            style={{
              width: sizes.xl,
              height: sizes.xl,
              borderRadius: sizes.s,
            }}
          />
          <Block marginLeft={sizes.s}>
            <Text p white semibold>
              Devin Coldewey
            </Text>
            <Text p white>
              Marketing Manager
            </Text>
          </Block>
        </Block>
      </Block>
    </Image>
  </Block>;
};

const Card = ({
  inline,
  fullWidth,
  background,
  title,
  image,
  description,
  subcription,
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
  disabled,
}: ICard) => {
  const CardContainerStyle = StyleSheet.flatten([
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

  const {colors, sizes} = useTheme();

  const InlineCard = () => {
    const width = CARD_WIDTH - 1.5 * sizes.s;
    return (
      <Block card width={width} height={width * 1.25} disabled={disabled}>
        <Image
          resizeMode="cover"
          source={image}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: '100%'}}
          height={(width * 2) / 3}
        />
        <Block marginTop={sizes.s} justify="space-between">
          <Text color={colors.text} numberOfLines={3} marginBottom={sizes.s}>
            {description}
          </Text>

          <Block row align="center" justify="space-between" width={'100%'}>
            <Text
              numberOfLines={1}
              p
              bold
              marginRight={sizes.s}
              color={colors.primary}>
              {title}
            </Text>
            {subcription !== '' && (
              <Text p semibold color={colors.warning}>
                {subcription}
              </Text>
            )}
          </Block>
        </Block>
      </Block>
    );
  };

  const SingleCard = () => {
    return (
      <Block color={colors.white} card row disabled={disabled}>
        <Image resizeMode="cover" source={image} height={96} width={96} />
        <Block paddingLeft={sizes.s} justify="space-between">
          <Block>
            <Text numberOfLines={1} p bold color={colors.primary}>
              {title}
            </Text>
            <Text numberOfLines={3}>{description}</Text>
          </Block>
          {subcription !== '' && (
            <Text numberOfLines={1} color={colors.gray}>
              {subcription}
            </Text>
          )}
        </Block>
      </Block>
    );
  };

  if (inline) {
    return <Block style={CardContainerStyle}>{InlineCard()}</Block>;
  }

  return <Block style={CardContainerStyle}>{SingleCard()}</Block>;
};

export default Card;

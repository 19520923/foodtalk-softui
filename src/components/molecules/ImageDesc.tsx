import dayjs from 'dayjs';
import React from 'react';
import {ColorValue, ImageSourcePropType} from 'react-native';
import { IImageDesc } from '../../constants/types';
import {useTheme} from '../../hooks';
import {Block, Image, Text} from '../atoms';

const ImageDesc = ({
  image,
  size,
  title,
  description,
  info,
  card,
  color,
}: IImageDesc) => {
  const {sizes, colors} = useTheme();

  if (card)
    return (
      <Block card row marginHorizontal={sizes.s}>
        <Image
          source={image}
          style={{
            width: size || sizes.l,
            height: size || sizes.l,
            borderRadius: sizes.s,
          }}
        />
        <Block marginLeft={sizes.s}>
          <Text p bold color={color ? color : colors.black}>
            {title}
          </Text>
          {description && <Text secondary>{description}</Text>}
          {info && (
            <Text size={11} secondary>
              {dayjs(info.created_at).toNow(true)} ago{' '}
              {info.likes && `• ${info.likes} Like`}{' '}
            </Text>
          )}
        </Block>
      </Block>
    );

  return (
    <Block row marginHorizontal={sizes.s}>
      <Image
        source={image}
        style={{
          width: size || sizes.l,
          height: size || sizes.l,
          borderRadius: sizes.s,
        }}
      />
      <Block marginLeft={sizes.s}>
        <Text p bold color={color ? color : colors.black}>
          {title}
        </Text>
        {description && <Text secondary>{description}</Text>}
        {info && (
          <Text size={11} secondary>
            {dayjs(info.created_at).toNow(true)} ago{' '}
            {info.likes && `• ${info.likes} Like`}{' '}
          </Text>
        )}
      </Block>
    </Block>
  );
};

export default ImageDesc;

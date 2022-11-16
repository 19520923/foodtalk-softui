import {FontAwesome} from '@expo/vector-icons';
import dayjs from 'dayjs';
import React from 'react';
import {IImageDesc} from '../../constants/types';
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
  icon,
}: IImageDesc) => {
  const {sizes, colors} = useTheme();

  const _renderImage = () => {
    if (image) {
      return (
        <Image
          source={image}
          height={size || sizes.l}
          width={size || sizes.l}
          radius={sizes.s}
        />
      );
    }

    if (icon) {
      return (
        <FontAwesome
          name={icon}
          size={size || sizes.l}
          color={color || colors.icon}
        />
      );
    }

    return null;
  };

  if (card) {
    return (
      <Block card row marginHorizontal={sizes.s}>
        {_renderImage()}
        <Block marginLeft={sizes.s}>
          <Text p bold color={color ? color : colors.black}>
            {title}
          </Text>
          {description && (
            <Text secondary numberOfLines={1}>
              {description}
            </Text>
          )}
          {info && (
            <Text size={11} secondary>
              {dayjs(info.created_at).toNow(true)} ago{' '}
              {info.likes && `• ${info.likes} Like`}{' '}
            </Text>
          )}
        </Block>
      </Block>
    );
  }

  return (
    <Block row marginHorizontal={sizes.s}>
      {_renderImage()}
      <Block marginLeft={sizes.s}>
        <Text p bold color={color ? color : colors.black}>
          {title}
        </Text>
        {description && (
          <Text secondary numberOfLines={1}>
            {description}
          </Text>
        )}
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

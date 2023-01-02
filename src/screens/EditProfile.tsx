import React from 'react';
import {Block, Image, Input} from '../components/atoms';
import {IInputProps} from '../constants/types';
import {useTheme} from '../hooks';

const EditProfile = () => {
  const {sizes, colors} = useTheme();

  const InfoEdit = (props: IInputProps) => {
    const {...rest} = props;
    return (
      <Block marginBottom={sizes.sm}>
        <Input
          noBorder
          style={{borderBottomWidth: 0.5, borderBottomColor: colors.black}}
          {...rest}
        />
      </Block>
    );
  };

  return (
    <Block scroll>
      <Block>
        <Image
          background
          resizeMode="cover"
          padding={sizes.sm}
          paddingBottom={sizes.l}
          paddingTop={sizes.xxl}
          radius={sizes.cardRadius}
          style={{opacity: 0.7}}
          source={{
            uri: 'https://i.pinimg.com/736x/91/ab/35/91ab351e0ca4bc826cde2683b1de7759.jpg',
          }}>
          <Block flex={0} align="center">
            <Image
              width={80}
              height={80}
              marginBottom={sizes.sm}
              style={{opacity: 0.7}}
              source={{
                uri: 'https://i.pinimg.com/736x/b7/3f/91/b73f919a279300b951d6d19d6b1d7173.jpg',
              }}
            />
          </Block>
        </Image>
      </Block>

      <Block paddingHorizontal={sizes.m} paddingTop={sizes.sm}>
        <InfoEdit label="Name" placeholder="Dang Duy Bang" />
        <InfoEdit label="Username" placeholder="bangdd_119" />
        <InfoEdit
          color={colors.black}
          disabled
          label="Email"
          placeholder="dangbang0001@gmail.com"
        />
        <InfoEdit label="About" placeholder="This is description for me" />
      </Block>
    </Block>
  );
};

export default EditProfile;

import React from 'react';
import {StyleSheet} from 'react-native';
import {Block, Text} from '../atoms';
import LottieView from 'lottie-react-native';
import {useTheme} from '../../hooks';

const Loading = () => {
  const {sizes, colors} = useTheme();

  const sizeIcon = {
    width: 100,
    height: 100,
  };

  return (
    <Block
      style={[StyleSheet.absoluteFillObject]}
      justify="center"
      align="center"
      color={'rgba(0,0,0,0.1)'}>
      <Text size={sizes.sm} color={colors.primary}>
        LOADING...
      </Text>
      <LottieView
        source={require('../../assets/lottie-icons/ft-loading.json')}
        autoPlay
        loop
        style={sizeIcon}
      />
    </Block>
  );
};

export default Loading;

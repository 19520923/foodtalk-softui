import React, {useCallback, useState} from 'react';
import {
  TextInput,
  TextStyle,
  ViewStyle,
  StyleSheet,
  Platform,
} from 'react-native';

import Block from './Block';
import Text from './Text';

import useTheme from '../../hooks/useTheme';
import {IInputProps} from '../../constants/types';
import {FontAwesome} from '@expo/vector-icons';

const Input = ({
  id = 'Input',
  style,
  color,
  primary,
  secondary,
  tertiary,
  black,
  white,
  gray,
  danger,
  warning,
  success,
  info,
  search,
  disabled,
  label,
  icon,
  marginBottom,
  marginTop,
  marginHorizontal,
  marginVertical,
  marginRight,
  marginLeft,
  noBorder,
  onFocus,
  onBlur,
  ...props
}: IInputProps) => {
  const {assets, colors, sizes} = useTheme();
  const [isFocused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (event, focus) => {
      setFocused(focus);
      focus && onFocus?.(event);
      !focus && onBlur?.(event);
    },
    [setFocused, onFocus, onBlur],
  );

  const colorIndex = primary
    ? 'primary'
    : secondary
    ? 'secondary'
    : tertiary
    ? 'tertiary'
    : black
    ? 'black'
    : white
    ? 'white'
    : gray
    ? 'gray'
    : danger
    ? 'danger'
    : warning
    ? 'warning'
    : success
    ? 'success'
    : info
    ? 'info'
    : null;
  const inputColor = color
    ? color
    : colorIndex
    ? colors?.[colorIndex]
    : colors.gray;

  const inputBoxStyles = StyleSheet.flatten([
    style,
    {
      minHeight: sizes.inputHeight,
      ...(marginBottom && {marginBottom: marginBottom}),
      ...(marginTop && {marginTop: marginTop}),
      ...(marginHorizontal && {marginHorizontal: marginHorizontal}),
      ...(marginVertical && {marginVertical: marginVertical}),
      ...(marginRight && {marginRight: marginRight}),
      ...(marginLeft && {marginLeft: marginLeft}),
    },
  ]) as ViewStyle;

  const inputContainerStyles = StyleSheet.flatten([
    {
      minHeight: sizes.inputHeight,
      borderRadius: sizes.inputRadius,
      borderWidth: !noBorder ? (isFocused ? 2 : sizes.inputBorder) : 0,
      borderColor: isFocused ? colors.focus : inputColor,
    },
  ]) as ViewStyle;

  const inputStyles = StyleSheet.flatten([
    {
      flex: 1,
      zIndex: 2,
      height: '100%',
      fontSize: sizes.p,
      color: colors.black,
      paddingHorizontal: sizes.inputPadding,
    },
  ]) as TextStyle;

  // generate component testID or accessibilityLabel based on Platform.OS
  const inputID =
    Platform.OS === 'android' ? {accessibilityLabel: id} : {testID: id};

  return (
    <Block flex={0} style={inputBoxStyles}>
      {label && (
        <Text color={colors.black} bold marginBottom={sizes.s}>
          {label}
        </Text>
      )}
      <Block row align="center" justify="flex-end" style={inputContainerStyles}>
        {search && assets.search && (
          <FontAwesome
            name={assets.search}
            size={sizes.icon}
            color={colors.icon}
            style={{marginLeft: sizes.inputPadding}}
          />
        )}
        {icon && (
          <FontAwesome
            name={assets?.[icon]}
            color={colors.icon}
            size={sizes.icon}
            style={{marginLeft: sizes.inputPadding}}
          />
        )}
        <TextInput
          {...inputID}
          {...props}
          style={inputStyles}
          editable={!disabled}
          placeholderTextColor={inputColor}
          onFocus={(event) => handleFocus(event, true)}
          onBlur={(event) => handleFocus(event, false)}
        />
        {danger && assets.warning && (
          <FontAwesome
            name={assets.warning}
            size={sizes.icon}
            color={colors.danger}
            style={{
              marginRight: sizes.s,
            }}
          />
        )}
        {success && assets.check && (
          <FontAwesome
            name={assets.check}
            color={colors.success}
            size={sizes.icon}
            style={{
              marginRight: sizes.s,
            }}
          />
        )}
      </Block>
    </Block>
  );
};

export default React.memo(Input);

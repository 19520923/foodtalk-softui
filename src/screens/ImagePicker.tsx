import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme, useTranslation} from '../hooks';
import * as ImageManipulator from 'expo-image-manipulator';
import {IParamList} from '../constants/types';
import {Block, Button, Text} from '../components/atoms';
import {ImageBrowser} from 'expo-image-picker-multiple';

const ImagePicker = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<IParamList, 'ImagePicker'>>();
  const {onCallback} = route.params;
  const {colors, sizes} = useTheme();
  const {t} = useTranslation();

  const processImageAsync = async (
    uri: string,
    actions: ImageManipulator.ActionResize,
    options?: ImageManipulator.SaveOptions,
  ) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [actions],
      options,
    );
    return file;
  };

  const _handleCallback = (callback: Promise<Array<any>>) => {
    navigation.setOptions({
      headerRight: () => (
        <ActivityIndicator
          size="small"
          color={colors.primary}
          style={{marginRight: sizes.s}}
        />
      ),
    });

    callback
      .then(async (photos) => {
        const uris = [];
        for (const photo of photos) {
          const pPhoto = await processImageAsync(
            photo.uri,
            {resize: {width: 1920}},
            {
              format: ImageManipulator.SaveFormat.WEBP,
            },
          );
          uris.push(pPhoto.uri);
        }
        onCallback(uris);
      })
      .then(() => navigation.goBack());
  };

  const _renderDoneButton = (count: number, onSubmit: () => void) => {
    if (!count) {
      return null;
    }

    return (
      <Button onPress={onSubmit}>
        <Text semibold primary>
          Done
        </Text>
      </Button>
    );
  };

  const updateHandler = (count: number, onSubmit: () => void) => {
    navigation.setOptions({
      title: t('imagePicker.title', {count: count}),
      headerRight: () => _renderDoneButton(count, onSubmit),
    });
  };

  const _renderSelectedComponent = (number: number) => {
    <Block>
      <Text>{number}</Text>
    </Block>;
  };

  return (
    <Block>
      <ImageBrowser
        max={10}
        onChange={updateHandler}
        callback={_handleCallback}
        renderSelectedComponent={_renderSelectedComponent}
        emptyStayComponent={<Text>Empty =</Text>}
      />
    </Block>
  );
};

export default ImagePicker;

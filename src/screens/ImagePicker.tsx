import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {useTheme, useTranslation} from '../hooks';
import * as ImageManipulator from 'expo-image-manipulator';
import {IParamList} from '../constants/types';
import {FontAwesome} from '@expo/vector-icons';
import {Block, Button, Text} from '../components/atoms';
import {ImageBrowser} from 'expo-image-picker-multiple';

const ImagePicker = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<IParamList, 'ImagePicker'>>();
  const {onCallback} = route.params;
  const {colors, sizes, icons} = useTheme();
  const {t} = useTranslation();

  const processImageAsync = async (
    uri: string,
    options?: ImageManipulator.SaveOptions,
  ) => {
    const file = await ImageManipulator.manipulateAsync(uri, [], options);
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
      .then((photos) => {
        const chosenPhotos: Array<any> = [];
        photos.forEach(async (photo) => {
          const pPhoto = await processImageAsync(photo.uri, {
            format: ImageManipulator.SaveFormat.WEBP,
          });
          chosenPhotos.push({
            uri: pPhoto.uri,
            name: photo.name,
            type: 'image/webp',
          });
        });
        onCallback(chosenPhotos);
      })
      .then(() => navigation.goBack());
  };

  const _renderDoneButton = (count: number, onSubmit: () => void) => {
    if (!count) return null;
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

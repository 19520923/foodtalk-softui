import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import {Block, Button, Image, Input, Switch, Text} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {ICFood} from '../constants/types';
import {upload, useMst, useTheme, useTranslation} from '../hooks';
import API from '../services/axiosClient';

const isAndroid = Platform.OS === 'android';

const CreateFood = () => {
  const {t} = useTranslation();
  const {sizes} = useTheme();
  const navigation = useNavigation();
  const [ingredient, setIngredient] = useState({
    amount: '',
    name: '',
  });
  const [process, setProcess] = useState('');
  const [photo, setPhoto] = useState<Array<any>>([]);
  const [food, setFood] = useState<ICFood>({
    name: '',
    is_public: true,
    recipe: [],
    ingredients: [],
    photo: '',
  });
  const {
    user: {profile},
  } = useMst();

  useEffect(() => {
    console.log(photo);
  }, [photo]);

  const _handleChange = useCallback(
    (value) => {
      setFood((state) => ({...state, ...value}));
    },
    [setFood],
  );

  const _handleIngrChange = useCallback(
    (value) => {
      setIngredient((state) => ({...state, ...value}));
    },
    [setIngredient],
  );

  const _handleChoosePhotos = () => {
    navigation.navigate(
      t('navigation.imagePicker') as never,
      {
        onCallback: (array: Array<any>) => _handleSetPhotos(array),
      } as never,
    );
  };

  const _handleSetPhotos = (array: Array<any>) => {
    setPhoto([...array]);
  };

  const _handleAddIngredient = () => {
    _handleIngrChange({
      amount: '',
      name: '',
    });
    _handleChange({
      ingredients: [
        ...food.ingredients,
        `${ingredient.amount} ${ingredient.name}`,
      ],
    });
  };

  const _handleRemoveIngredient = (ingr: string) => {
    const removedIngr = _.remove(food.ingredients, (i) => i !== ingr);
    _handleChange({ingredients: removedIngr});
  };

  const _handleAddProcess = () => {
    setProcess('');
    _handleChange({recipe: [...food.recipe, process]});
  };

  const _handleRemoveProcess = (proc: string) => {
    const removedProc = _.remove(food.recipe, (r) => r !== proc);
    _handleChange({recipe: removedProc});
  };

  const _handleDone = useCallback(async () => {
    const url = await upload('food', photo);
    const data = {...food, photo: url};
    await API.createFood(data);
    navigation.goBack();
  }, [food, navigation, photo]);

  const isValid = useMemo(
    () =>
      food.name !== '' &&
      photo &&
      food.recipe.length !== 0 &&
      food.ingredients.length !== 0,
    [food, photo],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isValid && (
          <Button minHeight={sizes.l} onPress={_handleDone}>
            <Text semibold primary>
              Done
            </Text>
          </Button>
        ),
    });
  }, [_handleDone, isValid, navigation, sizes.l]);

  return (
    <Block safe paddingTop={sizes.s}>
      <Block
        scroll
        flex={0}
        keyboard
        behavior={!isAndroid ? 'padding' : 'height'}>
        <ImageDesc
          title={profile.name}
          description={profile.username}
          image={{uri: profile.avatar_url}}
        />
        <Block
          row
          flex={0}
          align="center"
          padding={sizes.s}
          justify="space-between">
          <Block row>
            <Text p semibold>
              {food.is_public ? 'Public' : 'Only me'}
            </Text>
            <Text p marginLeft={sizes.s}>
              {food.is_public
                ? '(Every one can see your receip)'
                : '(Only me can see your receip)'}
            </Text>
          </Block>
          <Switch
            marginRight={sizes.s}
            checked={food.is_public}
            onPress={(checked) => _handleChange({is_public: checked})}
          />
        </Block>
        <Input
          placeholder="Name of food?"
          multiline
          noBorder
          value={food.name}
          onChangeText={(text) => _handleChange({name: text})}
        />
        <TouchableOpacity onPress={_handleChoosePhotos}>
          <Image
            radius={0}
            resizeMode="cover"
            source={{uri: photo[0]}}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: '100%', height: 244}}
            marginTop={sizes.s}
          />
        </TouchableOpacity>
        <Block marginTop={sizes.m} paddingHorizontal={sizes.s}>
          <Text p semibold marginBottom={sizes.s}>
            Ingredients
          </Text>
          <Block left={sizes.s} marginBottom={sizes.s}>
            {food.ingredients.map((ingr) => (
              <TouchableOpacity onPress={() => _handleRemoveIngredient(ingr)}>
                <Text p>- {ingr}</Text>
              </TouchableOpacity>
            ))}
          </Block>
          <Block row align="center">
            <Input
              placeholder="Amount"
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: '25%'}}
              value={ingredient.amount}
              onChangeText={(text) => _handleIngrChange({amount: text})}
            />
            <Block marginHorizontal={sizes.s}>
              <Input
                placeholder="Ingredient"
                value={ingredient.name}
                onChangeText={(text) => _handleIngrChange({name: text})}
              />
            </Block>
            <Button
              width={64}
              secondary
              onPress={_handleAddIngredient}
              disabled={ingredient.amount === '' || ingredient.name === ''}>
              <Text bold white>
                Add
              </Text>
            </Button>
          </Block>
        </Block>
        <Block marginTop={sizes.sm} paddingHorizontal={sizes.s}>
          <Text p semibold marginBottom={sizes.s}>
            Process
          </Text>
          <Block left={sizes.s} marginBottom={sizes.s}>
            {food.recipe.map((r, index) => (
              <TouchableOpacity onPress={() => _handleRemoveProcess(r)}>
                <Text p>{`${index + 1}. ${r}`}</Text>
              </TouchableOpacity>
            ))}
          </Block>
          <Block row align="center">
            <Block marginRight={sizes.s}>
              <Input
                placeholder="New step"
                value={process}
                onChangeText={(text) => setProcess(text)}
              />
            </Block>
            <Button
              width={64}
              secondary
              onPress={_handleAddProcess}
              disabled={process === ''}>
              <Text bold white>
                Add
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default CreateFood;

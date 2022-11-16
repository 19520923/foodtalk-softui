import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import _ from 'lodash';
import React, {useCallback, useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {Block, Button, Input, Text} from '../components/atoms';
import {Card} from '../components/molecules';
import {IFood, IParamList} from '../constants/types';
import {useMst, useTheme, useTranslation} from '../hooks';
import {observer} from 'mobx-react-lite';

const AttachFood = () => {
  const {t} = useTranslation();
  const route = useRoute<RouteProp<IParamList, 'AttachFood'>>();
  const navigation = useNavigation();
  const {foods, onDone} = route.params;
  const {sizes} = useTheme();
  const [key, setKey] = useState<string>('');
  const [selected, setSelected] = useState<Array<IFood>>([...foods]);
  const {
    searchFoods: {setFoods, loadFoods, rows, count},
  } = useMst();

  const _handleKeyChange = useCallback(
    (value) => {
      setKey(value);
    },
    [setKey],
  );

  const _handleDone = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    onDone(selected);
  }, [onDone, selected]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Input
          placeholder="Type to search food's recipes"
          onChangeText={(text) => _handleKeyChange(text)}
        />
      ),
      headerRight: () => (
        <Button minHeight={sizes.l} onPress={_handleDone}>
          <Text semibold primary>
            Done
          </Text>
        </Button>
      ),
    });
  }, [_handleDone, _handleKeyChange, navigation, sizes.l]);

  useEffect(() => {
    setFoods(key);
  }, [key, setFoods]);

  const _handleSelected = useCallback(
    (value) => {
      setSelected((state) => [...state, value]);
    },
    [setSelected],
  );

  const _handleRemoved = useCallback(
    (value) => {
      setSelected((state) => [..._.filter(state, (e) => e._id !== value._id)]);
    },
    [setSelected],
  );

  const _handleLoadFoods = useCallback(() => {
    if (rows.lenght < count) {
      loadFoods(key);
    }
  }, [rows, count, loadFoods, key]);

  return (
    <Block scroll padding={sizes.s}>
      <Text h5 semibold marginBottom={sizes.s}>
        {t('common.selected')}
      </Text>
      <Block scroll horizontal paddingBottom={sizes.s}>
        {selected.map((e, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => _handleRemoved(e)}>
            <Card
              inline
              description={e.about}
              image={{uri: e.photo}}
              title={e.name}
              subcription={String(e.score?.toFixed(1))}
              marginRight={sizes.s}
            />
          </TouchableOpacity>
        ))}
      </Block>
      <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
        {t('common.foods')}
      </Text>
      <Block scroll load={_handleLoadFoods}>
        {rows.map((food: IFood) => {
          const isSelected =
            _.findIndex(selected, (e) => e._id === food._id) !== -1;
          return (
            <TouchableOpacity
              activeOpacity={1}
              key={food._id}
              onPress={() => (!isSelected ? _handleSelected(food) : null)}>
              <Card
                key={food._id}
                image={{uri: food.photo}}
                title={food.name}
                description={food.about}
                subcription={String(food.score?.toFixed(1))}
                marginBottom={sizes.s}
                disabled={isSelected}
              />
            </TouchableOpacity>
          );
        })}
      </Block>
    </Block>
  );
};

export default observer(AttachFood);

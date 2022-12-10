import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import _ from 'lodash';
import React, {useCallback, useState, useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
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
          search
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
    if (rows.length < count) {
      loadFoods(key);
    }
  }, [rows, count, loadFoods, key]);

  const _renderListFoodItem = ({item}) => {
    const isSelected = _.findIndex(selected, (e) => e._id === item._id) !== -1;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => (!isSelected ? _handleSelected(item) : null)}>
        <Card
          image={{uri: item.photo}}
          title={item.name}
          description={item.about}
          subcription={String(item.score?.toFixed(1))}
          marginBottom={sizes.s}
          disabled={isSelected}
        />
      </TouchableOpacity>
    );
  };

  const _renderSelectedList = ({item}) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => _handleRemoved(item)}>
        <Card
          inline
          description={item.about}
          image={{uri: item.photo}}
          title={item.name}
          subcription={String(item.score?.toFixed(1))}
          marginRight={sizes.s}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Block scroll padding={sizes.s}>
      <Text h5 semibold marginBottom={sizes.s}>
        {t('common.selected')}
      </Text>
      <Block paddingBottom={sizes.s}>
        <FlatList
          // refreshing={loader}
          data={selected}
          renderItem={_renderSelectedList}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          // ListFooterComponent={loader ? <MoreLoader /> : null}
          // ItemSeparatorComponent={ListSeparator}
          horizontal
        />
      </Block>
      <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
        {t('common.foods')}
      </Text>
      <Block>
        <FlatList
          // refreshing={loader}
          data={rows}
          renderItem={_renderListFoodItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          // ListFooterComponent={loader ? <MoreLoader /> : null}
          // ItemSeparatorComponent={ListSeparator}
          onEndReachedThreshold={0.5}
          onEndReached={_handleLoadFoods}
        />
      </Block>
    </Block>
  );
};

export default observer(AttachFood);

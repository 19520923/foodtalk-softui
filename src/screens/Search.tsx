import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItem, TouchableOpacity} from 'react-native';
import {Block, Input, Text} from '../components/atoms';
import {Card} from '../components/molecules';
import {useMst, useTheme, useTranslation} from '../hooks';
import {observer} from 'mobx-react-lite';
import {Food} from '../components/organisms';
import {useNavigation} from '@react-navigation/native';
import {TFoodModel} from '../stores/models/FoodModel';
import {TProfileStore} from '../stores/RootStore';

const Search = () => {
  const {t} = useTranslation();
  const {sizes} = useTheme();
  const {searchUsers, searchFoods} = useMst();
  const [key, setKey] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    searchUsers.setUsers(key);
    searchFoods.setFoods(key);
  }, [key, searchFoods, searchUsers]);

  const _renderFoodItem: ListRenderItem<TFoodModel> = ({item}) => (
    <Food inline food={item} />
  );

  const _handleLoadMoreFoods = () => {
    if (searchFoods.rows.length < searchFoods.count) {
      searchFoods.loadFoods(key);
    }
  };
  const _navigateToProfile = (user: any) => {
    navigation.navigate(
      t('navigation.profileScreen') as never,
      {user: user} as never,
    );
  };

  const _renderUserItem: ListRenderItem<TProfileStore> = ({item}) => (
    <TouchableOpacity
      onPress={() => _navigateToProfile(item)}
      activeOpacity={1}>
      <Card
        description={item.profile.about}
        image={{uri: item.profile.avatar_url}}
        title={item.profile.name}
        subcription={`${item.profile.follower.length} followers - ${item.profile.following.length} following`}
        marginBottom={sizes.s}
      />
    </TouchableOpacity>
  );

  const _handleLoadMoreUsers = () => {
    if (searchUsers.rows.length < searchFoods.count) {
      searchUsers.loadUsers(key);
    }
  };

  return (
    <Block scroll showsHorizontalScrollIndicator={false} padding={sizes.s}>
      <Input
        placeholder="Type to search"
        onChangeText={(text) => setKey(text)}
        search
      />
      <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
        {t('common.foods')} ({searchFoods.count})
      </Text>
      <Block paddingBottom={sizes.s}>
        <FlatList
          // refreshing={loader}
          data={searchFoods.rows}
          renderItem={_renderFoodItem}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          // ListFooterComponent={loader ? <MoreLoader /> : null}
          // ItemSeparatorComponent={ListSeparator}
          onEndReachedThreshold={0.5}
          onEndReached={_handleLoadMoreFoods}
          horizontal
        />
      </Block>
      <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
        {t('search.users')} ({searchUsers.count})
      </Text>
      <Block marginBottom={sizes.s}>
        <FlatList
          // refreshing={loader}
          data={searchUsers.rows}
          renderItem={_renderUserItem}
          keyExtractor={(item) => item.profile._id}
          showsVerticalScrollIndicator={false}
          // ListFooterComponent={loader ? <MoreLoader /> : null}
          // ItemSeparatorComponent={ListSeparator}
          onEndReachedThreshold={0.5}
          onEndReached={_handleLoadMoreUsers}
        />
      </Block>
    </Block>
  );
};

export default observer(Search);

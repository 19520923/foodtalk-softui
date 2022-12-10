import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Block, Input, Text} from '../components/atoms';
import {Card} from '../components/molecules';
import {useMst, useTheme, useTranslation} from '../hooks';
import {observer} from 'mobx-react-lite';

const Search = () => {
  const {t} = useTranslation();
  const {sizes, assets} = useTheme();
  const {searchUsers, searchFoods} = useMst();
  const [key, setKey] = useState('');

  useEffect(() => {
    searchUsers.setUsers(key);
    searchFoods.setFoods(key);
  }, [key, searchFoods, searchUsers]);

  const _renderFoodItem = ({item}) => (
    <Card
      inline
      description={item.about}
      image={{uri: item.photo}}
      title={item.name}
      subcription={item.score}
      marginRight={sizes.s}
    />
  );

  const _handleLoadMoreFoods = () => {
    if (searchFoods.rows.length < searchFoods.count) {
      searchFoods.loadFoods(key);
    }
  };

  const _renderUserItem = ({item}) => (
    <Card
      description={item.about}
      image={{uri: item.avatar_url}}
      title={item.name}
      subcription={`${item.follower.length} followers - ${item.following.length} following`}
      marginBottom={sizes.s}
    />
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
          keyExtractor={(item) => item._id}
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

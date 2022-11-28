import React, {useCallback, useEffect, useMemo} from 'react';
import {IParamList} from '../constants/types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useMst, useTheme} from '../hooks';
import {Card} from '../components/molecules';
import {Block} from '../components/atoms';
import {FlatList} from 'react-native';
import {USER_LIST_SCREEN_NAME} from '../constants/constants';
import {observer} from 'mobx-react-lite';

const UserList = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<IParamList, 'UserList'>>();
  const {sizes} = useTheme();
  const {
    user: {following, follower, setFollowing, setFollower},
  } = useMst();
  const {user_id, name} = route.params;

  useEffect(() => {
    switch (name) {
      case USER_LIST_SCREEN_NAME.following:
        setFollowing(user_id);
        break;
      case USER_LIST_SCREEN_NAME.follower:
        setFollower(user_id);
        break;
      case USER_LIST_SCREEN_NAME.reaction:
        break;

      default:
        break;
    }
  }, [name, setFollower, setFollowing, user_id]);

  const data = useMemo(() => {
    switch (name) {
      case USER_LIST_SCREEN_NAME.following:
        return following.rows;
      case USER_LIST_SCREEN_NAME.follower:
        return follower.rows;
      case USER_LIST_SCREEN_NAME.reaction:
        return [];

      default:
        return [];
    }
  }, [follower.rows.length, following.rows.length, name]);

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [name, navigation]);

  const _renderItem = ({item}) => {
    return (
      <Card
        image={{uri: item.avatar_url}}
        title={item.name}
        description={item.about}
        subcription={`${item.follower.length} followers - ${item.following.length} following`}
        marginBottom={sizes.s}
      />
    );
  };

  //   const _handleLoadMore = useCallback(() => {
  //     if (rows.length < count) {
  //       loadFollowing(user_id);
  //     }
  //   }, [count, loadFollowing, rows.length, user_id]);

  return (
    <Block paddingTop={sizes.s}>
      <FlatList
        // refreshing={loader}
        data={data}
        renderItem={_renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        // ListFooterComponent={loader ? <MoreLoader /> : null}
        // ItemSeparatorComponent={ListSeparator}
        onEndReachedThreshold={0.5}
        // onEndReached={_handleLoadMore}
      />
    </Block>
  );
};

export default observer(UserList);

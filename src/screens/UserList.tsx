import React, {useEffect, useMemo} from 'react';
import {IParamList} from '../constants/types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useTheme} from '../hooks';
import {Card} from '../components/molecules';
import {Block} from '../components/atoms';
import {FlatList, ListRenderItem, TouchableOpacity} from 'react-native';
import {USER_LIST_SCREEN_NAME} from '../constants/constants';
import {observer} from 'mobx-react-lite';
import {TProfileModel} from '../stores/models/ProfileModel';

const UserList = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<IParamList, 'UserList'>>();
  const {sizes} = useTheme();
  const {name, user} = route.params;
  const {following, follower, setFollowing, setFollower} = user;

  useEffect(() => {
    switch (name) {
      case USER_LIST_SCREEN_NAME.following:
        setFollowing();
        break;
      case USER_LIST_SCREEN_NAME.follower:
        setFollower();
        break;
      case USER_LIST_SCREEN_NAME.reaction:
        break;

      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useMemo(() => {
    switch (name) {
      case USER_LIST_SCREEN_NAME.following:
        return following;
      case USER_LIST_SCREEN_NAME.follower:
        return follower;
      case USER_LIST_SCREEN_NAME.reaction:
        return [];

      default:
        return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [follower.length, following.length, name]);

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [name, navigation]);

  const _handleNavigateToProfile = () => {
    //
  };

  const _renderItem: ListRenderItem<TProfileModel> = ({item}) => {
    return (
      <TouchableOpacity onPressOut={_handleNavigateToProfile} activeOpacity={1}>
        <Card
          image={{uri: item.avatar_url}}
          title={item.name}
          description={item.about}
          subcription={`${item.follower.length} followers - ${item.following.length} following`}
          marginBottom={sizes.s}
        />
      </TouchableOpacity>
    );
  };

  //   const _handleLoadMore = useCallback(() => {
  //     if (rows.length < count) {
  //       loadFollowing(user_id);
  //     }
  //   }, [count, loadFollowing, rows.length, user_id]);

  return (
    <Block safe paddingHorizontal={sizes.s}>
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

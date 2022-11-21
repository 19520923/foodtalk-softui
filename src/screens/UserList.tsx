import React, {useCallback, useEffect} from 'react';
import {IParamList} from '../constants/types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useMst, useTheme} from '../hooks';
import {Card} from '../components/molecules';
import {Block} from '../components/atoms';
import {FlatList} from 'react-native';

const UserList = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<IParamList, 'UserList'>>();
  const {sizes} = useTheme();
  const {
    user: {
      following: {rows, count},
      setFollowing,
      loadFollowing,
    },
  } = useMst();
  const {user_id, name} = route.params;

  useEffect(() => {
    setFollowing(user_id);
  }, [setFollowing, user_id]);

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
        data={rows}
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

export default UserList;

import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {Block} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {useMst, useTheme, useTranslation} from '../hooks';
import {NOTIFICATION_TYPES} from '../constants/constants';
import {useNavigation} from '@react-navigation/native';

const Notifications = () => {
  const {sizes} = useTheme();
  const {
    notifications: {rows, count, setNoti, loadNoti},
  } = useMst();
  const navigation = useNavigation();
  const {t} = useTranslation();

  useEffect(() => {
    setNoti();
  }, [setNoti]);

  const _handleLoadMoreNoti = useCallback(() => {
    if (rows.length <= count) {
      loadNoti();
    }
  }, [count, loadNoti, rows.length]);

  const _handlePress = (type: string, data: any) => {
    switch (type) {
      case NOTIFICATION_TYPES.post:
        navigation.navigate(t('navigation.postDetail'), {post: data});
        break;

      default:
        break;
    }
  };

  const _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => _handlePress(item.type, item.post_data)}>
        <Block padding={sizes.xs} white={!item.is_seen}>
          <ImageDesc
            key={item._id}
            size={sizes.xl}
            image={{uri: item.author.avatar_url}}
            title={item.author.name}
            description={item.content}
            info={{
              created_at: item.created_at,
            }}
          />
        </Block>
      </TouchableOpacity>
    );
  };

  return (
    <Block>
      <FlatList
        // refreshing={loader}
        data={rows}
        renderItem={_renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        // ListFooterComponent={loader ? <MoreLoader /> : null}
        // ItemSeparatorComponent={ListSeparator}
        onEndReachedThreshold={0.5}
        onEndReached={_handleLoadMoreNoti}
      />
    </Block>
  );
};

export default observer(Notifications);

import {Observer, observer} from 'mobx-react-lite';
import React, {useCallback, useEffect} from 'react';
import {FlatList, ListRenderItem, TouchableOpacity} from 'react-native';
import {Block} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {useMst, useTheme, useTranslation} from '../hooks';
import {NOTIFICATION_TYPES} from '../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {TNotificationModel} from '../stores/models/NotificationModel';

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

  const _handlePress = (noti: TNotificationModel) => {
    if (!noti.is_seen) {
      noti.seen();
    }
    switch (noti.type) {
      case NOTIFICATION_TYPES.post:
        navigation.navigate(
          t('navigation.postDetail') as never,
          {post: noti.post_data} as never,
        );
        break;
      case NOTIFICATION_TYPES.food:
        navigation.navigate(
          t('navigation.foodDetail') as never,
          {food: noti.food_data} as never,
        );
        break;

      default:
        break;
    }
  };

  const _renderItem: ListRenderItem<TNotificationModel> = ({item}) => {
    return (
      <Observer>
        {() => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => _handlePress(item)}>
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
        )}
      </Observer>
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

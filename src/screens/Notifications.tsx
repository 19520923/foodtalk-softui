import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect} from 'react';
import {FlatList} from 'react-native';
import {Block} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {useMst, useTheme} from '../hooks';

const Notifications = () => {
  const {sizes} = useTheme();
  const {
    notifications: {rows, count, setNoti, loadNoti},
  } = useMst();

  useEffect(() => {
    setNoti();
  }, [setNoti]);

  const _handleLoadMoreNoti = useCallback(() => {
    if (rows.length <= count) {
      loadNoti();
    }
  }, [count, loadNoti, rows.length]);

  const _renderItem = ({item}) => {
    return (
      <Block marginVertical={sizes.xs}>
        <ImageDesc
          key={item._id}
          size={sizes.xl}
          image={{uri: item.author.avatar_url}}
          title={item.author.name}
          description={item.content}
          info={{
            created_at: item.created_at,
          }}
          card={!item.is_seen}
        />
      </Block>
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

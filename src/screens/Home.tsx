import React, {useCallback, useEffect} from 'react';
import {useMst, useTheme} from '../hooks/';
import {Block} from '../components/atoms';
import {Post} from '../components/organisms';
import {observer} from 'mobx-react-lite';
import {FlatList, ListRenderItem} from 'react-native';
import {TPostModel} from '../stores/models/PostModel';

const Home = () => {
  const {sizes} = useTheme();
  const {
    posts: {rows, count, setPosts, loadPosts},
  } = useMst();

  useEffect(() => {
    setPosts();
  }, [setPosts]);

  const _handleScrollBottom = useCallback(() => {
    if (rows.length < count) {
      loadPosts();
    }
  }, [count, loadPosts, rows.length]);

  const _renderItem: ListRenderItem<TPostModel> = ({item}) => {
    return <Post key={item._id} post={item} />;
  };
  // const handleProducts = useCallback(
  //   (tab: number) => {
  //     setTab(tab);
  //     setProducts(tab === 0 ? following : trending);
  //   },
  //   [following, trending, setTab, setProducts],
  // );

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
        onEndReached={_handleScrollBottom}
      />
    </Block>
  );
};

export default observer(Home);

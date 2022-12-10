import React, {useEffect} from 'react';
import {Block, Button, Input} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {Post} from '../components/organisms';
import {useTheme} from '../hooks';
import {FontAwesome} from '@expo/vector-icons';
import {observer} from 'mobx-react-lite';
import {FlatList, Platform} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {IParamList} from '../constants/types';

const isAndroid = Platform.OS === 'android';

const PostDetail = () => {
  const {sizes, colors, icons} = useTheme();
  const route = useRoute<RouteProp<IParamList, 'PostDetail'>>();
  const {post} = route.params;

  useEffect(() => {
    post.setComments();
  }, [post]);

  const _renderItem = ({item}) => {
    return (
      <ImageDesc
        key={item._id}
        size={sizes.xl}
        image={{uri: item.author.avatar_url}}
        title={item.author.name}
        description={item.content}
        info={{
          created_at: item.created_at,
          likes: 4,
        }}
      />
    );
  };

  return (
    <Block safe paddingVertical={sizes.s} position="relative">
      {/* mapping o day */}
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        <Post post={post} />
        <FlatList
          // refreshing={loader}
          data={post.comments.rows}
          renderItem={_renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          // ListFooterComponent={loader ? <MoreLoader /> : null}
          // ItemSeparatorComponent={ListSeparator}
          onEndReachedThreshold={0.5}
          onEndReached={post.loadCommnets}
        />
      </Block>

      <Block
        row
        position="absolute"
        width={'100%'}
        bottom={sizes.s}
        padding={sizes.s}
        color={colors.white}
        keyboard
        behavior={!isAndroid ? 'padding' : 'height'}>
        <Block>
          <Input placeholder="Write your comment" />
        </Block>
        <Button paddingLeft={sizes.s}>
          <FontAwesome
            name={icons.send}
            color={colors.icon}
            size={sizes.icon}
          />
        </Button>
      </Block>
    </Block>
  );
};

export default observer(PostDetail);

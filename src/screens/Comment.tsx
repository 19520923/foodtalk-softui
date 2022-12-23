import React, {useCallback, useEffect, useState} from 'react';
import {Block, Button, Input} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {useTheme} from '../hooks';
import {FontAwesome} from '@expo/vector-icons';
import {observer} from 'mobx-react-lite';
import {RouteProp, useRoute} from '@react-navigation/native';
import {IComment, IParamList} from '../constants/types';
import API from '../services/axiosClient';
import {FlatList} from 'react-native';

const Comment = () => {
  const route = useRoute<RouteProp<IParamList, 'Comment'>>();
  const {post} = route.params;
  const {
    comments: {rows},
    addComment,
    setComments,
  } = post;
  const [commentData, setCommentData] = useState<IComment>({
    post: post._id,
    content: '',
  });

  useEffect(() => {
    setComments();
  }, [setComments]);

  const _handleChange = useCallback((value) => {
    setCommentData((state) => ({...state, ...value}));
  }, []);

  const _handleSubmit = async () => {
    _handleChange({content: ''});
    const data = await API.addComment(commentData);
    addComment(data);
  };

  const _renderItem = ({item}) => {
    return (
      <ImageDesc
        size={sizes.xl}
        image={{uri: item.author?.avatar_url}}
        title={item.author?.name}
        description={item.content}
        info={{
          created_at: item.created_at,
          likes: 4,
        }}
      />
    );
  };

  const {sizes, colors, icons} = useTheme();
  return (
    <Block safe position="relative">
      <Block paddingTop={sizes.s} marginBottom={sizes.xxl}>
        <FlatList
          // refreshing={loader}
          data={rows}
          renderItem={_renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          // ListFooterComponent={loader ? <MoreLoader /> : null}
          // ItemSeparatorComponent={ListSeparator}
          onEndReachedThreshold={0.5}
          // onEndReached={_handleScrollBottom}
        />
      </Block>
      <Block
        row
        align="center"
        width={'100%'}
        position="absolute"
        bottom={0}
        color={colors.background}
        padding={sizes.sm}>
        <Block>
          <Input
            placeholder="Write your comment"
            value={commentData.content}
            onChangeText={(text) => _handleChange({content: text})}
          />
        </Block>
        <Button
          onPress={_handleSubmit}
          paddingLeft={sizes.s}
          disabled={commentData.content === ''}>
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

export default observer(Comment);

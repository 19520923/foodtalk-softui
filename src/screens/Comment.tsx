import React, {useCallback, useEffect, useState} from 'react';
import {Block, Button, Input} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {useTheme} from '../hooks';
import {FontAwesome} from '@expo/vector-icons';
import {observer} from 'mobx-react-lite';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ICComment, IParamList} from '../constants/types';
import API from '../services/axiosClient';

const Comment = () => {
  const route = useRoute<RouteProp<IParamList, 'Comment'>>();
  const {post} = route.params;
  const {sizes, colors, icons} = useTheme();

  const {
    comments: {rows},
    setComments,
  } = post;
  const [commentData, setCommentData] = useState<ICComment>({
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
    await API.addComment(commentData);
  };

  return (
    <Block safe position="relative">
      <Block paddingTop={sizes.s} marginBottom={sizes.xxl}>
        <Block scroll>
          {rows.map((item) => (
            <ImageDesc
              key={item._id}
              size={sizes.xl}
              image={{uri: item.author?.avatar_url}}
              title={item.author?.name}
              description={item.content}
              info={{
                created_at: item.created_at,
                likes: 4,
              }}
            />
          ))}
        </Block>
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

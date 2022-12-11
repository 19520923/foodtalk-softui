import React, {useCallback, useEffect, useState} from 'react';
import {Block, Button, Input} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {useTheme} from '../hooks';
import {FontAwesome} from '@expo/vector-icons';
import {observer} from 'mobx-react-lite';
import {RouteProp, useRoute} from '@react-navigation/native';
import {IComment, IParamList} from '../constants/types';
import API from '../services/axiosClient';

const Comment = () => {
  const route = useRoute<RouteProp<IParamList, 'Comment'>>();
  const {post} = route.params;
  const [commentData, setCommentData] = useState<IComment>({
    post: post._id,
    content: '',
  });

  useEffect(() => {
    post.setComments();
  }, [post]);

  const _handleChange = useCallback((value) => {
    setCommentData((state) => ({...state, ...value}));
  }, []);

  const _handleSubmit = async () => {
    _handleChange({content: ''});
    const data = await API.addComment(commentData);
    post.addComment(data);
  };

  const {sizes, colors, icons} = useTheme();
  return (
    <Block safe position="relative">
      <Block scroll showsVerticalScrollIndicator={false}>
        <Block paddingTop={sizes.s} marginBottom={sizes.xxl}>
          {post.comments.rows.map((comment) => (
            <Block paddingVertical={sizes.s}>
              <ImageDesc
                key={comment._id}
                size={sizes.xl}
                image={{uri: comment.author?.avatar_url}}
                title={comment.author?.name}
                description={comment.content}
                info={{
                  created_at: comment.created_at,
                  likes: 4,
                }}
              />
            </Block>
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

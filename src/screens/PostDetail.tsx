import React, {useCallback, useEffect, useState} from 'react';
import {Block, Button, Input} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {Post} from '../components/organisms';
import {useTheme} from '../hooks';
import {FontAwesome} from '@expo/vector-icons';
import {observer} from 'mobx-react-lite';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ICComment, IParamList} from '../constants/types';
import API from '../services/axiosClient';

const PostDetail = () => {
  const {sizes, colors, icons} = useTheme();
  const route = useRoute<RouteProp<IParamList, 'PostDetail'>>();
  const {post} = route.params;
  const [commentData, setCommentData] = useState<ICComment>({
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
    await API.addComment(commentData);
  };

  return (
    <Block safe paddingVertical={sizes.s} position="relative">
      {/* mapping o day */}
      <Block>
        <Block
          scroll
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: sizes.l}}
          load={post.loadCommnets}>
          <Post post={post} />
          {post.comments.rows.map((item) => (
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
          ))}
        </Block>
      </Block>

      <Block
        row
        position="absolute"
        width={'100%'}
        bottom={sizes.s}
        padding={sizes.s}
        color={colors.background}>
        <Block>
          <Input
            placeholder="Write your comment"
            value={commentData.content}
            onChangeText={(text) => _handleChange({content: text})}
          />
        </Block>
        <Button paddingLeft={sizes.s} onPressOut={_handleSubmit}>
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

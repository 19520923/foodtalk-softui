import React, {useCallback, useEffect, useState} from 'react';
import {Block, Button, Input, Text} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {useTheme} from '../hooks';
import {FontAwesome} from '@expo/vector-icons';
import {observer} from 'mobx-react-lite';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ICComment, IParamList} from '../constants/types';
import API from '../services/axiosClient';
import {TouchableOpacity} from 'react-native';
import {TPostComment} from '../stores/models/PostModel';

const Comment = () => {
  const route = useRoute<RouteProp<IParamList, 'Comment'>>();
  const {post} = route.params;
  const {sizes, colors, icons} = useTheme();
  const [rep, setRep] = useState<string>('');

  const {
    comments: {rows},
    setComments,
  } = post;

  const [commentData, setCommentData] = useState<ICComment>({
    post: post._id,
    content: '',
    parent: '',
  });

  useEffect(() => {
    setComments();
  }, [setComments]);

  const _handleChange = useCallback((value) => {
    setCommentData((state) => ({...state, ...value}));
  }, []);

  const _handleSubmit = async () => {
    _handleChange({content: '', parent: ''});
    setRep('');
    await API.addComment(commentData);
  };

  const _handleRep = (item: TPostComment) => {
    _handleChange({parent: item._id});
    setRep(item.author.name);
  };

  return (
    <Block safe position="relative">
      <Block paddingTop={sizes.s} marginBottom={sizes.xxl}>
        <Block scroll>
          {rows.map((item) => (
            <TouchableOpacity key={item._id} onPress={() => _handleRep(item)}>
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
              {item.children.length > 0 &&
                item.children.map((child) => (
                  <Block key={child._id} marginLeft={sizes.m}>
                    <ImageDesc
                      size={sizes.xl}
                      image={{uri: child.author?.avatar_url}}
                      title={child.author?.name}
                      description={child.content}
                      info={{
                        created_at: child.created_at,
                        likes: 4,
                      }}
                    />
                  </Block>
                ))}
            </TouchableOpacity>
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
          {rep !== '' && <Text primary>Reply to {rep}</Text>}
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

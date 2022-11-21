import React, {useEffect} from 'react';
import {Block, Button, Input} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {useMst, useTheme} from '../hooks';
import {FontAwesome} from '@expo/vector-icons';
import {observer} from 'mobx-react-lite';
import {RouteProp, useRoute} from '@react-navigation/native';
import {IComment, IParamList} from '../constants/types';

const Comment = () => {
  const route = useRoute<RouteProp<IParamList, 'Comment'>>();
  const {
    posts: {setComment, getCommentsById},
  } = useMst();
  const post_id = route.params.post_id;
  const comments = getCommentsById(post_id);

  useEffect(() => {
    setComment(route.params.post_id);
  }, [route.params.post_id, setComment]);

  const {sizes, colors, icons} = useTheme();
  return (
    <Block safe style={{position: 'relative'}}>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block marginTop={sizes.sm}>
          {comments &&
            comments.map((comment: IComment) => (
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
            ))}
        </Block>
      </Block>
      <Block
        row
        align="center"
        style={{
          width: '100%',
          position: 'absolute',
          bottom: sizes.s,
        }}
        color={colors.background}
        padding={sizes.sm}>
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

export default observer(Comment);

import React, {useEffect} from 'react';
import {Block, Button, Input} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {useTheme} from '../hooks';
import {FontAwesome} from '@expo/vector-icons';
import RootStore from '../stores/RootStore';
import {observer} from 'mobx-react-lite'

const Comment = () => {
  const {selectedPost, removeSelectedPost, setComments} = RootStore;

  useEffect(() => {
    if (selectedPost) {
      setComments(selectedPost._id);
    }

    return () => {
      removeSelectedPost();
    };
  }, []);

  useEffect(() => {
    console.log(selectedPost?.comments)
  
  }, [selectedPost])
  

  const {sizes, colors, assets, icons} = useTheme();
  return (
    <Block safe style={{position: 'relative'}}>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block marginTop={sizes.sm}>
          {selectedPost && selectedPost.comments && selectedPost.comments.rows.map((comment) => (
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
        padding={sizes.s}>
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

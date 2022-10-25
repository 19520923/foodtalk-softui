import React from 'react';
import {IPost} from '../../constants/types';
import {useTheme} from '../../hooks';
import {Block} from '../atoms';
import {ImageDesc, Carousel} from '../molecules';

type Props = {
  post: IPost;
};

const Post = ({post}: Props) => {
  const {assets, sizes} = useTheme();
  const {_id, author, content, photos, reactions, num_comment, created_at} =
    post;

  const actions = [
    {
      icon: assets.home,
    },
    {icon: assets.home},
    {icon: assets.home},
  ];
  const actionsRight = [
    {
      icon: {
        uri: 'https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png',
      },
    },
    {
      icon: {
        uri: 'https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png',
      },
    },
    {
      icon: {
        uri: 'https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png',
      },
    },
    {
      icon: {
        uri: 'https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png',
      },
    },
    {
      icon: {
        uri: 'https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png',
      },
    },
    {
      icon: {
        uri: 'https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png',
      },
    },
  ];
  return (
    <Block key={_id} marginBottom={sizes.m}>
      <ImageDesc
        image={{uri: author.avatar_url}}
        title={author.name}
        description={author.username}
      />
      <Carousel
        content={content}
        images={photos.map((p) => ({uri: p}))}
        created_at={created_at}
        likes={reactions.length}
        comments={num_comment}
        actionsLeft={actions}
        actionsRight={actionsRight}
      />
    </Block>
  );
};

export default Post;

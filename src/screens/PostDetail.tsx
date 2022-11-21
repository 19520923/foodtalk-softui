import React from 'react';
import {Block, Button, Input} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {Post} from '../components/organisms';
import {INotification, IPost} from '../constants/types';
import {useTheme} from '../hooks';
import {FontAwesome} from '@expo/vector-icons';

type Props = {};

const DATA: IPost = {
  _id: '10101',
  author: {
    _id: 'dasda',
    username: 'nntan',
    name: 'Nguyen Nhut Tan',
    avatar_url:
      'https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png',
  },
  content: 'Hi there',
  photos: [
    'https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png',
    'https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png',
  ],
  created_at: '12/10/2022',
  num_comment: 1,
  reactions: ['1220'],
};

const NOTI_DATA: Array<INotification> = [
  {
    _id: '1',
    content: '1 has following you. Have you followed back!!',
    type: 'SYSTEM',
    created_at: '12/12/2021',
    author: {
      _id: 'dasda',
      username: 'nntan',
      name: 'Nguyen Nhut Tan',
      avatar_url:
        'https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png',
    },
  },
  {
    _id: '2',
    content: '1 has following you. Have you followed back!!',
    type: 'SYSTEM',
    created_at: '12/12/2021',
    author: {
      _id: 'dasda',
      username: 'nntan',
      name: 'Nguyen Nhut Tan',
      avatar_url:
        'https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png',
    },
  },
];

const PostDetail = (props: Props) => {
  const {sizes, colors, icons} = useTheme();
  return (
    <Block safe paddingVertical={sizes.s}>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        <Post post={DATA} />
        <Block>
          {NOTI_DATA?.map((noti) => (
            <ImageDesc
              key={noti._id}
              size={sizes.xl}
              image={{uri: noti.author.avatar_url}}
              title={noti.author.name}
              description={noti.content}
              info={{
                created_at: noti.created_at,
                likes: 4,
              }}
            />
          ))}
        </Block>
      </Block>
      <Block
        row
        align="center"
        position="absolute"
        width={'100%'}
        bottom={sizes.s}
        padding={sizes.s}
        color={colors.background}>
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

export default PostDetail;

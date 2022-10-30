import React from 'react';
import {Block, Button, Image, Input, Text} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {INotification} from '../constants/types';
import {useTheme} from '../hooks';
import {FontAwesome} from '@expo/vector-icons';

type Props = {};

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

const Comment = (props: Props) => {
  const {sizes, colors, assets, icons} = useTheme();
  return (
    <Block safe style={{position: 'relative'}}>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block marginTop={sizes.sm}>
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

export default Comment;

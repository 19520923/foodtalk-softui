import React from 'react';
import {Block, Text} from '../components/atoms';
import {MessagePreview} from '../components/molecules';

const chatListData = [
  {
    id: 0,
    avatar: 'https://thuvienanime.com/wp-content/uploads/2022/04/Naruto.jpg',
    username: 'BangDD',
    content: 'Reply me ! please',
    is_current: true,
    created_at: 'Now',
  },
  {
    id: 1,
    avatar:
      'https://image.thanhnien.vn/w2048/Uploaded/2022/oqivotiw/2022_06_19/cristiano-ronaldo-8084.jpeg',
    username: 'Ronaldo-CR7',
    content: 'World cup loss me',
    is_current: false,
    created_at: '11:09 pm',
  },
  {
    id: 2,
    avatar:
      'https://media.bongda.com.vn/files/news/2022/03/26/chu-tich-laporta-tra-loi-cau-hoi-ve-viec-chieu-mo-mbappe-095944.jpg',
    username: 'Mpape_10',
    content: 'I will receive gold ball',
    is_current: false,
    created_at: 'Nov 10',
  },
];

const ChatList = () => {
  return (
    <Block scroll>
      {chatListData.map((chat) => {
        return <MessagePreview lastMessage={chat} />;
      })}
    </Block>
  );
};

export default ChatList;

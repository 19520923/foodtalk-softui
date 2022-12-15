import React from 'react';
import {Block, Text} from '../components/atoms';
import {MessagePreview} from '../components/molecules';

const ChatList = () => {
  return (
    <Block scroll>
      <MessagePreview />
    </Block>
  );
};

export default ChatList;

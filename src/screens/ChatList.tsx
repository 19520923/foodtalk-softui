import React, {useEffect} from 'react';
import {Block} from '../components/atoms';
import {MessagePreview} from '../components/molecules';
import {useMst} from '../hooks';
import {observer} from 'mobx-react-lite';

const ChatList = () => {
  const {
    chats: {setChats, loadChats, rows, count},
  } = useMst();
  useEffect(() => {
    setChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = () => {
    if (rows.length < count) {
      loadChats();
    }
  };

  return (
    <Block scroll load={loadMore}>
      {rows.map((chat) => {
        return <MessagePreview key={chat._id} chat={chat} />;
      })}
    </Block>
  );
};

export default observer(ChatList);

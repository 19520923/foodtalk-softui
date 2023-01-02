import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18n-js';
import {useMst, useTheme} from '../../hooks';
import {Block, Image, Text} from '../atoms';
import {TChatModel} from '../../stores/models/ChatModel';
//import moment from 'moment';

export type ILastMessage = {
  chat: TChatModel;
};

const MessagePreview = ({chat}: ILastMessage) => {
  const {
    user: {profile},
  } = useMst();
  const user = useMemo(
    () => (chat.user_1._id === profile._id ? chat.user_2 : chat.user_1),
    [chat.user_1, chat.user_2, profile._id],
  );
  //   let lastMessage: IPropsMessagePreview = {
  //     avatar: avatar,
  //     username: username,
  //     content: content,
  //     created_at: created_at,
  //     is_current: is_current,
  //   };
  const navigation = useNavigation();
  const rightSwipe = () => {
    return (
      <TouchableOpacity onPress={() => {}} activeOpacity={0.5}>
        <View style={styles.deleteBox}>
          <Ionicons name="trash-outline" size={35} color={'pink'} />
        </View>
      </TouchableOpacity>
    );
  };

  const {sizes, colors} = useTheme();

  const _handleNavigateChatWithUser = () => {
    navigation.navigate(t('navigation.chat') as never, {chat: chat} as never);
  };

  return (
    <Swipeable renderRightActions={rightSwipe}>
      <TouchableOpacity onPress={_handleNavigateChatWithUser}>
        <Block
          paddingHorizontal={15}
          paddingVertical={15}
          row
          style={{borderBottomWidth: 0.2}}>
          <Block row>
            <Image width={50} height={50} source={{uri: user.avatar_url}} />
            {user.is_current ? (
              <Text
                size={sizes.m + 4}
                color={'#00B555'}
                position="absolute"
                left={40}
                top={35}>
                ●
              </Text>
            ) : null}
            <Block justify="center" marginLeft={sizes.s}>
              <Text bold color={colors.black} size={sizes.sm}>
                {user.username}
              </Text>
              {/* {user().is_current ? ( */}
              <Block row justify="space-between" align="center">
                <Block row>
                  <Block row align="center">
                    <Text color={colors.text} numberOfLines={1}>
                      {chat.lastMessage?.content}
                      {/* {props.data.lastMessage &&
                        (props.data.lastMessage.content.length < 26
                          ? `${props.data.lastMessage.content}`
                          : `${props.data.lastMessage.content.substring(
                              0,
                              25,
                            )}...`)} */}
                    </Text>
                    <Text
                      size={sizes.s}
                      color={colors.text}
                      marginLeft={sizes.s}>
                      ●
                    </Text>
                    <Text
                      size={sizes.s + 5}
                      color={colors.text}
                      marginLeft={sizes.s}>
                      {chat.lastMessage?.created_at}
                      {/* {props.data.lastMessage &&
                        moment(props.data.lastMessage.created_at).fromNow()} */}
                    </Text>
                  </Block>
                </Block>
                <Image
                  width={16}
                  height={16}
                  source={{
                    uri: user.avatar_url,
                  }}
                />
                {/* <Ionicons name='checkmark-circle-outline' size={16} color={color.textIconSmall} /> */}
              </Block>
              {/*    ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '81%',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={[
                          styles.chatRecently,
                          {color: color.textBlack},
                          {fontWeight: 'bold'},
                        ]}
                        numberOfLines={1}>
                        {props.data.lastMessage &&
                          (props.data.lastMessage.content.length < 26
                            ? `${props.data.lastMessage.content}`
                            : `${props.data.lastMessage.content.substring(
                                0,
                                25,
                              )}...`)}
                      </Text>
                      <Text style={[styles.timeRecentlyChat, {fontSize: 3}]}>
                        ●
                      </Text>
                      <Text
                        style={[
                          styles.timeRecentlyChat,
                          {color: color.textBlack},
                          {fontWeight: 'bold'},
                        ]}>
                        {props.data.lastMessage &&
                          moment(props.data.lastMessage.created_at).fromNow()}
                      </Text>
                    </View>
                  </View>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={16}
                    color={color.textIconSmall}
                  />*/}
              {/* </View> */}
              {/* )}  */}
            </Block>
          </Block>
          {/* <Text style={[{ color: props.colorHigh }, { fontWeight: props.bold }]}>{props.data.lastMessage}</Text> */}
        </Block>
      </TouchableOpacity>
    </Swipeable>
  );
};

{
  /* {props.chatRecently.length < 15,
? `${props.chatRecently}`,
: `${props.chatRecently.substring(0, 12)}...`} */
}

export default MessagePreview;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
  },
  avatarAndName: {
    flexDirection: 'row',
  },
  chatAvatarFrame: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContain: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  chatUsername: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
  },
  chatRecently: {
    //color: 'gray',
    //width: 200,
  },
  tinyAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  deleteBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    backgroundColor: 'red',
  },
  timeRecentlyChat: {
    fontFamily: 'Roboto',
    color: 'gray',
    fontSize: 13,
    marginLeft: 5,
  },
  seenAvatar: {
    width: 16,
    height: 16,
    borderRadius: 20,
  },
});

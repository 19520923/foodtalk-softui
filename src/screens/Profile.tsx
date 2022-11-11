import React, {useCallback, useEffect, useState} from 'react';
import {Platform, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/atoms';
import {useData, useMst, useTheme, useTranslation} from '../hooks/';
import {Post} from '../components/organisms';
import {IPost} from '../constants/types';
import {observer} from 'mobx-react-lite';

const POST_DATA: Array<IPost> = [
  {
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
      '',
    ],
    created_at: '12/10/2022',
    num_comment: 1,
    reactions: ['1220'],
  },
  {
    _id: '10102',
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
      '',
    ],
    created_at: '12/10/2022',
    num_comment: 1,
    reactions: ['1220'],
  },
];

const isAndroid = Platform.OS === 'android';

const Profile = observer(() => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes, gradients} = useTheme();
  const {
    user: {profile},
  } = useMst();
  const [selected, setSelected] = useState<string>('POST');

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  // const handleSocialLink = useCallback(
  //   (type: 'twitter' | 'dribbble') => {
  //     const url =
  //       type === 'twitter'
  //         ? `https://twitter.com/${user?.social?.twitter}`
  //         : `https://dribbble.com/${user?.social?.dribbble}`;

  //     try {
  //       Linking.openURL(url);
  //     } catch (error) {
  //       alert(`Cannot open URL: ${url}`);
  //     }
  //   },
  //   [user],
  // );

  const Carories = () => {
    return (
      <Block row flex={0}>
        <Block
          scroll
          horizontal
          renderToHardwareTextureAndroid
          showsHorizontalScrollIndicator={false}
          contentOffset={{x: -sizes.padding, y: 0}}>
          <Button
            radius={sizes.m}
            marginHorizontal={sizes.s}
            onPress={() => setSelected('POST')}
            gradient={gradients?.[selected === 'POST' ? 'primary' : 'light']}>
            <Text
              p
              bold={selected === 'POST'}
              white={selected === 'POST'}
              black={selected !== 'POST'}
              transform="capitalize"
              marginHorizontal={sizes.m}>
              Posts
            </Text>
          </Button>
          <Button
            radius={sizes.m}
            marginHorizontal={sizes.s}
            onPress={() => setSelected('FOOD')}
            gradient={gradients?.[selected === 'FOOD' ? 'primary' : 'light']}>
            <Text
              p
              bold={selected === 'FOOD'}
              white={selected === 'FOOD'}
              black={selected !== 'FOOD'}
              transform="capitalize"
              marginHorizontal={sizes.m}>
              {t('common.foods')}
            </Text>
          </Button>
        </Block>
      </Block>
    );
  };

  return (
    <Block safe>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            paddingTop={sizes.xxl}
            radius={sizes.cardRadius}
            source={assets.background}>
            <Block flex={0} align="center">
              <Image
                width={80}
                height={80}
                marginBottom={sizes.sm}
                source={{uri: profile.avatar_url}}
              />
              <Text h5 center white>
                {profile.name}
              </Text>
              <Text p center white>
                {profile.username}
              </Text>
              <Block row marginVertical={sizes.m}>
                <Button
                  white
                  outlined
                  shadow={false}
                  radius={sizes.m}
                  onPress={() => {
                    alert(`Follow ${profile.name}`);
                  }}>
                  <Block
                    justify="center"
                    radius={sizes.m}
                    paddingHorizontal={sizes.m}
                    color="rgba(255,255,255,0.2)">
                    <Text white bold transform="uppercase">
                      {t('common.follow')}
                    </Text>
                  </Block>
                </Button>
                <Button
                  shadow={false}
                  radius={sizes.m}
                  marginHorizontal={sizes.sm}
                  color="rgba(255,255,255,0.2)"
                  outlined={String(colors.white)}
                  // onPress={() => handleSocialLink('twitter')}
                >
                  <Ionicons
                    size={18}
                    name="logo-twitter"
                    color={colors.white}
                  />
                </Button>
                <Button
                  shadow={false}
                  radius={sizes.m}
                  color="rgba(255,255,255,0.2)"
                  outlined={String(colors.white)}
                  // onPress={() => handleSocialLink('dribbble')}
                >
                  <Ionicons
                    size={18}
                    name="logo-dribbble"
                    color={colors.white}
                  />
                </Button>
              </Block>
            </Block>
          </Image>

          {/* profile: stats */}
          <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.l}
            marginHorizontal="8%"
            color="rgba(255,255,255,0.2)">
            <Block
              row
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid>
              <Block align="center">
                <Text h5>1k</Text>
                <Text>{t('profile.posts')}</Text>
              </Block>
              <Block align="center">
                <Text h5>1k</Text>
                <Text>{t('profile.foods')}</Text>
              </Block>
              <Block align="center">
                <Text h5>{(profile.follower.lenght || 0) / 1000}k</Text>
                <Text>{t('profile.followers')}</Text>
              </Block>
              <Block align="center">
                <Text h5>{(profile.following.lenght || 0) / 1000}k</Text>
                <Text>{t('profile.following')}</Text>
              </Block>
            </Block>
          </Block>

          {/* profile: about me */}
          <Block paddingHorizontal={sizes.sm}>
            <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
              {t('profile.aboutMe')}
            </Text>
            <Text p lineHeight={26}>
              {profile.about}
            </Text>
          </Block>

          {/* profile: photo album */}
          <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
            <Block row align="center" justify="space-between">
              <Text h5 semibold>
                {t('common.album')}
              </Text>
              <Button>
                <Text p primary semibold>
                  {t('common.viewall')}
                </Text>
              </Button>
            </Block>
            <Block row justify="space-between" wrap="wrap">
              <Image
                resizeMode="cover"
                source={assets?.photo1}
                style={{
                  width: IMAGE_VERTICAL_SIZE + IMAGE_MARGIN / 2,
                  height: IMAGE_VERTICAL_SIZE * 2 + IMAGE_VERTICAL_MARGIN,
                }}
              />
              <Block marginLeft={sizes.m}>
                <Image
                  resizeMode="cover"
                  source={assets?.photo2}
                  marginBottom={IMAGE_VERTICAL_MARGIN}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
                <Image
                  resizeMode="cover"
                  source={assets?.photo3}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
              </Block>
            </Block>
          </Block>
          <Block paddingHorizontal={sizes.sm} marginTop={sizes.m}>
            <Block row align="center" justify="space-between">
              <Text h5 semibold>
                {t('common.album')}
              </Text>
            </Block>
          </Block>
          <Block
            flex={0}
            height={1}
            marginRight={sizes.md}
            marginVertical={sizes.sm}
            gradient={gradients.menu}
          />
          {Carories()}
          <Block
            flex={0}
            height={1}
            marginRight={sizes.md}
            marginVertical={sizes.sm}
            gradient={gradients.menu}
          />
          <Block marginTop={sizes.s}>
            {POST_DATA?.map((post) => (
              <Post post={post} />
            ))}
          </Block>
        </Block>
      </Block>
    </Block>
  );
});

export default Profile;

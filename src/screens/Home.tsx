import React, {useCallback, useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/atoms';
import {useNavigation} from '@react-navigation/native';
import {IPost} from '../constants/types';
import {Post} from '../components/organisms';

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
      'https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png',
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
      'https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png',
    ],
    created_at: '12/10/2022',
    num_comment: 1,
    reactions: ['1220'],
  },
];

const Home = () => {
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const {following, trending} = useData();
  const [products, setProducts] = useState(following);
  const {assets, colors, fonts, gradients, sizes} = useTheme();

  // const handleProducts = useCallback(
  //   (tab: number) => {
  //     setTab(tab);
  //     setProducts(tab === 0 ? following : trending);
  //   },
  //   [following, trending, setTab, setProducts],
  // );

  return (
    <Block>
      {/* search input */}
      {/* <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input search placeholder={t('common.search')} />
      </Block> */}

      {/* toggle products list */}
      {/* <Block
        row
        flex={0}
        align="center"
        justify="center"
        color={colors.card}
        paddingBottom={sizes.sm}>
        <Button onPress={() => handleProducts(0)}>
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 0 ? 'primary' : 'secondary']}>
              <Image source={assets.extras} color={colors.white} radius={0} />
            </Block>
            <Text p font={fonts?.[tab === 0 ? 'medium' : 'normal']}>
              {t('home.following')}
            </Text>
          </Block>
        </Button>
        <Block
          gray
          flex={0}
          width={1}
          marginHorizontal={sizes.sm}
          height={sizes.socialIconSize}
        />
        <Button onPress={() => handleProducts(1)}>
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 1 ? 'primary' : 'secondary']}>
              <Image
                radius={0}
                color={colors.white}
                source={assets.documentation}
              />
            </Block>
            <Text p font={fonts?.[tab === 1 ? 'medium' : 'normal']}>
              {t('home.trending')}
            </Text>
          </Block>
        </Button>
      </Block> */}

      {/* products list */}
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block marginTop={sizes.sm}>
          {POST_DATA?.map((post) => (
            <Post post={post} />
          ))}
        </Block>
      </Block>
    </Block>
  );
};

export default Home;

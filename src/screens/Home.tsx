import React, {useEffect} from 'react';

import {useMst, useTheme} from '../hooks/';
import {Block} from '../components/atoms';
import {IPost} from '../constants/types';
import {Post} from '../components/organisms';
import {observer} from 'mobx-react-lite';

const Home = () => {
  const {sizes} = useTheme();
  const {
    posts: {rows, count, setPosts, loadPosts},
  } = useMst();

  useEffect(() => {
    setPosts();
  }, [setPosts]);

  const _handleScrollBottom = () => {
    if (rows.lenght < count) {
      loadPosts();
    }
  };
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
        load={_handleScrollBottom}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        <Block marginTop={sizes.sm}>
          {rows.map((post: IPost) => (
            <Post key={post._id} post={post} />
          ))}
        </Block>
      </Block>
    </Block>
  );
};

export default observer(Home);

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Platform,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {Block, Button, Image, Text} from '../components/atoms';
import {useMst, useTheme, useTranslation} from '../hooks/';
import {Post} from '../components/organisms';
import {observer} from 'mobx-react-lite';
import {Card} from '../components/molecules';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {IParamList} from '../constants/types';
import _ from 'lodash';
import {TPostModel} from '../stores/models/PostModel';
import {TFoodModel} from '../stores/models/FoodModel';

const isAndroid = Platform.OS === 'android';

const Profile = observer(() => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<IParamList, 'Profile'>>();
  const {
    user: {profile, setPosts, loadPosts, setFoods, loadFoods, posts, foods},
  } = route.params;
  const store = useMst();
  const {assets, colors, sizes, gradients, icons} = useTheme();
  const [selected, setSelected] = useState<string>('POST');
  const isCurrentUser = useMemo(
    () => store.user.profile._id === profile._id,
    [profile._id, store.user.profile._id],
  );
  const isFollowed = useMemo(
    () => _.includes(store.user.profile.following, profile._id),
    [profile._id, store.user.profile.following],
  );
  // const {isDark} = useData();

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

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

  const _formatNum = (num: number) => {
    if (num >= 1000) {
      return String((num / 1000).toFixed(1)) + 'k';
    }
    return String(num);
  };

  const _handleNavigateUserList = (name: string) => {
    navigation.navigate(
      t('navigation.userList') as never,
      {
        name: name,
        user_id: profile._id,
      } as never,
    );
  };

  const _handleFollowingPress = () => {
    _handleNavigateUserList('Following');
  };

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
            gradient={gradients?.[selected === 'POST' ? 'primary' : 'white']}>
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
            gradient={gradients?.[selected === 'FOOD' ? 'primary' : 'white']}>
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

  useEffect(() => {
    setPosts();
    setFoods();
  }, [setFoods, setPosts]);

  const _handleLoadMorePosts = useCallback(() => {
    if (posts.rows.length < posts.count) {
      loadPosts();
    }
  }, [loadPosts, posts.count, posts.rows]);

  const _handleLoadMoreFoods = useCallback(() => {
    if (foods.rows.length < foods.count) {
      loadFoods();
    }
  }, [foods.count, foods.rows, loadFoods]);

  const _renderPostItem: ListRenderItem<TPostModel> = ({item}) => {
    return <Post key={item._id} post={item} />;
  };

  const _renderFoodItem: ListRenderItem<TFoodModel> = ({item}) => {
    return (
      <Card
        image={{uri: item.photo}}
        title={item.name}
        description={item.about}
        subcription={String(item.score?.toFixed(1))}
        marginBottom={sizes.s}
      />
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
            source={{uri: profile.cover_url}}>
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
                <Button white outlined shadow={false} radius={sizes.m}>
                  <Block
                    justify="center"
                    radius={sizes.m}
                    paddingHorizontal={sizes.m}
                    color="rgba(255,255,255,0.2)">
                    <Text white bold transform="uppercase">
                      {t(
                        isCurrentUser
                          ? 'common.editProfile'
                          : isFollowed
                          ? 'common.followed'
                          : 'common.follow',
                      )}
                    </Text>
                  </Block>
                </Button>
                {isCurrentUser && (
                  <Button
                    shadow={false}
                    radius={sizes.m}
                    marginHorizontal={sizes.sm}
                    color="rgba(255,255,255,0.2)"
                    outlined={String(colors.white)}
                    // onPress={() => handleSocialLink('twitter')}
                  >
                    <FontAwesome
                      size={18}
                      name={icons.photo}
                      color={colors.white}
                    />
                  </Button>
                )}
                {isCurrentUser && (
                  <Button
                    shadow={false}
                    radius={sizes.m}
                    color="rgba(255,255,255,0.2)"
                    outlined={String(colors.white)}
                    // onPress={() => handleSocialLink('dribbble')}
                  >
                    <FontAwesome
                      size={18}
                      name={icons.edit}
                      color={colors.white}
                    />
                  </Button>
                )}
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
              color={colors.white}
              row
              //blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-between"
              paddingVertical={sizes.sm}
              paddingHorizontal={sizes.s}
              renderToHardwareTextureAndroid>
              <Block width="20%" align="center">
                <Text h5>{_formatNum(posts.count)}</Text>
                <Text color={colors.text}>{t('profile.posts')}</Text>
              </Block>
              <Block width="20%" align="center">
                <Text h5>{_formatNum(foods.count)}</Text>
                <Text color={colors.text}>{t('profile.foods')}</Text>
              </Block>
              <Block width="30%" align="center">
                <Text h5>{_formatNum(profile.follower.length)}</Text>
                <Text color={colors.text}>{t('profile.followers')}</Text>
              </Block>
              <TouchableOpacity
                onPress={_handleFollowingPress}
                activeOpacity={1}>
                <Block align="center">
                  <Text h5>{_formatNum(profile.following.length)}</Text>
                  <Text color={colors.text}>{t('profile.following')}</Text>
                </Block>
              </TouchableOpacity>
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
                source={
                  posts.rows[0]
                    ? {uri: posts.rows[0].photos[0]}
                    : assets?.photo1
                }
                style={{
                  width: IMAGE_VERTICAL_SIZE + IMAGE_MARGIN / 2,
                  height: IMAGE_VERTICAL_SIZE * 2 + IMAGE_VERTICAL_MARGIN,
                }}
              />
              <Block marginLeft={sizes.m}>
                <Image
                  resizeMode="cover"
                  source={
                    posts.rows[1]
                      ? {uri: posts.rows[1].photos[0]}
                      : assets?.photo2
                  }
                  marginBottom={IMAGE_VERTICAL_MARGIN}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
                <Image
                  resizeMode="cover"
                  source={
                    posts.rows[3]
                      ? {uri: posts.rows[3].photos[0]}
                      : assets?.photo3
                  }
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
          {selected === 'POST' ? (
            <FlatList
              // refreshing={loader}
              data={posts.rows}
              renderItem={_renderPostItem}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              // ListFooterComponent={loader ? <MoreLoader /> : null}
              // ItemSeparatorComponent={ListSeparator}
              onEndReachedThreshold={0.5}
              onEndReached={_handleLoadMorePosts}
            />
          ) : (
            <FlatList
              // refreshing={loader}
              data={foods.rows}
              renderItem={_renderFoodItem}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              // ListFooterComponent={loader ? <MoreLoader /> : null}
              // ItemSeparatorComponent={ListSeparator}
              onEndReachedThreshold={0.5}
              onEndReached={_handleLoadMoreFoods}
            />
          )}
        </Block>
      </Block>
    </Block>
  );
});

export default Profile;

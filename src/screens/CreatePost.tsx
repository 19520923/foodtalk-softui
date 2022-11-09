import React, {useCallback, useState} from 'react';
import {Block, Image, Input, Switch, Text} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {useTheme, useTranslation} from '../hooks';
import {SliderBox} from 'react-native-image-slider-box';
import {HEIGHT, IMAGE_HEIGHT, WIDTH} from '../constants/constants';
import {TouchableOpacity} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {IPost} from '../constants/types';
import RootStore from '../stores/RootStore';
import {useNavigation} from '@react-navigation/native';

const CreatePost = () => {
  const {colors, sizes, icons} = useTheme();
  const {
    user: {profile},
  } = RootStore;
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [showModal, setModal] = useState<boolean>(false);
  const [photos, setPhotos] = useState<Array<any>>([]);
  const [postData, setPostData] = useState<IPost>({
    is_public: true,
    photos: [],
    foods: [],
    content: '',
    location: {
      name: '',
      lat: '',
      lng: '',
    },
  });

  const CREATE_POST_ACTION = [
    {
      name: t('createPost.choosePhotos'),
      desc: t('createPost.choosePhotosDesc'),
      icon: icons.photo,
      onPress: () => _handleChoosePhotos(),
    },
    {
      name: t('createPost.chooseRecipe'),
      desc: t('createPost.chooseRecipeDesc'),
      icon: icons.food,
      onPress: () => null,
    },
    {
      name: t('createPost.checkin'),
      desc: t('createPost.checkinDesc'),
      icon: icons.checkin,
      onPress: () => _handleCheckin(),
    },
  ];

  const _handleChoosePhotos = () => {
    navigation.navigate(t('navigation.imagePicker'), {onCallback: _handleSetPhotos});
  };

  const _handleCheckin = () => {
    navigation.navigate(t('navigation.checkin'), {onDone: onDone})
  }

  const _handleSetPhotos = (array: Array<any>) => {
    setPhotos(array);
  };

  const _handleChange = useCallback(
    (value) => {
      setPostData((state) => ({...state, ...value}));
    },
    [setPostData],
  );

  const onDone = (address: string, region: any) => {
    _handleChange({
      location: {
        name: address,
        lat: region.latitude,
        lng: region.longtitude
    }})
  }


  return (
    <Block safe>
      <Block scroll flex={0} paddingTop={sizes.s}>
        <Block>
          <ImageDesc
            title={profile.name}
            image={{ uri: profile.avatar_url }}
            description= 'Hello'
            // description={
            //   postData.location
            //     ? postData.location?.name
            //     : profile.username
            // }
          />
          <Block
            row
            flex={0}
            align="center"
            padding={sizes.s}
            justify="space-between">
            <Block row>
              <Text p semibold>
                {postData.is_public ? 'Public' : 'Only me'}
              </Text>
              <Text p marginLeft={sizes.s}>
                {postData.is_public
                  ? '(Every one can see your post)'
                  : '(Only me can see your post)'}
              </Text>
            </Block>
            <Switch
              marginRight={sizes.s}
              checked={postData.is_public}
              onPress={(checked) => _handleChange({is_public: checked})}
            />
          </Block>
          <Block keyboard>
            <Input
              placeholder="How about to day, Tan?"
              multiline
              noBorder
              onChangeText={(value) => _handleChange({content: value})}
            />
          </Block>
          <Block marginTop={sizes.s} marginBottom={sizes.sm}>
            <SliderBox
              images={photos}
              sliderBoxHeight={IMAGE_HEIGHT}
              onCurrentImagePressed={(index: number) =>
                console.warn(`image ${index} pressed`)
              }
              dotColor={colors.primary}
              inactiveDotColor={colors.icon}
              paginationBoxVerticalPadding={20}
              autoplay
              circleLoop
              dotStyle={{
                width: sizes.s,
                height: sizes.s,
              }}
              autoplayInterval={10000}
            />
          </Block>
        </Block>
        <Block scroll horizontal paddingHorizontal={sizes.s}>
          {postData.foods?.map((e, index) => (
            <Image
              key={index}
              avatar
              marginRight={sizes.s}
              source={{uri: e.photo}}
            />
          ))}
        </Block>
      </Block>
      <Block style={{position: 'absolute', bottom: 0, width: '100%'}} card>
        {!showModal ? (
          <TouchableOpacity
            onPressIn={() => setModal(true)}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            {CREATE_POST_ACTION.map((e, index) => (
              <FontAwesome
                key={index}
                name={e.icon}
                size={sizes.icon}
                color={colors.icon}
              />
            ))}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPressIn={() => setModal(false)}
            style={{
              position: 'absolute',
              width: WIDTH,
              height: HEIGHT,
              bottom: 0,
              left: 0,
            }}>
            <Block
              card
              style={{position: 'absolute', bottom: 0, width: '100%'}}>
              {CREATE_POST_ACTION.map((e, index) => (
                <TouchableOpacity key={index} onPress={e.onPress}>
                  <Block flex={0} paddingVertical={sizes.s}>
                    <ImageDesc
                      icon={e.icon}
                      size={sizes.icon}
                      title={e.name}
                      description={e.desc}
                    />
                  </Block>
                </TouchableOpacity>
              ))}
            </Block>
          </TouchableOpacity>
        )}
      </Block>
    </Block>
  );
};

export default CreatePost;

/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Block, Button, Image, Input, Text} from '../components/atoms';
import {IUser} from '../constants/types';
import {upload, useMst, useTheme, useTranslation} from '../hooks';
import API from '../services/axiosClient';
import {TouchableOpacity} from 'react-native';

const EditProfile = () => {
  const {sizes, colors} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {
    user: {
      profile: {name, username, email, about, avatar_url},
      setProfile,
    },
  } = useMst();
  const [profileData, setProfileData] = useState<IUser>({
    name: name,
    username: username,
    about: about,
  });

  const [avat, setAvat] = useState(avatar_url);

  const _handleChange = useCallback(
    (value) => {
      setProfileData((state) => ({...state, ...value}));
    },
    [setProfileData],
  );

  const _handleDone = useCallback(async () => {
    let data = {};
    if (avat !== avatar_url) {
      const a = await upload('avatar', avat);
      data = {...profileData, avatar_url: a};
    } else {
      data = {...profileData};
    }
    const user = await API.updateProfile(data);
    if (user) {
      setProfile(user);
      navigation.goBack();
    }
  }, [avat, avatar_url, navigation, profileData, setProfile]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button minHeight={sizes.l} onPress={_handleDone}>
          <Text semibold primary>
            Done
          </Text>
        </Button>
      ),
    });
  }, [_handleDone, navigation, sizes.l]);

  const _handleChoosePhotos = () => {
    navigation.navigate(
      t('navigation.imagePicker') as never,
      {
        onCallback: (array: Array<any>) => setAvat(array[0]),
      } as never,
    );
  };

  return (
    <Block scroll>
      <Block flex={0} align="center">
        <TouchableOpacity onPress={_handleChoosePhotos}>
          <Image
            width={80}
            height={80}
            marginBottom={sizes.sm}
            style={{opacity: 0.7}}
            source={{
              uri: avat,
            }}
          />
        </TouchableOpacity>
      </Block>
      <Block paddingHorizontal={sizes.m} paddingTop={sizes.sm}>
        <Input
          label="Name"
          value={profileData.name}
          onChangeText={(text) => _handleChange({name: text})}
          noBorder
          marginBottom={sizes.sm}
          style={{borderBottomWidth: 0.5, borderBottomColor: colors.black}}
          selectTextOnFocus
        />
        <Input
          label="Username"
          value={profileData.username}
          onChangeText={(text) => _handleChange({username: text})}
          marginBottom={sizes.sm}
          noBorder
          style={{borderBottomWidth: 0.5, borderBottomColor: colors.black}}
          selectTextOnFocus
        />
        <Input
          color={colors.black}
          disabled
          value={email}
          label="Email"
          marginBottom={sizes.sm}
          noBorder
          style={{borderBottomWidth: 0.5, borderBottomColor: colors.black}}
        />
        <Input
          label="About"
          value={profileData.about}
          onChangeText={(text) => _handleChange({about: text})}
          marginBottom={sizes.sm}
          noBorder
          style={{borderBottomWidth: 0.5, borderBottomColor: colors.black}}
          selectTextOnFocus
        />
      </Block>
    </Block>
  );
};

export default EditProfile;

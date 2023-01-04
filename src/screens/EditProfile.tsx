/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Block, Button, Input, Text} from '../components/atoms';
import {IUser} from '../constants/types';
import {useMst, useTheme} from '../hooks';
import API from '../services/axiosClient';

const EditProfile = () => {
  const {sizes, colors} = useTheme();
  const navigation = useNavigation();
  const {
    user: {
      profile: {name, username, email, about},
      setProfile,
    },
  } = useMst();
  const [profileData, setProfileData] = useState<IUser>({
    name: name,
    username: username,
    about: about,
  });

  const _handleChange = useCallback(
    (value) => {
      setProfileData((state) => ({...state, ...value}));
    },
    [setProfileData],
  );

  const _handleDone = useCallback(async () => {
    console.log(profileData);
    const user = await API.updateProfile(profileData);
    if (user) {
      setProfile(user);
      navigation.goBack();
    }
  }, [navigation, profileData, setProfile]);

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

  return (
    <Block scroll>
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

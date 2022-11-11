import React, {useCallback, useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import * as regex from '../constants/regex';

import {Storage, useData, useMst, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Input, Image, Text} from '../components/atoms';
import {FontAwesome} from '@expo/vector-icons';
import _ from 'lodash';
import API from '../services/axiosClient';
import {ACCESS_TOKEN} from '../constants/constants';

const isAndroid = Platform.OS === 'android';

interface ILogin {
  email: string;
  password: string;
}
interface ILoginValidation {
  email: boolean;
  password: boolean;
}

const Login = () => {
  const {isDark} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState<ILoginValidation>({
    email: false,
    password: false,
  });
  const [userData, setUserData] = useState<ILogin>({
    email: '',
    password: '',
  });
  const {assets, colors, gradients, sizes} = useTheme();
  const {setIsLoggedIn, user} = useMst();

  const _handleChange = useCallback(
    (value) => {
      setUserData((state) => ({...state, ...value}));
    },
    [setUserData],
  );

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      email: regex.email.test(userData.email),
      password: regex.password.test(userData.password),
    }));
  }, [userData, setIsValid]);

  const _handleLogin = async () => {
    try {
      const data = await API.login(userData);
      setIsLoggedIn(true);
      user?.setProfile(data.user);
      await Storage.setItem(ACCESS_TOKEN, data.token);
    } catch (err) {
      const message = _.get(err, 'message', JSON.stringify(err));
      console.log(message);
      // display error message to toask here
    } finally {
    }
  };

  return (
    <Block safe>
      <Block flex={0} style={{zIndex: 0}}>
        <Image
          background
          resizeMode="cover"
          padding={sizes.sm}
          radius={sizes.cardRadius}
          source={assets.background}
          height={sizes.height * 0.4}
        />
      </Block>
      {/* register form */}
      <Block
        keyboard
        behavior={!isAndroid ? 'padding' : 'height'}
        marginTop={-(sizes.height * 0.2 - sizes.l)}>
        <Block
          flex={0}
          radius={sizes.sm}
          marginHorizontal="8%"
          shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
        >
          <Block
            blur
            flex={0}
            intensity={90}
            radius={sizes.sm}
            overflow="hidden"
            justify="space-evenly"
            tint={colors.blurTint}
            paddingVertical={sizes.sm}>
            <Text p semibold center>
              {t('login.subtitle')}
            </Text>
            {/* social buttons */}
            <Block row center justify="space-evenly" marginVertical={sizes.m}>
              <Button outlined gray shadow={!isAndroid}>
                <FontAwesome
                  name={assets.facebook}
                  size={sizes.m}
                  color={isDark ? colors.icon : undefined}
                />
              </Button>
              <Button outlined gray shadow={!isAndroid}>
                <FontAwesome
                  name={assets.apple}
                  size={sizes.m}
                  color={isDark ? colors.icon : undefined}
                />
              </Button>
              <Button outlined gray shadow={!isAndroid}>
                <FontAwesome
                  name={assets.google}
                  size={sizes.m}
                  color={isDark ? colors.icon : undefined}
                />
              </Button>
            </Block>
            <Block
              row
              flex={0}
              align="center"
              justify="center"
              marginBottom={sizes.sm}
              paddingHorizontal={sizes.xxl}>
              <Block
                flex={0}
                height={1}
                width="50%"
                end={[1, 0]}
                start={[0, 1]}
                gradient={gradients.divider}
              />
              <Text center marginHorizontal={sizes.s}>
                {t('common.or')}
              </Text>
              <Block
                flex={0}
                height={1}
                width="50%"
                end={[0, 1]}
                start={[1, 0]}
                gradient={gradients.divider}
              />
            </Block>
            {/* form inputs */}
            <Block paddingHorizontal={sizes.sm}>
              <Input
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={t('common.email')}
                keyboardType="email-address"
                placeholder={t('common.emailPlaceholder')}
                success={Boolean(userData.email && isValid.email)}
                danger={Boolean(userData.email && !isValid.email)}
                onChangeText={(value) => _handleChange({email: value})}
              />
              <Input
                secureTextEntry
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={t('common.password')}
                placeholder={t('common.passwordPlaceholder')}
                onChangeText={(value) => _handleChange({password: value})}
                success={Boolean(userData.password && isValid.password)}
                danger={Boolean(userData.password && !isValid.password)}
              />
            </Block>
            <Button
              onPress={_handleLogin}
              marginVertical={sizes.s}
              marginHorizontal={sizes.sm}
              gradient={gradients.primary}
              disabled={Object.values(isValid).includes(false)}>
              <Text bold white transform="uppercase">
                {t('common.signin')}
              </Text>
            </Button>
            <Button
              primary
              outlined
              shadow={!isAndroid}
              marginVertical={sizes.s}
              marginHorizontal={sizes.sm}
              onPress={() => navigation.navigate(t('navigation.register'))}>
              <Text bold primary transform="uppercase">
                {t('common.signup')}
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Login;

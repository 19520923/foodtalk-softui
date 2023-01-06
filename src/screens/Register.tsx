import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/atoms';
import {FontAwesome} from '@expo/vector-icons';
import API from '../services/axiosClient';
import {IRegistration} from '../constants/types';
import _ from 'lodash';
import {showMessage} from 'react-native-flash-message';
import {Loading} from '../components/commons';

const isAndroid = Platform.OS === 'android';

interface IRegistrationValidation {
  username: boolean;
  name: boolean;
  email: boolean;
  password: boolean;
  agreed: boolean;
}

const Register = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [agreed, setAgreed] = useState(false);
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    username: false,
    name: false,
    email: false,
    password: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    username: '',
    name: '',
    email: '',
    password: '',
  });
  const {assets, colors, gradients, sizes, icons} = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({...state, ...value}));
    },
    [setRegistration],
  );

  const handleSignUp = useCallback(async () => {
    setIsLoading(true);
    if (!Object.values(isValid).includes(false)) {
      try {
        await API.register(registration);
        setIsLoading(false);
        showMessage({
          message: 'Register Successfully',
          description: 'Let login now',
          type: 'success',
        });
        navigation.goBack();
      } catch (err) {
        setIsLoading(false);
        const message = _.get(err, 'message', JSON.stringify(err));
        console.log(message);
        // display error message to toask here
        showMessage({
          message: 'Login Fail',
          description: 'Incorrect Information! Please Check ',
          type: 'danger',
        });
      } finally {
      }
    }
  }, [isValid, navigation, registration]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      username: regex.username.test(registration.username),
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      agreed: agreed,
    }));
  }, [agreed, registration, setIsValid]);

  return (
    <Block color={colors.cover1} safe>
      <Block>
        <Block flex={0} style={{zIndex: 0}}>
          <Image
            background
            resizeMode="cover"
            paddingHorizontal={sizes.sm}
            paddingTop={sizes.l}
            radius={sizes.cardRadius}
            source={assets.background}
            height={sizes.height * 0.4}>
            <Button
              row
              flex={0}
              justify="flex-start"
              align="center"
              onPress={() => navigation.goBack()}>
              <FontAwesome
                size={sizes.icon}
                color={colors.white}
                name={icons.back}
              />
              <Text p white marginLeft={sizes.sm}>
                {t('register.title')}
              </Text>
            </Button>
          </Image>
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
                {t('register.subtitle')}
              </Text>
              {/* social buttons */}
              <Block row center justify="space-evenly" marginVertical={sizes.m}>
                <Button outlined gray shadow={!isAndroid}>
                  <FontAwesome
                    name={icons.facebook}
                    size={sizes.icon}
                    color={colors.facebook}
                  />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <FontAwesome
                    name={icons.apple}
                    size={sizes.icon}
                    color={colors.iconAuth}
                  />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <FontAwesome
                    name={icons.google}
                    size={sizes.icon}
                    color={colors.iconAuth}
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
                  label={t('common.username')}
                  placeholder={t('common.usernamePlaceholder')}
                  success={Boolean(registration.username && isValid.username)}
                  danger={Boolean(registration.username && !isValid.username)}
                  onChangeText={(value) => handleChange({username: value})}
                />
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.name')}
                  placeholder={t('common.namePlaceholder')}
                  success={Boolean(registration.name && isValid.name)}
                  danger={Boolean(registration.name && !isValid.name)}
                  onChangeText={(value) => handleChange({name: value})}
                />
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.email')}
                  keyboardType="email-address"
                  placeholder={t('common.emailPlaceholder')}
                  success={Boolean(registration.email && isValid.email)}
                  danger={Boolean(registration.email && !isValid.email)}
                  onChangeText={(value) => handleChange({email: value})}
                />
                <Input
                  secureTextEntry
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t('common.password')}
                  placeholder={t('common.passwordPlaceholder')}
                  onChangeText={(value) => handleChange({password: value})}
                  success={Boolean(registration.password && isValid.password)}
                  danger={Boolean(registration.password && !isValid.password)}
                />
              </Block>
              {/* checkbox terms */}
              <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
                <Checkbox
                  marginRight={sizes.sm}
                  checked={agreed}
                  onPress={(value) => setAgreed(value)}
                />
                <Text color={colors.boldText} paddingRight={sizes.s}>
                  {t('common.agree')}
                  <Text
                    color={colors.blueText}
                    semibold
                    onPress={() => {
                      Linking.openURL('https://www.creative-tim.com/terms');
                    }}>
                    {t('common.terms')}
                  </Text>
                </Text>
              </Block>
              <Button
                onPress={handleSignUp}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false)}>
                <Text bold color={colors.whiteAuth} transform="uppercase">
                  {t('common.signup')}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
      {isLoading && <Loading />}
    </Block>
  );
};

export default Register;

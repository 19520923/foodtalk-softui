import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';

import {useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Image, Input, Text} from '../components/atoms';
import {FontAwesome} from '@expo/vector-icons';
import {Platform} from 'react-native';
import {IRegistration} from '../constants/types';

const isAndroid = Platform.OS === 'android';

const ForgotPassword = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
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
    agreed: false,
  });
  const {assets, colors, sizes, icons} = useTheme();

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

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
                {t('forgot.title')}
              </Text>
            </Button>
          </Image>
        </Block>
        {/* reset password form */}
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
              <Text color={colors.boldText} p semibold center>
                Forgot password
              </Text>
              {/* social buttons */}
              <Block marginTop={10} paddingHorizontal={sizes.sm}>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.xl}
                  label={t('common.email')}
                  keyboardType="email-address"
                  placeholder={t('common.emailPlaceholder')}
                />
                <Button primary outlined shadow={!isAndroid}>
                  <Text bold primary transform="uppercase">
                    Reset Password
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default ForgotPassword;

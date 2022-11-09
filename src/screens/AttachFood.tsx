import _ from 'lodash';
import React, {useCallback, useState} from 'react';
import { TouchableOpacity } from 'react-native';
import {Block, Text} from '../components/atoms';
import {Card} from '../components/molecules';
import {IFood} from '../constants/types';
import {useTheme, useTranslation} from '../hooks';

const AttachFood = () => {
  const {t} = useTranslation();
  const {assets, sizes} = useTheme();
  const [selected, setSelected] = useState<Array<IFood>>([]);

  const _handleSelected = useCallback(
    (value) => {
      setSelected((state) => [...state, value]);
    },
    [setSelected],
  );

  const _handleRemoved = useCallback(
    (value) => {
      setSelected((state) => [..._.remove(state, (e) => e._id === value._id)]);
    },
    [setSelected],
  );

  return (
    <Block scroll padding={sizes.s}>
      <Text h5 semibold marginBottom={sizes.s}>
        {t('common.selected')}
      </Text>
      <Block scroll horizontal paddingBottom={sizes.s}>
        {selected.map((e, index) => (
          <TouchableOpacity onPress={_handleRemoved}>
            <Card
              key={index}
              inline
              description={e.about}
              image={{uri: e.photo}}
              title={e.name}
              subcription={String(e.score?.toFixed(1))}
              marginRight={sizes.s}
            />
          </TouchableOpacity>
        ))}
      </Block>
      <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
        {t('search.foods')}
      </Text>
      <Block>
        <Card
          image={assets.avatar1}
          title="Nguyen Nhut Tan"
          description="This is a example about ... this is a a"
          subcription="3k following - 2k follower"
          marginBottom={sizes.s}
        />
        <Card
          image={assets.avatar1}
          title="Nguyen Nhut Tan"
          description="This is a example about ... infomation"
          subcription="3k following - 2k follower"
          marginBottom={sizes.s}
        />
      </Block>
    </Block>
  );
};

export default AttachFood;

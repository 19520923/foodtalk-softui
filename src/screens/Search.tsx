import React from 'react';
import {Block, Text} from '../components/atoms';
import {Card} from '../components/molecules';
import {useTheme, useTranslation} from '../hooks';

const Search = () => {
  const {t} = useTranslation();
  const {assets, sizes} = useTheme();

  return (
    <Block scroll padding={sizes.s}>
      <Text h5 semibold marginBottom={sizes.s}>
        {t('common.foods')}
      </Text>
      <Block scroll horizontal paddingBottom={sizes.s}>
        <Card
          inline
          description="This is a example of food card"
          image={assets.card1}
          title="Beefsteck"
          subcription="10"
          marginRight={sizes.s}
        />
        <Card
          inline
          description="This is a example of food card"
          image={assets.card1}
          title="Beefsteck"
          subcription="10"
          marginRight={sizes.s}
        />
        <Card
          inline
          description="This is a example of food card"
          image={assets.card1}
          title="Beefsteck"
          subcription="10"
          marginRight={sizes.s}
        />
      </Block>
      <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
        {t('search.users')}
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

export default Search;

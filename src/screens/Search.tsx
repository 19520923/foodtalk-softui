import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Block, Text} from '../components/atoms';
import {ImageDesc, Card} from '../components/molecules';
import {useTheme, useTranslation} from '../hooks';

type Props = {};

const Search = (props: Props) => {
  const {t} = useTranslation();
  const {assets, sizes} = useTheme();

  return (
    <Block scroll padding={sizes.s}>
      <Block scroll horizontal>
        <Card
          inline
          description="This is a example of food card"
          image={assets.card1}
          title="Beefsteck"
          subcription="10"
        />
        <Card
          inline
          description="This is a example of food card"
          image={assets.card1}
          title="Beefsteck"
          subcription="10"
        />
        <Card
          inline
          description="This is a example of food card"
          image={assets.card1}
          title="Beefsteck"
          subcription="10"
        />
      </Block>
      <Block marginTop={sizes.s}>
        <Card
          image={assets.avatar1}
          title="Nguyen Nhut Tan"
          description="This is a example about ... this is a a"
          subcription="3k following - 2k follower"
        />
        <Card
          image={assets.avatar1}
          title="Nguyen Nhut Tan"
          description="This is a example about ... infomation"
          subcription="3k following - 2k follower"
        />
      </Block>
    </Block>
  );
};

export default Search;

import {FontAwesome} from '@expo/vector-icons';
import React, {useState} from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import {Block, Button, Image, Input} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {useTheme} from '../hooks';

const isAndroid = Platform.OS === 'android';

const commentsFood = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const FoodEvaluate = () => {
  const {sizes, colors, icons} = useTheme();
  const [payload, setPayload] = useState({
    food: '1234',
    score: 10,
  });
  const maxRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const starImgFilled =
    'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
  const starImgCorner =
    'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';

  const onRatingChange = (rate: any) => {
    setPayload({...payload, score: rate});
  };

  const CustomRatingBar = () => {
    return (
      <Block row justify="center" align="center" paddingVertical={sizes.sm}>
        {maxRating.map((item) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => onRatingChange(item)}>
              <Image
                resizeMode="cover"
                style={{width: 30, height: 30}}
                source={
                  item <= payload.score
                    ? {uri: starImgFilled}
                    : {uri: starImgCorner}
                }
              />
            </TouchableOpacity>
          );
        })}
      </Block>
    );
  };

  return (
    <Block keyboard color={colors.white} paddingTop={sizes.s} bottom={sizes.s}>
      <Block paddingTop={sizes.sm} color={colors.background} scroll>
        {commentsFood.map((e) => {
          return (
            <ImageDesc
              size={sizes.xl}
              image={{
                uri: 'https://img.timviec.com.vn/2021/10/chef-la-gi-4.jpg',
              }}
              title={'Dang Duy Bang'}
              description={'Delicous!'}
              info={{
                created_at: 'an hour ago',
                likes: 2,
              }}
            />
          );
        })}
      </Block>

      <Block color={colors.white}>
        <CustomRatingBar />
        <Block row align="center" padding={sizes.s}>
          <Block>
            <Input placeholder="Write your comment" />
          </Block>
          <Button paddingLeft={sizes.s}>
            <FontAwesome
              name={icons.send}
              color={colors.icon}
              size={sizes.icon}
            />
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default FoodEvaluate;

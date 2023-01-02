import {FontAwesome} from '@expo/vector-icons';
import {useRoute, RouteProp} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Block, Button, Image, Input} from '../components/atoms';
import {ImageDesc} from '../components/molecules';
import {maxRating, starImgCorner, starImgFilled} from '../constants/constants';
import {IParamList} from '../constants/types';
import {useTheme} from '../hooks';
import API from '../services/axiosClient';
import {observer} from 'mobx-react-lite';
import {TFoodRateModel} from '../stores/models/FoodModel';
const isAndroid = Platform.OS === 'android';

const FoodEvaluate = () => {
  const {sizes, colors, icons} = useTheme();
  const route = useRoute<RouteProp<IParamList, 'Food'>>();
  const {food} = route.params;
  const [payload, setPayload] = useState({
    food: food._id,
    score: 10,
    content: '',
  });

  const _handleChange = useCallback((value) => {
    setPayload((state) => ({...state, ...value}));
  }, []);

  const _handleSubmit = async () => {
    _handleChange({score: 10, content: ''});
    await API.addRate(payload);
  };

  const CustomRatingBar = () => {
    return (
      <Block row justify="center" align="center" paddingVertical={sizes.sm}>
        {maxRating.map((item) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => _handleChange({score: item})}>
              <Image
                resizeMode="cover"
                width={30}
                height={30}
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

  const _renderItem: ListRenderItem<TFoodRateModel> = ({item}) => (
    <ImageDesc
      size={sizes.xl}
      image={{
        uri: item.author.avatar_url,
      }}
      title={item.author.name}
      description={item.content}
      info={{
        created_at: item.created_at,
        score: item.score,
      }}
    />
  );

  return (
    <Block
      safe
      color={colors.white}
      paddingTop={sizes.s}
      bottom={sizes.s}
      behavior={!isAndroid ? 'padding' : 'height'}>
      <Block paddingTop={sizes.sm} color={colors.background}>
        <FlatList
          // refreshing={loader}
          data={food.rates.rows}
          renderItem={_renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          // ListFooterComponent={loader ? <MoreLoader /> : null}
          // ItemSeparatorComponent={ListSeparator}
          onEndReachedThreshold={0.5}
          onEndReached={food.loadRates}
        />
      </Block>

      <Block
        color={colors.background}
        position="absolute"
        bottom={0}
        left={0}
        width="100%">
        <CustomRatingBar />
        <Block row align="center" padding={sizes.s}>
          <Block>
            <Input
              placeholder="Write your comment"
              value={payload.content}
              onChangeText={(text) => _handleChange({content: text})}
            />
          </Block>
          <Button paddingLeft={sizes.s} onPress={_handleSubmit}>
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

export default observer(FoodEvaluate);

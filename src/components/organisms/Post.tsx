import React from 'react';
import {useMst, useTheme, useTranslation} from '../../hooks';
import {Block, Image} from '../atoms';
import {ImageDesc, Carousel} from '../molecules';
import {FontAwesome} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {TPostModel} from '../../stores/models/PostModel';
import {TFoodModel} from '../../stores/models/FoodModel';
import API from '../../services/axiosClient';

type Props = {
  post: TPostModel;
};

const Post = ({post}: Props) => {
  const {colors, sizes, icons} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {
    user: {profile},
  } = useMst();

  const {
    _id,
    author,
    content,
    photos,
    reactions,
    num_comment,
    created_at,
    foods,
    getIsLiked,
  } = post;

  const _handleNavigateComment = () => {
    navigation.navigate(
      t('navigation.comment') as never,
      {post: post} as never,
    );
  };

  const _handleNavigateToProfile = () => {
    // addUser(author);
    // navigation.navigate(
    //   t('navigation.profileScreen') as never,
    //   {user: getById(author._id)} as never,
    // );
  };

  const _handleNavigateToFood = (food: TFoodModel) => {
    navigation.navigate(
      t('navigation.foodDetail') as never,
      {food: food} as never,
    );
  };

  const _handleLike = async () => {
    await API.likePost(_id);
  };

  const actionsLeft = () => (
    <Block row>
      <TouchableOpacity
        onPress={_handleLike}
        style={{marginRight: sizes.s, paddingHorizontal: sizes.s}}>
        {getIsLiked(profile._id) ? (
          <FontAwesome
            name={icons.heart}
            color={colors.danger}
            size={sizes.icon}
          />
        ) : (
          <FontAwesome
            name={icons.heart_o}
            color={colors.icon}
            size={sizes.icon}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={_handleNavigateComment}
        style={{marginRight: sizes.s, paddingHorizontal: sizes.s}}>
        <FontAwesome
          name={icons.comment}
          color={colors.icon}
          size={sizes.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginRight: sizes.s, paddingHorizontal: sizes.s}}>
        <FontAwesome name={icons.share} color={colors.icon} size={sizes.icon} />
      </TouchableOpacity>
    </Block>
  );

  const actionsRight = () => {
    return (
      <Block row scroll horizontal>
        {foods?.map((food) => (
          <TouchableOpacity
            key={food._id}
            onPress={() => _handleNavigateToFood(food)}
            activeOpacity={1}>
            <Image source={{uri: food.photo}} avatar marginRight={sizes.s} />
          </TouchableOpacity>
        ))}
      </Block>
    );
  };

  return (
    <Block white marginBottom={sizes.s} paddingVertical={sizes.sm}>
      <TouchableOpacity onPress={_handleNavigateToProfile} activeOpacity={1}>
        <ImageDesc
          image={{uri: author.avatar_url}}
          title={author.name}
          description={author.username}
        />
      </TouchableOpacity>
      <Carousel
        content={content}
        images={photos}
        created_at={created_at}
        likes={reactions ? reactions.length : 0}
        comments={num_comment}
        actionsLeft={actionsLeft()}
        actionsRight={actionsRight()}
        descPress={_handleNavigateComment}
      />
    </Block>
  );
};

export default observer(Post);

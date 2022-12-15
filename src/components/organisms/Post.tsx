import React, {useCallback, useMemo} from 'react';
import {useMst, useTheme, useTranslation} from '../../hooks';
import {Block, Image} from '../atoms';
import {ImageDesc, Carousel} from '../molecules';
import {FontAwesome} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import _ from 'lodash';
import {TPostModel} from '../../stores/models/PostModel';

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
    like,
  } = post;

  const _handleNavigateComment = useCallback(() => {
    navigation.navigate(t('navigation.comment'), {post: post});
  }, [navigation, post, t]);

  const isLiked = useMemo(() => {
    return _.findIndex(reactions, (e) => e === profile._id) !== -1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile._id, reactions?.length]);

  const _handleLike = useCallback(() => {
    like(profile._id, isLiked);
  }, [isLiked, like, profile._id]);

  const actionsLeft = useMemo(
    () => (
      <Block row>
        <TouchableOpacity
          onPress={_handleLike}
          style={{marginRight: sizes.s, paddingHorizontal: sizes.s}}>
          {isLiked ? (
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
          <FontAwesome
            name={icons.share}
            color={colors.icon}
            size={sizes.icon}
          />
        </TouchableOpacity>
      </Block>
    ),
    [
      _handleLike,
      _handleNavigateComment,
      colors.danger,
      colors.icon,
      icons.comment,
      icons.heart,
      icons.heart_o,
      icons.share,
      isLiked,
      sizes.icon,
      sizes.s,
    ],
  );

  const actionsRight = useMemo(() => {
    return (
      <Block row scroll horizontal>
        {foods?.map((food) => (
          <Image source={{uri: food.photo}} avatar marginRight={sizes.s} />
        ))}
      </Block>
    );
  }, [foods, sizes.s]);

  return (
    <Block
      color={colors.white}
      key={_id}
      marginBottom={sizes.sm}
      paddingVertical={sizes.sm}>
      <ImageDesc
        image={{uri: author.avatar_url, cache: 'only-if-cached'}}
        title={author.name}
        description={author.username}
      />
      <Carousel
        content={content}
        images={photos}
        created_at={created_at}
        likes={reactions ? reactions.length : 0}
        comments={num_comment}
        actionsLeft={actionsLeft}
        //chuyển sang webp hả uncomment cái này
        // actionsRight={actionsRight}
        descPress={_handleNavigateComment}
      />
    </Block>
  );
};

export default observer(Post);

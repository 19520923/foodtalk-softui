import React, {useState} from 'react';
import {IFood, IPost} from '../../constants/types';
import {useTheme, useTranslation} from '../../hooks';
import {Block, Image} from '../atoms';
import {ImageDesc, Carousel} from '../molecules';
import {FontAwesome} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

type Props = {
  post: IPost;
};

const Post = ({post}: Props) => {
  const {colors, sizes, icons} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [liked, setLiked] = useState<boolean>(true);
  const {
    _id,
    author,
    content,
    photos,
    reactions,
    num_comment,
    created_at,
    foods,
  } = post;

  const _handleNavigateComment = () => {
    navigation.navigate(t('navigation.comment'), {post_id: _id});
  };

  const actionsLeft = () => (
    <Block row>
      <TouchableOpacity
        style={{marginRight: sizes.s, paddingHorizontal: sizes.s}}>
        {liked ? (
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
      <Block row>
        {foods?.map((food) => (
          <Image source={{uri: food.photo}} avatar marginRight={sizes.s} />
        ))}
      </Block>
    );
  };

  return (
    <Block key={_id} marginBottom={sizes.m}>
      <ImageDesc
        image={{uri: author.avatar_url}}
        title={author.name}
        description={author.username}
      />
      <Carousel
        content={content}
        images={photos}
        created_at={created_at}
        likes={reactions ? reactions.length : 0}
        comments={num_comment}
        actionsLeft={actionsLeft()}
        actionsRight={actionsRight()}
      />
    </Block>
  );
};

export default Post;

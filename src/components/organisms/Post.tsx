import React from 'react';
import {IPost} from '../../constants/types';
import {useTheme, useTranslation} from '../../hooks';
import {Block} from '../atoms';
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
  const {t} = useTranslation()
  const {_id, author, content, photos, reactions, num_comment, created_at} =
    post;

  const _handleNavigateComment = () => {
    navigation.navigate(t('navigation.comment'));
  };

  const actionsLeft = () => (
    <Block row>
      <TouchableOpacity
        style={{marginRight: sizes.s, paddingHorizontal: sizes.s}}>
        <FontAwesome name={icons.heart} color={colors.icon} size={sizes.icon} />
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

  return (
    <Block key={_id} marginBottom={sizes.m}>
      <ImageDesc
        image={{uri: author.avatar_url}}
        title={author.name}
        description={author.username}
      />
      <Carousel
        content={content}
        images={photos.map((p) => ({uri: p}))}
        created_at={created_at}
        likes={reactions.length}
        comments={num_comment}
        actionsLeft={actionsLeft()}
      />
    </Block>
  );
};

export default Post;

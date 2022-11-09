import React, {useState} from 'react';
import {IPost} from '../../constants/types';
import {useTheme, useTranslation} from '../../hooks';
import {Block} from '../atoms';
import {ImageDesc, Carousel} from '../molecules';
import {FontAwesome} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RootStore from '../../stores/RootStore';
import { TPostModel } from '../../stores/models/PostModel';

type Props = {
  post: TPostModel;
};

const Post = ({post}: Props) => {
  const {colors, sizes, icons} = useTheme();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [liked, setLiked] = useState<boolean>(true);
  const {_id, author, content, photos, reactions, num_comment, created_at} =
    post;
  
  const {setSelectedPost} = RootStore

  const _handleNavigateComment = () => {
      setSelectedPost(post)
      navigation.navigate(t('navigation.comment'));
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

  return (
    <Block key={_id} marginBottom={sizes.m}>
      <ImageDesc
        image={{uri: author?.avatar_url}}
        title={author?.name}
        description={author?.username}
      />
      <Carousel
        content={content}
        images={photos}
        created_at={created_at}
        likes={reactions ? reactions.length : 0}
        comments={num_comment}
        actionsLeft={actionsLeft()}
      />
    </Block>
  );
};

export default Post;

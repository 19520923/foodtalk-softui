import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {
  Block,
  Button,
  Image,
  Input,
  Modal,
  Switch,
  Text,
} from '../components/atoms';
import {ImageDesc, Card} from '../components/molecules';
import {useTheme} from '../hooks';

type Props = {};

const CreatePost = (props: Props) => {
  const {assets, colors, sizes} = useTheme();
  const [isPublic, setPublic] = useState<boolean>(true);
  const [showModal, setModal] = useState<boolean>(false);

  return (
    <Block safe>
      <Block scroll flex={0} paddingTop={sizes.s}>
        <Block>
          <ImageDesc
            title="Nguyen Nhut Tan"
            description="at 281 Tên lửa, Bình Trị Đông"
            image={assets.avatar1}
          />
          <Block
            row
            flex={0}
            align="center"
            padding={sizes.s}
            justify="space-between">
            <Block row>
              <Text p semibold>
                {isPublic ? 'Public' : 'Only me'}
              </Text>
              <Text p marginLeft={sizes.s}>
                {isPublic
                  ? '(Every one can see your post)'
                  : '(Only me can see your post)'}
              </Text>
            </Block>
            <Switch
              marginRight={sizes.s}
              checked={isPublic}
              onPress={(checked) => setPublic(checked)}
            />
          </Block>
          <Block keyboard>
            <Input placeholder="How about to day, Tan?" multiline noBorder />
          </Block>

          <Image
            radius={0}
            resizeMode="cover"
            source={assets.carousel1}
            style={{width: '100%'}}
            marginTop={sizes.s}
            marginBottom={sizes.sm}
          />
        </Block>
        <Block scroll horizontal paddingHorizontal={sizes.s}>
          <Image avatar marginRight={sizes.s} source={assets.avatar1} />
          <Image avatar marginRight={sizes.s} source={assets.avatar1} />
          <Image avatar marginRight={sizes.s} source={assets.avatar1} />
        </Block>
      </Block>
      <Block style={{position: 'absolute', bottom: 0, width: '100%'}} card>
        {!showModal ? (
          <Button
            onPress={() => setModal(true)}
            row
            justify="space-around"
            style={{width: '100%'}}>
            <Image avatar source={assets.avatar1} />
            <Image avatar source={assets.avatar1} />
            <Image avatar source={assets.avatar1} />
          </Button>
        ) : (
          <Block style={{width: '100%'}}>
            <Block marginBottom={sizes.s}>
              <ImageDesc
                image={assets.avatar1}
                title="Photo"
                description="Choose photo"
              />
            </Block>
            <Block marginBottom={sizes.s}>
              <ImageDesc
                image={assets.avatar1}
                title="Photo"
                description="Choose photo"
              />
            </Block>
            <Block marginBottom={sizes.s}>
              <ImageDesc
                image={assets.avatar1}
                title="Photo"
                description="Choose photo"
              />
            </Block>
          </Block>
        )}
      </Block>
    </Block>
  );
};

export default CreatePost;

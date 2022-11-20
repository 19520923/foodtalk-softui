import {Platform} from 'react-native';
import React from 'react';
import {Block, Image} from '../components/atoms';
import {useTheme} from '../hooks';
import {Text} from '../components/atoms';

const isAndroid = Platform.OS === 'android';

const ingredients = [
  '16 ounce ball of pizza dough',
  '1 tablespoon olive oil',
  '1 cup pizza sauce',
  '3 ounces thinly sliced mozzarella cheese',
  '5 ounces shredded mozzarella cheese',
  '2.5 ounces pepperoni',
  '2 tablespoons shredded parmesan cheese',
];

const process = [
  '1. NOTE: The ingredient list has the amount of toppings you need to make one 12-inch pizza. If you followed my pizza dough recipe, you will have 2 balls of dough. If you want to make them both right away, be sure to double the topping ingredients shown here.',
  '2. Preheat your oven to 550 degrees F, or as high as it will go (at least 475.) Let the stone preheat for 30 minutes. I do not care when your oven beeps to tell you it is at temperature. Set a timer, 30 minutes at least!',
  '3. Prepare a work surface. I prefer to rub my counter with oil, but you can lightly dust it with flour if you have a very sticky dough. (Too much flour can turn your dough tough.)',
  '4. Roll out the dough. Place your ball of pizza dough in the center of your prepared work surface and use your hands to press it down, starting from the center. Keep gently patting out the dough, moving the dough outward from the center. I usually use my hands for pizza dough, gently patting and stretching (and yes, picking it up and maybe even tossing!), but you can also use a rolling pin. Make sure to keep rotating the pin so that you get a roughly circular shape. It doesn not have to be perfect! Even if you have used a rolling pin, I like to use my fingers afterward to shape the edges into a thicker crust. See photos.',
  '5. Transfer the dough to a square of parchment paper. I highly recommend using parchment paper because it’s SO much easier transferring your pizza into the oven. You can pick it up carefully with your hands and rearrange it on the paper, or wrap it around your rolling pin to help transfer. (I have tried rolling the dough out directly onto parchment paper. It does not work well.) Make sure you stretch out the dough so that it is about 12 inches.',
  '6. Par bake. Once the oven is up to temperature, we are going to do a 1 to 2 minute par bake. This step is technically not necessary, but I never skip it. It guarantees not only a thoroughly cooked crust, but a nice and crispy one. Nobody wants a doughy pizza, yuck. (If you want to skip it, you can proceed with topping your pizza).',
  '7. Add about a half package of pepperoni (or olives, mushrooms, ham and pineapple, sausage, red onions, or literally any toppings you want. See post for ideas.)',
  '8. If the top of your pizza is browning too quickly but the bottom crust is not done, tent the top of the pizza with foil to slow browning.',
  '9. Congratulation! Delicous!',
];

const FoodContent = () => {
  const {sizes, assets} = useTheme();

  return (
    <Block safe paddingTop={sizes.s}>
      <Block
        scroll
        flex={0}
        keyboard
        behavior={!isAndroid ? 'padding' : 'height'}>
        <Image
          radius={0}
          resizeMode="cover"
          source={assets.pizza}
          style={{width: '100%', height: 220}}
          marginTop={sizes.s}
        />
        <Block marginLeft={sizes.s} paddingTop={sizes.s}>
          <Text
            p
            semibold
            color={'blue'}
            marginBottom={sizes.m}
            size={sizes.m}
            paddingTop={sizes.s}>
            Pizza
          </Text>

          <Block marginBottom={sizes.m}>
            <Text p bold marginBottom={sizes.s}>
              Ingredients
            </Text>

            {ingredients.map((ingredient) => {
              return (
                <Text p left={sizes.s} marginBottom={sizes.s}>
                  - {ingredient}
                </Text>
              );
            })}
          </Block>

          <Block>
            <Text p bold marginBottom={sizes.s}>
              Process
            </Text>

            {process.map((pro) => {
              return (
                <Text p left={sizes.s} marginBottom={sizes.s}>
                  {pro}
                </Text>
              );
            })}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default FoodContent;

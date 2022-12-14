import {Dimensions} from 'react-native';

/* Exporting a constant called BASE_URL and setting it to the string
"https://foodtalk-server.herokuapp.com". */
export const BASE_URL = 'https://foodtalk-apis.onrender.com';
/* Exporting a constant of axios timeout */
export const AXIOS_TIMEOUT = 10000;
/* Exporting a constant called UNAUTHORIZED and setting it to the number 401. */
export const UNAUTHORIZED = 401;
/* Exporting a constant called ACCESS_TOKEN and setting it to the string "accessToken". */
export const ACCESS_TOKEN = 'accessToken';
/* This is a constant that is used to set the account. */
export const ACCOUNT = 'account';
/* A constant that is used to set the master key for the server. */
export const MASTER_KEY = 'http://0.0.0.0:9000';
/* Exporting a constant called LIMIT and setting it to the number 20. */
export const LIMIT = 20;

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
/* This is a constant that is used to set the height of the image. */
export const IMAGE_HEIGHT = WIDTH / 1.5;
/* This is a constant that is used to set the width of the card. */
export const CARD_WIDTH = WIDTH / 2;

export const APIKEY = 'AIzaSyB0UBNsIcIB4Yin36ssHzuUoktsRqn1ZJQ';
export const AUTH_DOMAIN = 'foodtalk-987a2.firebaseapp.com';
export const PROJECT_ID = 'foodtalk-987a2';
export const STORAGE_BUCKET = 'foodtalk-987a2.appspot.com';
export const MESSAGING_SENDER_ID = '713059928978';
export const APP_ID = '1:713059928978:web:c8ab3ec2a2e17d389dcf4b';
export const MEASUREMENT_ID = 'G-SWCYQ4Q9CT';

export const USER_LIST_SCREEN_NAME = {
  following: 'Following',
  follower: 'Follower',
  reaction: 'Reaction',
};

export const NOTIFICATION_TYPES = {
  user: 'USER',
  food: 'FOOD',
  post: 'POST',
  system: 'SYSTEM',
};

export const maxRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const starImgFilled =
  'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true';
export const starImgCorner =
  'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true';

export const appConfig = {
  appID: '1863617896', // Fill in the AppID you get.
  serverSecret:
    '636ff5e70710975554e3fe05d2b4c970f5d8e7f5ef1d8bda5dbe3d35b0f77fc0', // Fill in the ServerSecret you get.
};

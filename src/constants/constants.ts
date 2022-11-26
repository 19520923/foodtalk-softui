import {Dimensions} from 'react-native';

/* Exporting a constant called BASE_URL and setting it to the string
"https://foodtalk-server.herokuapp.com". */
export const BASE_URL = 'https://foodtalk-server.herokuapp.com';
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

export const APIKEY = 'AIzaSyA5Rbxpmu498VGSzJLrQ-ix_BM6EN5nfLo';
export const AUTH_DOMAIN = 'login-183fb.firebaseapp.com';
export const PROJECT_ID = 'login-183fb';
export const STORAGE_BUCKET = 'login-183fb.appspot.com';
export const MESSAGING_SENDER_ID = '494465272082';
export const APP_ID = '1:494465272082:web:5d13db61f31d3e514ccbcb';
export const MEASUREMENT_ID = 'G-Q3R4CM267X';

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

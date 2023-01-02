import axios from 'axios';
import _ from 'lodash';
import axiosRetry from 'axios-retry';
import {RETRY_DELAY, RETRY_NUMBER, RETRY_STATUS_CODE} from '../constants/retry';
import {
  BASE_URL,
  AXIOS_TIMEOUT,
  UNAUTHORIZED,
  ACCESS_TOKEN,
  MASTER_KEY,
  LIMIT,
  ACCOUNT,
} from '../constants/constants';
import {Storage} from '../hooks';
import {
  ICComment,
  ICFood,
  IPost,
  IRate,
  IRegistration,
} from '../constants/types';

class AxiosClient {
  failedQueue: Array<any>;
  isRefreshing: boolean;
  axios: any;

  /* Creating an axios object. */
  constructor() {
    this.failedQueue = [];
    this.isRefreshing = false;
    this.axios = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: AXIOS_TIMEOUT,
    });

    /* A function that retries the request when the request fails. */
    axiosRetry(this.axios, {
      retries: RETRY_NUMBER,
      retryDelay: () => RETRY_DELAY,
      retryCondition: (error) => {
        const statusCode = _.get(error, 'request.status');
        return RETRY_STATUS_CODE.includes(statusCode);
      },
    });

    /* Adding an interceptor to the axios object. */
    this.axios.interceptors.request.use(
      async (config: any) => {
        const accessToken = await Storage.getItem(ACCESS_TOKEN);
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );

    /* An interceptor that intercepts the response from the server. */
    this.axios.interceptors.response.use(
      (response: any) => {
        return response.data;
      },
      async (error: any) => {
        const originalRequest = error.config;
        const response = error.response;
        const account = await Storage.getItem(ACCOUNT);

        if (
          response.status === UNAUTHORIZED &&
          !originalRequest._retry &&
          account
        ) {
          return this.retryCallAPIWhenTokenExpired(originalRequest, account);
        }
        const resError = _.get(error, 'response.data', {});
        return Promise.reject(resError);
      },
    );
  }

  /**
   * It loops through the failedQueue array and resolves or rejects each promise in the array.
   * @param error - The error object that is returned from the server.
   * @param token - The token that was retrieved from the server.
   */
  processQueue(error: any, token: string) {
    this.failedQueue.forEach((queue) => {
      /** This is a queue to handle 401 error. */
      if (error) {
        queue.reject(error);
      } else {
        queue.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  retryCallAPIWhenTokenExpired(originalRequest: any, account: any) {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({resolve, reject});
      })
        .then((token) => {
          originalRequest.headers.Authorization = 'Bearer ' + token;
          return this.axios(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }
    originalRequest._retry = true;
    this.isRefreshing = true;

    // luu account vào localStorage rồi truyền vào đây
    return this.login(JSON.parse(account))
      .then((data: {token: string}) => {
        /** Add token in to headers.Authorization */
        this.axios.defaults.headers.Authorization = 'Bearer ' + data.token;
        /** Resolve queue and try to send previous request with new token  */
        this.processQueue(null, data.token);
        return this.axios(originalRequest);
      })
      .catch((error: any) => {
        /** Reject error when cannot get accessToken from Native */
        return Promise.reject(new Error(error));
      })
      .finally(() => {
        /** set isRefreshing equal false */
        this.isRefreshing = false;
      });
  }

  /**
   * It takes a user's email and password, and sends it to the server, which then returns an access
   * token.
   * @param user_data - {email: "email@email.com", password: "password"}
   * @returns The response from the server.
   */
  login(user_data: {email: string; password: string}) {
    return this.axios.post(
      '/auth',
      {access_token: MASTER_KEY},
      {
        auth: {
          username: user_data.email,
          password: user_data.password,
        },
      },
    );
  }

  /**
   * If is_active is not an empty string, then return the axios.get request with the is_active parameter,
   * otherwise return the axios.get request without the is_active parameter.
   * @param [is_active] - true or false
   * @param [page=1] - the page number
   * @param [sort=username] - the column to sort by
   * @param [search] - string
   * @returns The return value is a promise.
   */
  getAllUsers(page = 1, search = '') {
    return this.axios.get(
      `/users?q=${search}&sort=username&page=${page}&limit=${LIMIT}&is_active=true`,
    );
  }

  /**
   * It block a user
   * @param user_id - The user ID of the user you want to block.
   * @returns The return value of the function is the return value of the axios.delete method.
   */
  blockUser(user_id: string) {
    return this.axios.delete(`/users/${user_id}`);
  }

  createPost(post_data: IPost) {
    return this.axios.post('/posts', post_data);
  }

  /**
   * If is_active is not an empty string, then return the axios.get() with the is_active parameter,
   * otherwise return the axios.get() without the is_active parameter.
   * @param [page=1] - the page number
   * @param [is_public] - true or false
   * @returns The return value is a promise.
   */
  getAllPosts(page = 1) {
    return this.axios.get(
      `/posts?sort=-created_at&page=${page}&limit=${LIMIT}&is_active=true&is_public=true`,
    );
  }

  /**
   * It returns a promise that resolves to an array of posts.
   * @param [page=1] - The page number of the results to fetch.
   * @param [sort=-created_at] - -created_at
   * @param [user_id] - the id of the user
   * @returns The return value is a promise.
   */
  getUserPosts(user_id: string, page = 1, sort = '-created_at') {
    return this.axios.get(
      `/posts/${user_id}?sort=${sort}&page=${page}&limit=${LIMIT}&is_active=true`,
    );
  }

  /**
   * It returns a promise that resolves to an array of comments for a given post.
   * @param [page=1] - The page number.
   * @param post_id - the id of the post
   * @returns The return value is a promise.
   */
  getPostComments(page: number, post_id: string) {
    return this.axios.get(
      `/post-comments/${post_id}?page=${page}&limit=${LIMIT}&sort=-created_at`,
    );
  }

  /**
   * It deletes a comment from the database.
   * @param comment_id - The id of the comment to delete.
   * @returns The return value of the deletePostComment function is the promise returned by the
   * axios.delete method.
   */
  deletePostComment(comment_id: string) {
    return this.axios.delete(`/comments/${comment_id}`);
  }

  /**
   * It block a post.
   * @param post_id - The id of the post to be deleted
   * @returns The return value of the function is the return value of the axios.delete() function.
   */
  blockPost(post_id: string) {
    return this.axios.delete(`/posts/${post_id}`);
  }

  /**
   * If is_active is not an empty string, then return the axios.get request with the is_active parameter,
   * otherwise return the axios.get request without the is_active parameter.
   * @param [page=1] - the page number
   * @param [sort=name] - the column to sort by
   * @param [search] - search query
   * @returns The return value is the result of the axios.get() method.
   */
  getAllFoods(page = 1, search = '', sort = 'name') {
    return this.axios.get(
      `/foods?q=${search}&sort=${sort}&page=${page}&limit=${LIMIT}`,
    );
  }

  /**
   * If is_active is not an empty string, then return the axios.get request with the is_active parameter,
   * otherwise return the axios.get request without the is_active parameter.
   * @param [page=1] - the page number
   * @param [sort=-created_at] - the order in which the foods are sorted
   * @param [user_id] - the id of the user
   * @returns The return value is a promise.
   */
  getUserFoods(user_id = '', page = 1, sort = '-created_at') {
    return this.axios.get(
      `/foods/${user_id}?sort=${sort}&page=${page}&limit=${LIMIT}&is_active=true`,
    );
  }

  /**
   * It gets the food rates of a food item.
   * @param [page=1] - the page number
   * @param food_id - the id of the food
   * @returns The return value is a promise.
   */
  getFoodRates(page = 1, food_id: string) {
    return this.axios.get(`/food-rates/${food_id}?page=${page}&limit=${LIMIT}`);
  }

  /**
   * It deletes a food rate by its id.
   * @param rate_id - The id of the rate you want to delete
   * @returns The return value of the function is the return value of the last statement in the function.
   */
  deleteFoodRate(rate_id: string) {
    return this.axios.delete(`/food-rates/${rate_id}`);
  }

  /**
   * It takes a food_id as an argument, and then it makes a DELETE request to the server, which hide
   * the food.
   * @param food_id - The id of the food you want to hide.
   * @returns The return value of the function is the promise returned by the axios.delete() method.
   */
  hideFood(food_id: string) {
    return this.axios.delete(`/foods/${food_id}`);
  }

  /**
   * It returns a promise that resolves to an array of notifications.
   * @param [page=1] - The page number of the notifications you want to retrieve.
   * @returns An object with a data property that contains an array of objects.
   */
  getAllNotifications(page = 1) {
    return this.axios.get(`/notifications?page=${page}&limit=${LIMIT}`);
  }

  /**
   * It takes in a notification object and sends it to the server. (It's not working)
   * @param notiData - {
   * @returns The return value of the function is the return value of the axios.post() call.
   */
  createNotification(notiData: object) {
    return this.axios.post('/notifications', notiData);
  }

  likePost(post_id: string) {
    return this.axios.post(`/posts/${post_id}/likeDislike`);
  }

  getFollowing(user_id: string) {
    return this.axios.get(`/users/${user_id}/following`);
  }

  getFollower(user_id: string) {
    return this.axios.get(`/users/${user_id}/follower`);
  }

  addComment(payload: ICComment) {
    return this.axios.post('/post-comments', payload);
  }

  createFood(payload: ICFood) {
    return this.axios.post('/foods', payload);
  }

  addRate(payload: IRate) {
    return this.axios.post('/food-rates', payload);
  }

  register(payload: IRegistration) {
    return this.axios.post('/users', {...payload, access_token: MASTER_KEY});
  }

  seenNoti(noti: string) {
    return this.axios.post(`notifications/${noti}/seen`);
  }

  follow(user_id: string) {
    return this.axios.post(`/users/follow/${user_id}`);
  }

  unfollow(user_id: string) {
    return this.axios.post(`/users/unfollow/${user_id}`);
  }

  getChat(page = 1) {
    return this.axios.get(`/chats?page=${page}&limit=${LIMIT}`);
  }

  getMessage(chat_id: string, page = 1) {
    return this.axios.get(`/messages/${chat_id}page=${page}&limit=${LIMIT}`);
  }

  createChat(user_id: string) {
    return this.axios.post(`/chats/${user_id}`);
  }
}

export default new AxiosClient();

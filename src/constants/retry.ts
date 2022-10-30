/* The number that your want to retry API */
export const RETRY_NUMBER = 5;
/* The times that your want to retry API  */
export const RETRY_DELAY = 1000;

/* List status code that your want to retry API */
export const RETRY_STATUS_CODE = [
  408, // Request Timeout
  429, // Too Many Requests
  500, // Internal Server Error
  502, // Bad Gateway
  503, // Service Unavailable
  504, // Gateway Timeout
];

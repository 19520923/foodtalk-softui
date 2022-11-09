/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 15 chars
 */
export const name: RegExp = /[a-zA-Z\ ]{3,15}/;

/*
 * email validation
 */
export const email: RegExp = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;

/*
 * password validation, should contain:
 * [0-9a-zA-Z]{6,}: at least 6 from the mentioned characters
 */
export const password: RegExp =
  /^[0-9a-zA-Z]{6,}$/;

import { isEmpty, get } from 'lodash';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

/**
 * GET USER COOKIES
 * get the session cookies from the cookies available
 */
export const getSessionCookies = () => {
  let tokens = null;
  const jwt = cookies.get('SCSession');
  if (!isEmpty(jwt)) {
    tokens = { jwt };
  }
  return tokens;
};

/**
 * TOKEN EXPIRED
 * Check if the jwt has expired (expects a time string NOT THE JWT)
 */
export const tokenExpired = (expiry) => {
  if (!expiry) return false;
  const timeDiff = Math.round((Date.now() - expiry) / 1000);
  return timeDiff >= 7 * 24 * 60 * 60;
};

/**
 * GET JWT
 * Get the jwt token for the local cookies
 */
export const getJwt = () => {
  const jwt = cookies.get('SCSession');
  if (jwt && jwt.ts && !tokenExpired(jwt.ts)) {
    return get(jwt, 't', '');
  }
  // No cookie found or malformed cookie.
  return '';
};
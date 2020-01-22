import { isEmpty, get } from 'lodash';

/**
 * GET USER TOKENS SERVER
 * get the session cookies from the cookies available
 */
export function getTokensServer(cookies) {
  let tokens = null;
  const jwt = get(cookies, 'SCSession', {});
  if (!isEmpty(jwt)) {
    tokens = {
      jwt: JSON.parse(jwt)
    };
  }
  return tokens;
}

/**
 * GET USER TOKENS CLIENT
 * get the session cookies from the cookies available
 */
export function getTokensClient(cookies) {
  let tokens = null;
  const jwt = cookies.get('SCSession');
  if (!isEmpty(jwt)) {
    tokens = {
      jwt
    };
  }
  return tokens;
}

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
 * COOKIE CONFIG
 * Generic cookie config for session cookies
 */
export const cookieConfig = {
  path: '/',
  secure: webpackVars.ENV !== 'development',
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 2
};

/**
 * QUERY/MUTATION PARTIALS
 */
export const loginPartial = `
  jwt
  user {
    id
    first_name
    last_name
    email_address
    roles
  }
`;

export const VALIDATE_SESSION = `
  mutation validate_session($jwt: String!) {
    validate_session(jwt: $jwt) {
      type
      login {
        ${ loginPartial }
      }
    }
  }
`;
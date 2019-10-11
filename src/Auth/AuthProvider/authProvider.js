import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, intersection, get } from 'lodash';
import Cookies from 'universal-cookie';

// COMPONENTS
import { Provider } from '../auth.context';

// HELPERS
import { ENV } from '../../helpers/environments';

const cookies = new Cookies();

const AuthProvider = (props) => {
  const {
    children,
    tokens
  } = props;

  const [{ jwt, loggedOut }, setState] = React.useState({
    jwt: get(tokens, 'jwt', {}),
    loggedOut: false
  });

  React.useEffect(() => {
    if (tokens && isEmpty(jwt) && !loggedOut) {
      setState({ jwt: get(tokens, 'jwt', {}), loggedOut: false });
    }
  }, [jwt, loggedOut, tokens]);

  const hasPermissions = (permissions) => {
    // First check the user is logged in
    if (!isEmpty(jwt)) {
      if (permissions && permissions.length) {
        const userPermissions = jwt.r || [];
        const match = intersection(userPermissions, permissions);
        return match && !!match.length;
      }
      return true;
    }
    return false;
  };

  const loggedIn = () => {
    return !isEmpty(jwt);
  };

  const login = (data) => {
    const newSession = {
      i: get(data, 'user.id'),
      r: get(data, 'user.roles'),
      fn: get(data, 'user.first_name'),
      ln: get(data, 'user.last_name'),
      t: get(data, 'jwt'),
      meta: get(data, 'meta', {}),
      ts: Date.now()
    };
    setState({ jwt: newSession, loggedOut: false });
    const cookieConfig = {
      path: '/',
      secure: ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 2
    };
    cookies.set('SCSession', JSON.stringify(newSession), cookieConfig);
  };

  const logout = () => {
    setTimeout(() => {
      cookies.remove('SCSession', { path: '/' });
      window.location.reload();
    }, 100);
  };

  const user = isEmpty(jwt) ? null : {
    first_name: jwt.fn,
    last_name: jwt.ln,
    id: jwt.i,
    roles: jwt.r,
    meta: jwt.meta
  };

  return (
    <Provider value={ {
      hasPermissions,
      loggedIn,
      login,
      logout: () => logout(),
      user
    } }
    >
      { children }
    </Provider>
  );
};

AuthProvider.defaultProps = { tokens: null };

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
  tokens: PropTypes.object
};

export default AuthProvider;
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { isEmpty, intersection, get } from 'lodash';
import Cookies from 'universal-cookie';
import { useMutation } from '@apollo/react-hooks';

// COMPONENTS
import { Provider } from '../auth.context';

// HELPERS
import { cookieConfig, VALIDATE_SESSION } from '../../helpers/auth';
import { parseApolloError } from '../../Apollo/helpers';

const cookies = new Cookies();

const AuthProvider = (props) => {
  const {
    children,
    tokens
  } = props;

  const [jwt, setState] = React.useState(get(tokens, 'jwt', {}));

  React.useEffect(() => {
    if (tokens && isEmpty(jwt)) {
      setState(get(tokens, 'jwt', {}));
    }
  }, [jwt, tokens]);


  // CHECK PERMISSIONS
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
    setState(newSession);
    cookies.set('SCSession', JSON.stringify(newSession), cookieConfig);
  };

  const logout = () => {
    setTimeout(() => {
      cookies.remove('SCSession', {
        path: '/'
      });
      window.location.reload();
    }, 100);
  };

  // HANDLE VALIDATION OF SESSIONS
  const poll = React.useRef();

  // VALIDATE MUTATIONS
  const [validate] = useMutation(gql`${ VALIDATE_SESSION }`, {
    onCompleted: (data) => { // handle success
      const type = get(data, 'validate_session.type');
      // Update login session
      if (type === 'refresh') {
        const session = data.validate_session.login;
        login(session);
      }
    },
    onError: (e) => { // handle errors
      // Logout if we get a 401
      const error = parseApolloError({
        error: e
      });
      if (get(error, 'code') === 401) {
        logout();
        if (poll.current) {
          clearTimeout(poll.current);
          poll.current = null;
        }
      }
    }
  });

  // POLLING FUNCTION
  const runPolling = React.useCallback(() => {
    const timeoutId = setTimeout(async () => {
      await validate({
        variables: {
          jwt: jwt.t
        }
      });
      runPolling();
    }, 5 * 60 * 1000); // 5 minutes
    poll.current = timeoutId;
  }, [jwt.t, validate]);

  // CANCEL POLLING
  const stopPolling = React.useCallback(() => {
    if (poll.current) {
      clearTimeout(poll.current);
      poll.current = null;
    }
  }, []);

  // START POLL ONCE IF WE HAVE A JWT
  React.useEffect(() => {
    if (jwt.t) {
      runPolling();
    }
    return () => stopPolling();
  }, [jwt.t, runPolling, stopPolling]);

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
      logout,
      user
    } }
    >
      { children }
    </Provider>
  );
};

AuthProvider.defaultProps = {
  tokens: null
};

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
  tokens: PropTypes.object
};

export default AuthProvider;
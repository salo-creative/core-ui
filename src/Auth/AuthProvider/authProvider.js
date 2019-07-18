import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, intersection, get } from 'lodash';
import Cookies from 'universal-cookie';

// COMPONENTS
import { Provider } from '../auth.context';

// HELPERS
import { ENV } from '../../helpers/environments';

const cookies = new Cookies();
const cookieDomain = ENV === 'local' ? 'localhost' : 'localhost';

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    const { tokens } = props;
    let state = { jwt: {} };
    if (tokens) {
      state = ({ jwt: get(tokens, 'jwt', {}) });
    }
    this.state = {
      jwt: state.jwt,
      loggedOut: false
    };
  }

  // Set user into state from tokens if we login during session
  static getDerivedStateFromProps(nextProps, prevState) {
    const { jwt, loggedOut } = prevState;
    const { tokens } = nextProps;
    if ((isEmpty(jwt)) && tokens && !loggedOut) {
      const state = ({ jwt: get(tokens, 'jwt', {}) });
      return { jwt: state.jwt };
    }
    return null;
  }

  hasPermissions = (permissions) => {
    const { jwt } = this.state;
    // First check the user is logged in
    if (!isEmpty(jwt)) {
      if (permissions && permissions.length) {
        const userPermissions = jwt.pg || [];
        const match = intersection(userPermissions, permissions);
        return match && !!match.length;
      }
      return true;
    }
    return false;
  };

  loggedIn = () => {
    const { jwt } = this.state;
    return !isEmpty(jwt);
  };

  login = (login) => {
    const jwt = {
      i: login.id,
      o: login.organisation,
      t: login.jwt,
      ts: Date.now()
    };
    this.setState({ jwt, loggedOut: false });
    const cookieConfig = {
      path: '/',
      domain: cookieDomain,
      secure: ENV !== 'local',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 2
    };
    cookies.set('SCSession', JSON.stringify(jwt), cookieConfig);
  };

  logout = () => {
    setTimeout(() => {
      cookies.remove('SCSession', { path: '/', domain: cookieDomain });
      window.location.reload();
    }, 100);
  };

  render() {
    const { children } = this.props;
    const { user } = this.state;
    return (
      <Provider value={ {
        hasPermissions: this.hasPermissions,
        loggedIn: this.loggedIn,
        login: this.login,
        logout: () => this.logout(),
        user
      } }
      >
        { children }
      </Provider>
    );
  }
}

AuthProvider.defaultProps = { tokens: null };

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
  tokens: PropTypes.object
};

export default AuthProvider;